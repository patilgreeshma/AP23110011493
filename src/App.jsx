import { Routes, Route, NavLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Typography
} from "@mui/material";

import AllNotifications from "./pages/AllNotifications";
import PriorityNotifications from "./pages/PriorityNotifications";

export default function App() {
  const navStyle = ({ isActive }) => ({
    textDecoration: "none",
    color: isActive ? "#111827" : "#6b7280",
    fontWeight: 700,
    fontSize: "15px",
    padding: "8px 14px",
    borderRadius: "10px",
    background: isActive ? "#f3f4f6" : "transparent"
  });

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "white",
          color: "#111827",
          borderBottom: "1px solid #e5e7eb"
        }}
      >
        <Toolbar
          sx={{
            maxWidth: 1280,
            width: "100%",
            mx: "auto",
            minHeight: 68,
            justifyContent: "space-between"
          }}
        >
          <Typography
            sx={{
              fontWeight: 800,
              fontSize: "22px",
              letterSpacing: "-0.5px"
            }}
          >
            Campus Notify
          </Typography>

          <Box sx={{ display: "flex", gap: 1 }}>
            <NavLink to="/" style={navStyle}>
              All
            </NavLink>

            <NavLink to="/priority" style={navStyle}>
              Priority
            </NavLink>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Routes>
          <Route path="/" element={<AllNotifications />} />
          <Route path="/priority" element={<PriorityNotifications />} />
        </Routes>
      </Container>
    </>
  );
}