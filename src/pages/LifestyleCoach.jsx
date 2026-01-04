import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  IconButton,
  Slider,
  LinearProgress,
  Avatar,
  Tooltip,
  Snackbar,
} from "@mui/material";
import {
  Psychology,
  SelfImprovement,
  Restaurant,
  DirectionsRun,
  Bedtime,
  Close,
  Refresh,
  Favorite,
  EmojiEvents,
  TrendingUp,
  WaterDrop,
  LocalCafe,
  SentimentSatisfiedAlt,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { getGeminiResponse } from "../config/geminiConfig";

function LifestyleCoach() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [userQuery, setUserQuery] = useState("");
  const [moodScore, setMoodScore] = useState(7);
  const [streakCount, setStreakCount] = useState(5);
  const [waterIntake, setWaterIntake] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [aiHistory, setAiHistory] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const categories = [
    {
      name: "Exercise",
      icon: <DirectionsRun />,
      color: "#10B981",
      progress: 75,
      description: "Daily activity & fitness goals",
    },
    {
      name: "Nutrition",
      icon: <Restaurant />,
      color: "#F59E0B",
      progress: 60,
      description: "Balanced diet & hydration",
    },
    {
      name: "Mental Wellness",
      icon: <SelfImprovement />,
      color: "#EC4899",
      progress: 70,
      description: "Mindfulness & emotional health",
    },
  ];

  // Mood tracking
  const handleMoodChange = (event, newValue) => {
    setMoodScore(newValue);
    if (newValue >= 8) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
    }
  };

  // Water intake tracking
  const handleWaterIntake = () => {
    setWaterIntake((prev) => {
      const newValue = prev + 250; // Add 250ml
      if (newValue >= 2000) {
        // Daily goal reached
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 3000);
      }
      return newValue;
    });
  };

  const handleGetPersonalizedAdvice = async () => {
    if (!userQuery.trim()) {
      setError("Please enter your question");
      return;
    }

    setLoading(true);
    try {
      const prompt = `Provide a single, direct response to this health query: "${userQuery}"

      Current metrics:
      - Mood: ${moodScore}/10
      - Exercise: ${categories.find((c) => c.name === "Exercise").progress}%
      - Mental wellness: ${
        categories.find((c) => c.name === "Mental Wellness").progress
      }%
      - Nutrition: ${categories.find((c) => c.name === "Nutrition").progress}%

      Important:
      - Provide direct, actionable advice
      - Do not use any prefixes or headers
      - Write as a clear, single paragraph
      - Focus on the specific question asked`;

      const response = await getGeminiResponse(prompt);

      const personalizedRecommendation = {
        category: "Personalized Advice",
        tip: response.replace(/^\*\*.*?\*\*/g, "").trim(),
        priority: "High",
        timestamp: new Date().toISOString(),
        query: userQuery,
        isPersonalized: true,
      };

      // Add personalized recommendation while keeping base recommendations
      setRecommendations((prev) => {
        const baseRecs = prev.filter((rec) => rec.isBase);
        return [...baseRecs, personalizedRecommendation];
      });

      setOpenDialog(false);
      setUserQuery("");
    } catch (error) {
      console.error("Error getting advice:", error);
      setError(error.message || "Failed to get health advice");
    } finally {
      setLoading(false);
    }
  };

  const handleRefreshAdvice = async () => {
    setIsRefreshing(true);
    try {
      const refreshPrompt = `Based on these health metrics, provide exactly 3 unique health recommendations:

      Current Status:
      - Mood: ${moodScore}/10
      - Water intake: ${waterIntake}/2000ml
      - Exercise: ${categories.find((c) => c.name === "Exercise").progress}%
      - Mental Wellness: ${
        categories.find((c) => c.name === "Mental Wellness").progress
      }%
      - Nutrition: ${categories.find((c) => c.name === "Nutrition").progress}%

      Provide 3 unique recommendations focusing on:
      1. The metric needing most improvement
      2. Maintaining current strengths
      3. Overall health balance

      Important:
      - Write each recommendation as a direct statement
      - Do not include any prefixes, numbers, or labels
      - Do not use "Recommendation:" or similar headers
      - Each piece of advice must be completely different
      - Focus on practical, actionable advice`;

      const response = await getGeminiResponse(refreshPrompt);

      if (!response) {
        throw new Error("No response received");
      }

      // Clean and process recommendations
      const recommendations = response
        .split("\n\n")
        .filter((rec) => rec.trim().length > 0)
        .map((rec) =>
          rec
            .replace(/^\*\*.*?\*\*/g, "") // Remove any markdown headers
            .replace(/^Recommendation \d+.*?:/gi, "") // Remove numbered recommendations
            .replace(/^\(.*?\):/g, "") // Remove parenthetical labels
            .replace(/^Target area:.*?\n/gi, "") // Remove target area labels
            .trim()
        )
        // Remove duplicates
        .filter(
          (rec, index, self) =>
            self.findIndex((t) =>
              t.toLowerCase().includes(rec.toLowerCase().substring(0, 50))
            ) === index
        )
        .slice(0, 3) // Keep exactly 3 recommendations
        .map((rec, index) => ({
          category: "Health Insight",
          tip: rec,
          priority: "Medium",
          timestamp: new Date().toISOString(),
          isBase: true,
        }));

      setRecommendations(recommendations);
    } catch (error) {
      console.error("Error refreshing advice:", error);
      setError(error.message || "Failed to refresh recommendations");
    } finally {
      setIsRefreshing(false);
    }
  };

  // Celebration animation component
  const CelebrationEffect = () => (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 1000,
      }}
    >
      <EmojiEvents sx={{ fontSize: 100, color: "#F59E0B" }} />
    </motion.div>
  );

  useEffect(() => {
    handleRefreshAdvice();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <AnimatePresence>
        {showCelebration && <CelebrationEffect />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Psychology sx={{ fontSize: 80, color: "#6366f1", mb: 2 }} />
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
            Lifestyle Coach
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            Get personalized recommendations for a healthier lifestyle
          </Typography>
        </Box>

        {/* Mood Tracker */}
        <Paper
          sx={{
            p: 3,
            mb: 4,
            background: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(12px)",
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Daily Mood Tracker
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <SentimentSatisfiedAlt />
            <Slider
              value={moodScore}
              onChange={handleMoodChange}
              min={1}
              max={10}
              marks
              sx={{ color: "#6366f1" }}
            />
            <Typography>{moodScore}/10</Typography>
          </Box>
        </Paper>

        {/* Progress Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {categories.map((category) => (
            <Grid item xs={12} sm={6} md={3} key={category.name}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card
                  sx={{
                    background: "rgba(255, 255, 255, 0.8)",
                    backdropFilter: "blur(12px)",
                    borderRadius: "16px",
                    overflow: "hidden",
                  }}
                >
                  <CardContent>
                    <Box sx={{ position: "relative" }}>
                      {React.cloneElement(category.icon, {
                        sx: { fontSize: 40, color: category.color },
                      })}
                      <LinearProgress
                        variant="determinate"
                        value={category.progress}
                        sx={{
                          mt: 2,
                          height: 8,
                          borderRadius: 4,
                          backgroundColor: `${category.color}20`,
                          "& .MuiLinearProgress-bar": {
                            backgroundColor: category.color,
                          },
                        }}
                      />
                    </Box>
                    <Typography variant="h6" sx={{ mt: 2 }}>
                      {category.name}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Water Intake Tracker */}
        <Paper
          sx={{
            p: 3,
            mb: 4,
            background: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(12px)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">Water Intake</Typography>
            <Button
              startIcon={<WaterDrop />}
              onClick={handleWaterIntake}
              variant="contained"
              sx={{ background: "#0EA5E9" }}
            >
              Add 250ml
            </Button>
          </Box>
          <LinearProgress
            variant="determinate"
            value={(waterIntake / 2000) * 100}
            sx={{ mt: 2, height: 10, borderRadius: 5 }}
          />
          <Typography sx={{ mt: 1 }}>{waterIntake}ml / 2000ml</Typography>
        </Paper>

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
          <Button
            variant="contained"
            onClick={() => setOpenDialog(true)}
            sx={{
              background: "linear-gradient(45deg, #6366f1, #ec4899)",
              color: "white",
              "&:hover": {
                background: "linear-gradient(45deg, #4f46e5, #db2777)",
              },
            }}
          >
            Get Personalized Advice
          </Button>
          <IconButton
            className="refresh-button"
            onClick={handleRefreshAdvice}
            disabled={isRefreshing}
            sx={{
              color: "#6366f1",
              transition: "transform 1s ease",
              "&:hover": {
                transform: "rotate(180deg)",
              },
            }}
          >
            <Refresh />
          </IconButton>
        </Box>

        <AnimatePresence>
          {recommendations.map((rec, index) => (
            <motion.div
              key={rec.timestamp || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
            >
              <Paper
                sx={{
                  p: 3,
                  mb: 2,
                  background: "rgba(255, 255, 255, 0.8)",
                  backdropFilter: "blur(12px)",
                  borderRadius: "16px",
                  border: "1px solid rgba(255, 255, 255, 0.4)",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6">{rec.category}</Typography>
                  <Chip
                    label={rec.priority}
                    color={rec.priority === "High" ? "error" : "warning"}
                    size="small"
                  />
                </Box>
                <Typography sx={{ mt: 2, whiteSpace: "pre-line" }}>
                  {rec.tip}
                </Typography>
                {rec.query && (
                  <Typography
                    variant="caption"
                    sx={{ mt: 2, display: "block", color: "text.secondary" }}
                  >
                    Based on query: "{rec.query}"
                  </Typography>
                )}
              </Paper>
            </motion.div>
          ))}
        </AnimatePresence>

        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          PaperProps={{
            sx: {
              background: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(12px)",
              borderRadius: "24px",
              minWidth: "300px",
              maxWidth: "600px",
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
              <Typography variant="h6">Get Personalized Advice</Typography>
              <IconButton onClick={() => setOpenDialog(false)}>
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
              placeholder="Ask about your health, lifestyle, or specific goals..."
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              sx={{ mt: 2 }}
            />
            <Button
              fullWidth
              variant="contained"
              onClick={handleGetPersonalizedAdvice}
              disabled={loading || !userQuery.trim()}
              sx={{
                mt: 2,
                background: "linear-gradient(45deg, #6366f1, #ec4899)",
                color: "white",
                "&:hover": {
                  background: "linear-gradient(45deg, #4f46e5, #db2777)",
                },
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Get Advice"
              )}
            </Button>
          </DialogContent>
        </Dialog>
      </motion.div>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        message={error}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      />
    </Container>
  );
}

export default LifestyleCoach;
