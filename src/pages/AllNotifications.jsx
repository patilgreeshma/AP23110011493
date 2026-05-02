// src/pages/AllNotifications.jsx

import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Select,
  MenuItem,
  TextField,
  Pagination
} from "@mui/material";

import { Log } from "../logger";
import { token } from "../config";

export default function AllNotifications() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const perPage = 8;

  useEffect(() => {
    load();
    Log(
      "info",
      "page",
      "All notifications page opened"
    );
  }, []);

  async function load() {
    try {
      const res = await fetch(
        "http://20.207.122.201/evaluation-service/notifications",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await res.json();

      const arr = Array.isArray(data)
        ? data
        : data.notifications || [];

      setItems(arr);

      Log(
        "info",
        "api",
        "Fetched notifications"
      );
    } catch (error) {
      setItems([]);

      Log(
        "error",
        "api",
        "Failed to fetch notifications"
      );
    } finally {
      setLoading(false);
    }
  }

  const filtered = useMemo(() => {
    let arr = [...items];

    if (filter === "New") {
      arr = arr.filter(
        (n) => !localStorage.getItem(n.ID)
      );
    } else if (filter === "Viewed") {
      arr = arr.filter((n) =>
        localStorage.getItem(n.ID)
      );
    } else if (filter !== "All") {
      arr = arr.filter(
        (n) => n.Type === filter
      );
    }

    if (search.trim()) {
      arr = arr.filter((n) =>
        n.Message.toLowerCase().includes(
          search.toLowerCase()
        )
      );
    }

    return arr;
  }, [items, filter, search]);

  const totalPages = Math.ceil(
    filtered.length / perPage
  );

  const shown = filtered.slice(
    (page - 1) * perPage,
    page * perPage
  );

  if (loading) {
    return (
      <Typography
        sx={{
          mt: 8,
          textAlign: "center"
        }}
      >
        Loading notifications...
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#f8fafc",
        py: 3,
        px: 2
      }}
    >
      <Box
        sx={{
          maxWidth: 1350,
          mx: "auto"
        }}
      >
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography
            sx={{
              fontSize: "30px",
              fontWeight: 800,
              color: "#111827",
              letterSpacing: "-0.8px",
              lineHeight: 1.1
            }}
          >
            Notifications
          </Typography>

          <Typography
            sx={{
              mt: 0.8,
              color: "#6b7280",
              fontSize: "15px"
            }}
          >
            Manage placements, results
            and event updates
          </Typography>
        </Box>

        {/* Filters */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            mb: 3
          }}
        >
          <Select
            value={filter}
            onChange={(e) => {
              setFilter(
                e.target.value
              );
              setPage(1);
            }}
            sx={{
              minWidth: 220,
              bgcolor: "white",
              borderRadius: 3
            }}
          >
            <MenuItem value="All">
              All Notifications
            </MenuItem>

            <MenuItem value="Placement">
              Placements
            </MenuItem>

            <MenuItem value="Result">
              Results
            </MenuItem>

            <MenuItem value="Event">
              Events
            </MenuItem>

            <MenuItem value="New">
              New
            </MenuItem>

            <MenuItem value="Viewed">
              Viewed
            </MenuItem>
          </Select>

          <TextField
            placeholder="Search notifications..."
            value={search}
            onChange={(e) => {
              setSearch(
                e.target.value
              );
              setPage(1);
            }}
            sx={{
              minWidth: 260,
              bgcolor: "white",
              borderRadius: 3
            }}
          />
        </Box>

        {/* Cards */}
       <Grid
  container
  spacing={3}
  alignItems="stretch"
>
          {shown.map((n, i) => {
            const viewed =
              localStorage.getItem(
                n.ID
              );

            return (
              <Grid
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={n.ID || i}
              >
                <Card
                  onClick={() => {
                    localStorage.setItem(
                      n.ID,
                      "viewed"
                    );

                    setItems([
                      ...items
                    ]);

                    Log(
                      "info",
                      "component",
                      `Opened ${n.Type}`
                    );
                  }}
                  sx={{
                    height: "100%",
                    borderRadius: 4,
                    cursor: "pointer",
                    opacity: viewed
                      ? 0.78
                      : 1,
                    background:
                      "white",
                    border:
                      "1px solid #eef2f7",
                    boxShadow:
                      "0 6px 18px rgba(0,0,0,0.04)",
                    transition:
                      "all 0.2s ease",
                    "&:hover": {
                      transform:
                        "translateY(-4px)",
                      boxShadow:
                        "0 12px 24px rgba(0,0,0,0.07)"
                    }
                  }}
                >
                  <CardContent>
                    {/* Badge */}
                    <Box
                      sx={{
                        display:
                          "inline-block",
                        px: 1.4,
                        py: 0.45,
                        borderRadius:
                          "999px",
                        fontSize:
                          "12px",
                        fontWeight: 700,
                        mb: 2,
                        bgcolor: viewed
                          ? "#f3f4f6"
                          : "#dbeafe",
                        color: viewed
                          ? "#6b7280"
                          : "#2563eb",
                          maxWidth: 1180,

    mx: "auto"
                      }}
                    >
                      {viewed
                        ? "Viewed"
                        : "New"}
                    </Box>

                    {/* Type */}
                    <Typography
                      sx={{
                        fontSize:
                          "13px",
                        fontWeight: 700,
                        mb: 1,
                        color:
                          n.Type ===
                          "Placement"
                            ? "#15803d"
                            : n.Type ===
                              "Result"
                            ? "#2563eb"
                            : "#b45309"
                      }}
                    >
                      {n.Type}
                    </Typography>

                    {/* Message */}
                    <Typography
                      sx={{
                        fontSize:
                          "18px",
                        fontWeight: 800,
                        color:
                          "#111827",
                        lineHeight: 1.3,
                        mb: 1.5
                      }}
                    >
                      {n.Message}
                    </Typography>

                    {/* Time */}
                    <Typography
                      sx={{
                        fontSize:
                          "14px",
                        color:
                          "#9ca3af"
                      }}
                    >
                      {n.Timestamp}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        {/* Empty */}
        {filtered.length ===
          0 && (
          <Typography
            sx={{
              mt: 5,
              textAlign:
                "center",
              color:
                "#6b7280"
            }}
          >
            No notifications found
          </Typography>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <Box
            sx={{
              mt: 5,
              display: "flex",
              justifyContent:
                "center"
            }}
          >
            <Pagination
              count={
                totalPages
              }
              page={page}
              onChange={(
                e,
                val
              ) =>
                setPage(val)
              }
              shape="rounded"
              color="primary"
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}