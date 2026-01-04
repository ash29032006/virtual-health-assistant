import React, { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  useScrollTrigger,
  Container,
  Stack,
  Tooltip,
  Badge,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dashboard,
  MonitorHeart,
  LocalHospital,
  MenuBook,
  Notifications,
  HealthAndSafety,
} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const [notifications, setNotifications] = useState(3);
  const [hoveredItem, setHoveredItem] = useState(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <Dashboard />,
      gradient: "linear-gradient(45deg, #0EA5E9, #22D3EE)",
    },
    {
      title: "Symptom Checker",
      path: "/symptom-checker",
      icon: <LocalHospital />,
      gradient: "linear-gradient(45deg, #8B5CF6, #C084FC)",
    },
    {
      title: "Health Metrics",
      path: "/health-metrics",
      icon: <MonitorHeart />,
      gradient: "linear-gradient(45deg, #F472B6, #FB7185)",
    },
    {
      title: "Resources",
      path: "/resources",
      icon: <MenuBook />,
      gradient: "linear-gradient(45deg, #34D399, #6EE7B7)",
    },
  ];

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: isScrolled
            ? "rgba(255, 255, 255, 0.9)"
            : "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.4)",
          transition: "all 0.3s ease",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
            {/* Logo Section */}
            <Link to="/" style={{ textDecoration: "none" }}>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                component={motion.div}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                >
                  <HealthAndSafety
                    sx={{
                      fontSize: 32,
                      background: "linear-gradient(45deg, #8B5CF6, #FB7185)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  />
                </motion.div>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    background: "linear-gradient(45deg, #8B5CF6, #FB7185)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Virtual Health Assistant
                </Typography>
              </Stack>
            </Link>

            {/* Navigation Items */}
            <Stack direction="row" spacing={1}>
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  style={{ textDecoration: "none" }}
                >
                  <motion.div
                    onHoverStart={() => setHoveredItem(item.path)}
                    onHoverEnd={() => setHoveredItem(null)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      sx={{
                        px: 2,
                        py: 1,
                        color:
                          location.pathname === item.path
                            ? "#6366f1"
                            : "#64748b",
                        position: "relative",
                        overflow: "hidden",
                        background:
                          hoveredItem === item.path
                            ? "rgba(255, 255, 255, 0.1)"
                            : "transparent",
                        backdropFilter: "blur(8px)",
                        borderRadius: "12px",
                        "&::after": {
                          content: '""',
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          width:
                            location.pathname === item.path ? "100%" : "0%",
                          height: "2px",
                          background: item.gradient,
                          transition: "width 0.3s ease",
                        },
                        "&:hover::after": {
                          width: "100%",
                        },
                      }}
                    >
                      <Stack direction="row" spacing={1} alignItems="center">
                        <motion.div
                          animate={
                            hoveredItem === item.path
                              ? {
                                  rotate: [0, 15, -15, 0],
                                  scale: [1, 1.2, 1],
                                }
                              : {}
                          }
                          transition={{ duration: 0.5 }}
                        >
                          {React.cloneElement(item.icon, {
                            sx: {
                              fontSize: 20,
                              background: item.gradient,
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "transparent",
                            },
                          })}
                        </motion.div>
                        <Typography
                          sx={{
                            background:
                              hoveredItem === item.path
                                ? item.gradient
                                : "none",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor:
                              hoveredItem === item.path
                                ? "transparent"
                                : "inherit",
                          }}
                        >
                          {item.title}
                        </Typography>
                      </Stack>
                    </Button>
                  </motion.div>
                </Link>
              ))}

              {/* Notifications */}
              <Tooltip title="Notifications">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <IconButton
                    sx={{
                      ml: 2,
                      background: "linear-gradient(45deg, #8B5CF6, #FB7185)",
                      color: "white",
                      "&:hover": {
                        background: "linear-gradient(45deg, #7C3AED, #F43F5E)",
                      },
                    }}
                  >
                    <Badge badgeContent={notifications} color="error">
                      <Notifications />
                    </Badge>
                  </IconButton>
                </motion.div>
              </Tooltip>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
    </motion.div>
  );
};

export default Navbar;
