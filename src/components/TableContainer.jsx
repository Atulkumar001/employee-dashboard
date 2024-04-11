import React from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
// import { tokens } from '../../theme'
import { colorTokens as tokens } from '../theme'
// import { mockDataTeam } from '../../data/mockData'
import { sampleData as mockDataTeam } from '../data/sampleData'
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined'
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined'
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined'
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Modal from '@mui/material/Modal';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
// import Header from '../../components/Header'
import EditIcon from '@mui/icons-material/Edit';
import Header from './Header'
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
const TableContainer = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const [rows, setRows] = React.useState(mockDataTeam)
    const [open, setOpen] = React.useState(false);
    const [hovered, setHovered] = React.useState(null);
    const [rowItem, setRowItem] = React.useState({});
    const [newEmployee, setNewEmployee] = React.useState({})
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleEdit = (row) => {
        console.log(row)
        handleOpen()
        setRowItem(row)
    }

    const handleNewUser = () => {
        handleOpen()
        setRowItem({})
    }
    const passRows = () => {
        
        const rowIndex = rows.findIndex(row => row.id === rowItem.id)
        if (rowIndex !== -1) {
            const newRows = [...rows]
            newRows[rowIndex] = rowItem
            setRows(newRows)
        } else if (!rowItem.id) {
            const newRow = {
                ...rowItem,
                id: Math.max(...rows.map(row => row.id), 0) + 1
            }
            setRows([...rows, newRow])
        }
    }
    const columns = [
      { field: 'id', headerName: 'ID' },
      { field: 'name', headerName: 'Name', flex: 1, cellClassName: 'name-column--cell' },
      { field: 'age', headerName: 'E-Age', type: 'number', headerAlign: 'left', align: 'left' },
      { field: 'phone', headerName: 'Phone', flex: 1 },
      { field: 'email', headerName: 'E-mail', flex: 1 },
      {
        field: 'access',
        headerName: 'Work type',
        flex: "center",
        // align: 'center',
        
        renderCell: ({ row: { access } }) => {
          return (
                 <Box
                    width="100%"
                    m="2px auto"
                    p="10px"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    backgroundColor={
                       access === 'admin' ? colors.greenAccent[600] : colors.greenAccent[700]
                    }
                    borderRadius="4px"
                 >
                    {access === 'admin' && <AdminPanelSettingsOutlinedIcon sx={{ fontSize: '16px' }} />}
                    {access === 'manager' && <SecurityOutlinedIcon sx={{ fontSize: '16px' }} />}
                    {access === 'user' && <LockOpenOutlinedIcon sx={{ fontSize: '16px' }} />}
                    <Typography 
                       color={colors.grey[100]} 
                       sx={{ ml: '5px', fontSize: '0.8rem' }}
                    >
                       {access}
                    </Typography>
                    
                 </Box>
          )
        }
      },
      {
        flex: 1,
        align: 'center',
        renderCell: ({ row }) => {
        //   const { ref, ...restRowProps } = getRowProps(row);
          return (
            <Box
            //   ref={ref}
            //   {...restRowProps}
              onMouseEnter={() => setHovered(row.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                cursor: (hovered === row.id) ? 'pointer' : 'default',
              }}
            >
              <EditIcon 
                 style={{
                    color: (hovered === row.id) ? colors.grey[200] : colors.grey[500],
                 }} 
                 onClick={() => handleEdit(row)} 
              />
            </Box>
          );
        },
      },
    ]
  
    return (
        <Box m="0px">
           {/* <Header title="TEAM" subtitle="Managing the Team Members" /> */}
           <Box
              m="0px 0 0 0"
              height="75vh"
              sx={{
                '& .MuiDataGrid-root': {
                  border: 'none'
                },
                '& .MuiDataGrid-cell': {
                  borderBottom: 'none'
                },
                '& .name-column--cell': {
                  color: colors.greenAccent[300]
                },
                '& .MuiDataGrid-columnHeaders': {
                  borderBottom: 'none',
                  backgroundColor: colors.blueAccent[700]
                },
                '& .MuiDataGrid-virtualScroller': {
                  backgroundColor: colors.primary[400]
                },
                '& .MuiDataGrid-footerContainer': {
                  borderTop: 'none',
                  backgroundColor: colors.blueAccent[700]
                }
              }}
           >
            
            <Box 
               display="flex"
               justifyContent="flex-end"
               mt="20px"
            >
                <Button 
                   variant="contained" 
                   onClick={() => {
                      handleNewUser()
                   }}
                >
                   Add Employee
                </Button>
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {`${rowItem.name} Details`}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <Box component="form" onSubmit={(e) => {
                        e.preventDefault()
                        passRows()
                        handleClose()
                    }}>
                        <Box mb={2}>
                            <Typography variant="body1" gutterBottom>Name:</Typography>
                            <TextField
                                value={rowItem.name}
                                onChange={(e) => setRowItem({...rowItem, name: e.target.value})}
                                variant="outlined"
                            />
                        </Box>
                        <Box mb={2}>
                            <Typography variant="body1" gutterBottom>Email:</Typography>
                            <TextField
                                value={rowItem.email}
                                onChange={(e) => setRowItem({...rowItem, email: e.target.value})}
                                variant="outlined"
                            />
                        </Box>
                        <Box mb={2}>
                            <Typography variant="body1" gutterBottom>Phone:</Typography>
                            <TextField
                                value={rowItem.phone}
                                onChange={(e) => setRowItem({...rowItem, phone: e.target.value})}
                                variant="outlined"
                                inputProps={{
                                    type: "tel"
                                }}
                            />
                        </Box>
                        <Box mb={2}>
                            <Typography variant="body1" gutterBottom>Age:</Typography>
                            <TextField
                                value={rowItem.age}
                                onChange={(e) => setRowItem({...rowItem, age: e.target.value})}
                                variant="outlined"
                                type="number"
                            />
                        </Box>
                        <Box mb={2}>
                            <Typography variant="body1" gutterBottom>Office Type:</Typography>
                            <Select
                                value={rowItem.access}
                                onChange={(e) => setRowItem({...rowItem, access: e.target.value})}
                                variant="outlined"
                                >
                                <MenuItem value="wfh">WFH</MenuItem>
                                
                                <MenuItem value="Wfo">WFO</MenuItem>
                            </Select>
                        </Box>
                        <Box
                            mt={2}
                            display="flex"
                            justifyContent="flex-end"
                        >
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    backgroundColor: colors.greenAccent[600],
                                    '&:hover': {
                                        backgroundColor: colors.greenAccent[700],
                                    },
                                    padding: '0.8rem 0.5rem',
                                }}
                            >
                                Save
                            </Button>
                        </Box>
                    </Box>
                </Typography>
                </Box>
            </Modal>
              <DataGrid rows={rows} columns={columns}></DataGrid>
           </Box>
        </Box>
    )


}

export default TableContainer