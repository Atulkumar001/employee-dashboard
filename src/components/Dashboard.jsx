import Header from "../components/Header"

import { Box } from "@mui/material"
import TableContainer from "./TableContainer"

const Dashboard = () => {
    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="EMPLOYEE DASHBOARD" subTitle="Welcome to the employee dashboard" />
            </Box>
            <TableContainer />
        </Box>
  
    )
}

export default Dashboard