import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  IconButton,
  Tooltip,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  MonitorHeart,
  MedicalServices,
  LocalHospital,
  Timeline,
  ArrowForward,
  HealthAndSafety,
  Psychology,
  Speed,
  Notifications,
  Assistant,
  TrendingUp,
  WaterDrop,
} from "@mui/icons-material";
import Navbar from "./components/Navbar";
import SymptomChecker from "./pages/SymptomChecker";
import HealthMetrics from "./pages/HealthMetrics";
import Resources from "./pages/Resources";
import Dashboard from "./pages/Dashboard";
import AnimatedLogo from "./components/AnimatedLogo";
import MedicineTracker from "./pages/MedicineTracker";
import { gapi } from "gapi-script";
import LifestyleCoach from "./pages/LifestyleCoach";

// Modern Glassmorphic Card with Enhanced Effects
const FeatureCard = ({ icon, title, description, onClick }) => (
  <motion.div
    whileHover={{ y: -8 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <Paper
      onClick={onClick}
      sx={{
        p: 4,
        height: "100%",
        cursor: "pointer",
        background: "rgba(255, 255, 255, 0.85)",
        backdropFilter: "blur(12px)",
        borderRadius: "24px",
        border: "1px solid rgba(255, 255, 255, 0.5)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: "linear-gradient(90deg, #6366f1, #ec4899)",
          opacity: 0,
          transition: "opacity 0.3s ease",
        },
        "&:hover": {
          background: "rgba(255, 255, 255, 0.95)",
          border: "1px solid rgba(255, 255, 255, 0.7)",
          boxShadow: "0 8px 40px rgba(0, 0, 0, 0.12)",
          "&::before": {
            opacity: 1,
          },
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
        }}
      >
        <Box
          sx={{
            p: 2.5,
            borderRadius: "20px",
            background:
              "linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(236, 72, 153, 0.1))",
            transform: "rotate(-5deg)",
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "rotate(0deg)",
            },
          }}
        >
          {React.cloneElement(icon, { sx: { fontSize: 40 } })}
        </Box>

        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            background: "linear-gradient(45deg, #6366f1, #ec4899)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textAlign: "center",
            mb: 1,
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "text.secondary",
            textAlign: "center",
            lineHeight: 1.7,
            mb: 2,
          }}
        >
          {description}
        </Typography>

        <Tooltip title="Explore">
          <IconButton
            size="large"
            sx={{
              background: "linear-gradient(45deg, #6366f1, #ec4899)",
              color: "white",
              p: 2,
              "&:hover": {
                background: "linear-gradient(45deg, #4f46e5, #db2777)",
                transform: "scale(1.1)",
              },
              transition: "transform 0.3s ease",
            }}
          >
            <ArrowForward />
          </IconButton>
        </Tooltip>
      </Box>
    </Paper>
  </motion.div>
);

function Home() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <MonitorHeart sx={{ color: "#6366f1" }} />,
      title: "Health Monitoring",
      description:
        "Advanced real-time tracking of vital signs and health metrics with AI-powered insights and personalized recommendations.",
      action: () => navigate("/health-metrics"),
    },
    {
      icon: <Psychology sx={{ color: "#ec4899" }} />,
      title: "AI Health Assistant",
      description:
        "Intelligent health companion providing 24/7 support, personalized advice, and real-time health insights.",
      action: () => navigate("/dashboard"),
    },
    {
      icon: <MedicalServices sx={{ color: "#6366f1" }} />,
      title: "Symptom Analysis",
      description:
        "Advanced AI-powered symptom checker with detailed health assessments and professional recommendations.",
      action: () => navigate("/symptom-checker"),
    },
    {
      icon: <Speed sx={{ color: "#ec4899" }} />,
      title: "Wellness Tracking",
      description:
        "Comprehensive wellness monitoring with personalized goals, progress tracking, and achievement rewards.",
      action: () => navigate("/resources"),
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ textAlign: "center", mb: 8 }}>
        <AnimatedLogo />

        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontWeight: 800,
            background: "linear-gradient(45deg, #6366f1, #ec4899)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 3,
            filter: "drop-shadow(0 0 1px rgba(236, 72, 153, 0.3))",
          }}
        >
          Your AI Health Companion
        </Typography>

        <Typography
          variant="h5"
          sx={{
            color: "text.secondary",
            maxWidth: "800px",
            margin: "0 auto",
            lineHeight: 1.8,
          }}
        >
          Experience the future of healthcare with our AI-powered platform that
          provides personalized health insights and real-time monitoring.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {features.map((feature, index) => (
          <Grid item xs={12} md={6} key={index}>
            <FeatureCard
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              onClick={feature.action}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

const GOOGLE_FIT_CONFIG = {
  clientId:
    "234152782628-1p2l0hqict8et9fdssr358urrlpeknca.apps.googleusercontent.com.apps.googleusercontent.com",
  scope: [
    "https://www.googleapis.com/auth/fitness.activity.read",
    "https://www.googleapis.com/auth/fitness.heart_rate.read",
    "https://www.googleapis.com/auth/fitness.sleep.read",
  ].join(" "),
};

const GoogleFitData = () => {
  const [fitData, setFitData] = useState({
    steps: 0,
    heartRate: 0,
    sleep: null,
  });

  const fetchGoogleFitData = async () => {
    try {
      const response = await gapi.client.fitness.users.dataset.aggregate({
        userId: "me",
        requestBody: {
          aggregateBy: [
            {
              dataTypeName: "com.google.step_count.delta",
            },
          ],
          startTimeMillis: new Date().setHours(0, 0, 0, 0),
          endTimeMillis: new Date().getTime(),
        },
      });

      // Process and set the data
      setFitData((prevData) => ({
        ...prevData,
        steps:
          response.result.bucket[0]?.dataset[0]?.point[0]?.value[0]?.intVal ||
          0,
      }));
    } catch (error) {
      console.error("Error fetching Google Fit data:", error);
    }
  };

  const initializeGoogleFit = () => {
    gapi.load("client:auth2", () => {
      gapi.client
        .init({
          clientId: GOOGLE_FIT_CONFIG.clientId,
          scope: GOOGLE_FIT_CONFIG.scope,
        })
        .then(() => {
          // Check if user is signed in
          if (!gapi.auth2.getAuthInstance().isSignedIn.get()) {
            gapi.auth2.getAuthInstance().signIn();
          }
          // Initialize the Fitness API
          return gapi.client.load("fitness", "v1");
        })
        .then(() => {
          fetchGoogleFitData();
        })
        .catch((error) => {
          console.error("Error initializing Google Fit:", error);
        });
    });
  };

  useEffect(() => {
    initializeGoogleFit();
  }, []);

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6">Google Fit Data</Typography>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h6">Steps</Typography>
            <Typography>{fitData.steps}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h6">Heart Rate</Typography>
            <Typography>{fitData.heartRate} BPM</Typography>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h6">Sleep</Typography>
            <Typography>{fitData.sleep || "No data"}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

function App() {
  return (
    <Router>
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #f0f4ff 0%, #fff1f2 100%)",
        }}
      >
        <Navbar />
        <Box sx={{ py: 4 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/symptom-checker" element={<SymptomChecker />} />
            <Route path="/health-metrics" element={<HealthMetrics />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/medications" element={<MedicineTracker />} />
            <Route path="/lifestyle" element={<LifestyleCoach />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
