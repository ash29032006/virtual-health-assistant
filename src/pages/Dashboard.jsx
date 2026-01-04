import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  IconButton,
  CircularProgress,
  Chip,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  LinearProgress,
  Tooltip,
  Paper,
  Alert,
  Snackbar,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import {
  MonitorHeart,
  MedicalServices,
  LocalHospital,
  Timeline,
  ArrowForward,
  Psychology,
  Speed,
  Notifications,
  Assistant,
  HealthAndSafety,
  TrendingUp,
  WaterDrop,
  DirectionsRun,
  Close,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const MotionCard = motion(Card);

function Dashboard() {
  const navigate = useNavigate();
  const [healthScore, setHealthScore] = useState(85);
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [openAIChat, setOpenAIChat] = useState(false);
  const [userQuery, setUserQuery] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [dailyStats, setDailyStats] = useState({
    steps: 7500,
    heartRate: 72,
    waterIntake: 1500,
    calories: 1800,
  });

  // Simulate AI response with better error handling
  const getAIResponse = async (query) => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const response = query
        ? `Based on your question about ${query}, I recommend...`
        : "Based on your recent health metrics, I recommend increasing your daily water intake and adding 15 minutes of meditation to your routine.";

      setAiSuggestion(response);
      if (query) {
        setOpenAIChat(false);
        setShowAlert(true);
        setAlertMessage("AI response received successfully!");
      }
    } catch (error) {
      console.error("AI API Error:", error);
      setShowAlert(true);
      setAlertMessage("Failed to get AI response. Please try again.");
    } finally {
      setIsLoading(false);
      setUserQuery("");
    }
  };

  // Update health score periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setHealthScore((prev) => {
        const variation = Math.random() * 2 - 1; // Random variation between -1 and 1
        return Math.min(Math.max(prev + variation, 0), 100); // Keep between 0 and 100
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Initial AI suggestion
  useEffect(() => {
    getAIResponse();
  }, []);

  // Enhanced HealthScoreRing with animation
  const HealthScoreRing = ({ score }) => (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <Box sx={{ position: "relative", width: 120, height: 120 }}>
        <CircularProgress
          variant="determinate"
          value={100}
          size={120}
          thickness={4}
          sx={{ color: "rgba(99, 102, 241, 0.1)" }}
        />
        <CircularProgress
          variant="determinate"
          value={score}
          size={120}
          thickness={4}
          sx={{
            position: "absolute",
            left: 0,
            color: score > 80 ? "#10B981" : score > 60 ? "#F59E0B" : "#EF4444",
            animation: "progress 1s ease-out forwards",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <Typography
              variant="h4"
              component="div"
              sx={{
                background: "linear-gradient(45deg, #6366f1, #ec4899)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: "bold",
              }}
            >
              {Math.round(score)}
            </Typography>
          </motion.div>
        </Box>
      </Box>
    </motion.div>
  );

  const cards = [
    {
      title: "Medicine Tracker",
      icon: <MedicalServices sx={{ fontSize: 40 }} />,
      description: "Track and manage your medications",
      path: "/medications",
      color: "#10B981",
      stats: "2 Active Prescriptions",
    },
    {
      title: "Lifestyle Coach",
      icon: <Psychology sx={{ fontSize: 40 }} />,
      description: "Personalized lifestyle recommendations",
      path: "/lifestyle",
      color: "#8B5CF6",
      stats: "3 New Tips",
    },
    {
      title: "Health Metrics",
      icon: <MonitorHeart sx={{ fontSize: 40 }} />,
      description: "Track vital signs and health metrics",
      path: "/health-metrics",
      color: "#6366f1",
      stats: `${dailyStats.heartRate} BPM`,
    },
    {
      title: "Daily Progress",
      icon: <DirectionsRun sx={{ fontSize: 40 }} />,
      description: "Track your daily health goals",
      path: "/progress",
      color: "#10B981",
      stats: `${dailyStats.steps} steps`,
    },
  ];

  const DashboardCard = ({ card, index }) => (
    <Grid item xs={12} sm={6} md={3}>
      <MotionCard
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ y: -8, transition: { duration: 0.2 } }}
        onClick={() => card.path && navigate(card.path)}
        sx={{
          height: "100%",
          background: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(12px)",
          borderRadius: "24px",
          overflow: "hidden",
          cursor: "pointer",
          border: "1px solid rgba(255, 255, 255, 0.4)",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            background: "rgba(255, 255, 255, 0.9)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        <CardContent>
          <Box sx={{ p: 2 }}>
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Avatar
                sx={{
                  width: 56,
                  height: 56,
                  background: `linear-gradient(135deg, ${card.color}, ${card.color}88)`,
                  mb: 2,
                }}
              >
                {card.icon}
              </Avatar>
            </motion.div>

            <Typography variant="h6" gutterBottom fontWeight="bold">
              {card.title}
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {card.description}
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Chip
                label={card.stats}
                sx={{
                  background: `linear-gradient(135deg, ${card.color}22, ${card.color}44)`,
                  color: card.color,
                  fontWeight: "bold",
                }}
              />
              <IconButton
                size="small"
                sx={{
                  background: `linear-gradient(45deg, ${card.color}, ${card.color}88)`,
                  color: "white",
                  "&:hover": { transform: "scale(1.1)" },
                }}
              >
                <ArrowForward />
              </IconButton>
            </Box>
          </Box>
        </CardContent>
      </MotionCard>
    </Grid>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <AnimatePresence>
        {showAlert && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Alert
              severity="success"
              onClose={() => setShowAlert(false)}
              sx={{ mb: 2 }}
            >
              {alertMessage}
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <HealthAndSafety
              sx={{
                fontSize: 60,
                color: "#6366f1",
                mb: 2,
              }}
            />
          </motion.div>

          <Typography
            variant="h3"
            sx={{
              background: "linear-gradient(45deg, #6366f1, #ec4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: "bold",
              mb: 2,
            }}
          >
            Your Health Dashboard
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
            <HealthScoreRing score={healthScore} />
          </Box>

          {aiSuggestion && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  background: "rgba(255, 255, 255, 0.8)",
                  backdropFilter: "blur(12px)",
                  borderRadius: "16px",
                  border: "1px solid rgba(255, 255, 255, 0.4)",
                  mb: 4,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Assistant sx={{ color: "#6366f1" }} />
                  <Typography variant="body1" color="text.secondary">
                    {aiSuggestion}
                  </Typography>
                </Box>
              </Paper>
            </motion.div>
          )}
        </Box>

        <Grid container spacing={3}>
          {cards.map((card, index) => (
            <DashboardCard key={index} card={card} index={index} />
          ))}
        </Grid>
      </motion.div>

      <Dialog
        open={openAIChat}
        onClose={() => setOpenAIChat(false)}
        PaperProps={{
          sx: {
            background: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(12px)",
            borderRadius: "24px",
          },
        }}
      >
        <DialogTitle>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">AI Health Assistant</Typography>
            <IconButton onClick={() => setOpenAIChat(false)}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            placeholder="Ask me anything about your health..."
            value={userQuery}
            onChange={(e) => setUserQuery(e.target.value)}
            sx={{ mt: 2 }}
          />
          <Button
            fullWidth
            variant="contained"
            onClick={() => getAIResponse(userQuery)}
            disabled={isLoading || !userQuery}
            sx={{
              mt: 2,
              background: "linear-gradient(45deg, #6366f1, #ec4899)",
              color: "white",
              "&:hover": {
                background: "linear-gradient(45deg, #4f46e5, #db2777)",
              },
            }}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Get AI Response"
            )}
          </Button>
        </DialogContent>
      </Dialog>
    </Container>
  );
}

export default Dashboard;
