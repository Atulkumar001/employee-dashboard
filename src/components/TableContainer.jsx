import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
// import { tokens } from '../../theme'
import { colorTokens as tokens } from "../theme";
// import { mockDataTeam } from '../../data/mockData'
import { sampleData as mockDataTeam } from "../data/sampleData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Modal from "@mui/material/Modal";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
// import Header from '../../components/Header'
import EditIcon from "@mui/icons-material/Edit";
import Header from "./Header";
import { AddOutlined } from "@mui/icons-material";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflow: "auto",
  overflowY: "scroll",
  maxHeight: "100%",
};
const TableContainer = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = React.useState(mockDataTeam);
  const [open, setOpen] = React.useState(false);
  const [hovered, setHovered] = React.useState(null);
  const [selectedRowId, setSelectedRowId] = React.useState(null);
  const [rowItems, setRowItems] = React.useState({});
  const [isNewUser, setIsNewUser] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleEdit = (row) => {
    setSelectedRowId(row.id);
    handleOpen();
    setRowItems((prevRowItems) => ({
      ...prevRowItems,
      [row.id]: { ...row },
    }));
  };

  const handleNewUser = () => {
    setSelectedRowId(rows.length + 1);
    setIsNewUser(true);
    handleOpen();
    // const newRowId = `newRow_${Date.now()}`; // Generate a unique ID for the new row
    const newRowId = rows.length + 1; // Get a unique id for the new row
    setRowItems({
      ...rowItems,
      [newRowId]: {
        id: newRowId,
        name: "",
        email: "",
        phone: "",
        age: "",
        access: ["wfh", "wfh", "wfh", "wfh", "wfh"], // Set "WFH" for all days
      },
    });
  };

  const passRows = () => {
    console.log("new row", rowItems);
    if (selectedRowId !== null && rowItems[selectedRowId] && !isNewUser) {
      console.log("inside if statement, selectedRowId", selectedRowId);
      // Update an existing row
      const rowIndex = rows.findIndex((row) => row.id === selectedRowId);
      if (rowIndex !== -1) {
        const newRows = [...rows];
        newRows[rowIndex] = { ...rowItems[selectedRowId] };
        setRows(newRows);
      }
    } else {
      console.log("Insider else statement, selectedRowId", selectedRowId);
      console.log("row items", rowItems);
      // Add a new row
      const newRow = {
        id: rows.length + 1,
        name: rowItems[rows.length + 1].name,
        email: rowItems[rows.length + 1].email,
        phone: rowItems[rows.length + 1].phone,
        age: rowItems[rows.length + 1].age,
        access: rowItems[rows.length + 1].access,
      };
      setRows([...rows, newRow]);
    }
    setIsNewUser(false);
    handleClose();
  };

  const handleAccessChange = (rowId, dayIndex, newValue) => {
    setRowItems((prevRowItems) => ({
      ...prevRowItems,
      [rowId]: {
        ...prevRowItems[rowId],
        access: [
          ...prevRowItems[rowId].access.slice(0, dayIndex),
          newValue,
          ...prevRowItems[rowId].access.slice(dayIndex + 1),
        ],
      },
    }));
  };

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "E-Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    { field: "phone", headerName: "Phone", flex: 1 },
    { field: "email", headerName: "E-mail", flex: 1 },
    {
      field: "access",
      headerName: "Access",
      flex: 1,
      type: "array",
      renderCell: ({ row }) => {
        const values = row.access || [];
        return (
          <Box
            display="flex"
            justifyContent="left"
            alignItems="center"
            overflow="auto"
            maxHeight="40px"
          >
            {values.map((value, index) => (
              <Box
                key={`${value}${index}`}
                bgcolor={colors.backgroundContrast}
                m={0.5}
                px={1}
                borderRadius={3}
              >
                {value}
              </Box>
            ))}
          </Box>
        );
      },
    },
    {
      flex: 1,
      align: "center",
      renderCell: ({ row }) => (
        <Box
          onMouseEnter={() => setHovered(row.id)}
          onMouseLeave={() => setHovered(null)}
          style={{ cursor: hovered === row.id ? "pointer" : "default" }}
        >
          <EditIcon
            style={{
              color: hovered === row.id ? colors.grey[200] : colors.grey[500],
            }}
            onClick={() => handleEdit(row)}
          />
        </Box>
      ),
    },
  ];

  return (
    <Box m="0px">
      {/* Header title and subtitle */}
      <Box
        m="0px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            borderBottom: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
        }}
      >
        <Box display="flex" justifyContent="flex-end" mt="20px">
          {/* Add Employee Button */}
          <Button
            variant="contained"
            startIcon={<AddOutlined />}
            sx={{
              backgroundColor: colors.greenAccent[600],
              "&:hover": {
                backgroundColor: colors.greenAccent[800],
              },
              "&:disabled": {
                backgroundColor: colors.greenAccent[300],
              },
              "&:focus": {
                backgroundColor: colors.greenAccent[600],
              },
            }}
            onClick={handleNewUser}
          >
            Add Employee
          </Button>
        </Box>

        {/* Modal for Editing */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{ overflow: "auto", WebkitOverflowScrolling: "touch" }}
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {`${rowItems[selectedRowId]?.name || "New Employee"} Details`}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Box
                component="form"
                onSubmit={(e) => {
                  e.preventDefault();
                  passRows();
                }}
              >
                <Box mb={2}>
                  <Typography variant="body1" gutterBottom>
                    Name:
                  </Typography>
                  <TextField
                    value={rowItems[selectedRowId]?.name || ""}
                    onChange={(e) => {
                      setRowItems((prevRowItems) => ({
                        ...prevRowItems,
                        [selectedRowId]: {
                          ...prevRowItems[selectedRowId],
                          name: e.target.value,
                        },
                      }));
                      console.log("rowItems:", rowItems);
                    }}
                    variant="outlined"
                  />
                </Box>
                <Box mb={2}>
                  <Typography variant="body1" gutterBottom>
                    Email:
                  </Typography>
                  <TextField
                    value={rowItems[selectedRowId]?.email || ""}
                    onChange={(e) =>
                      setRowItems((prevRowItems) => ({
                        ...prevRowItems,
                        [selectedRowId]: {
                          ...prevRowItems[selectedRowId],
                          email: e.target.value,
                        },
                      }))
                    }
                    variant="outlined"
                  />
                </Box>
                <Box mb={2}>
                  <Typography variant="body1" gutterBottom>
                    Phone:
                  </Typography>
                  <TextField
                    value={rowItems[selectedRowId]?.phone || ""}
                    onChange={(e) =>
                      setRowItems((prevRowItems) => ({
                        ...prevRowItems,
                        [selectedRowId]: {
                          ...prevRowItems[selectedRowId],
                          phone: e.target.value,
                        },
                      }))
                    }
                    variant="outlined"
                    inputProps={{
                      type: "tel",
                    }}
                  />
                </Box>
                <Box mb={2}>
                  <Typography variant="body1" gutterBottom>
                    Age:
                  </Typography>
                  <TextField
                    value={rowItems[selectedRowId]?.age || ""}
                    onChange={(e) =>
                      setRowItems((prevRowItems) => ({
                        ...prevRowItems,
                        [selectedRowId]: {
                          ...prevRowItems[selectedRowId],
                          age: e.target.value,
                        },
                      }))
                    }
                    variant="outlined"
                    type="number"
                  />
                </Box>
                {selectedRowId &&
                  rowItems[selectedRowId]?.access &&
                  rowItems[selectedRowId].access.map((day, index) => (
                    <Box mb={2} key={index}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "",
                        }}
                      >
                        <Typography variant="body1" gutterBottom>
                          {
                            [
                              "Monday",
                              "Tuesday",
                              "Wednesday",
                              "Thursday",
                              "Friday",
                            ][index]
                          }
                          :
                        </Typography>
                        <Select
                          value={day}
                          onChange={(e) =>
                            handleAccessChange(
                              selectedRowId,
                              index,
                              e.target.value
                            )
                          }
                          variant="outlined"
                        >
                          <MenuItem value="wfh">WFH</MenuItem>
                          <MenuItem value="wfo">WFO</MenuItem>
                        </Select>
                      </div>
                    </Box>
                  ))}
                {/* Save Button */}
                <Box mt={2} display="flex" justifyContent="flex-end">
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      backgroundColor: colors.greenAccent[600],
                      "&:hover": {
                        backgroundColor: colors.greenAccent[700],
                      },
                      padding: "0.8rem 0.5rem",
                    }}
                  >
                    Save
                  </Button>
                </Box>
              </Box>
            </Typography>
          </Box>
        </Modal>

        {/* DataGrid */}
        <DataGrid rows={rows} columns={columns} />
      </Box>
    </Box>
  );
};

export default TableContainer;
