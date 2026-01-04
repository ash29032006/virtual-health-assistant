import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Timeline, Favorite, ShowChart } from "@mui/icons-material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { gapi } from "gapi-script";
import {
  GOOGLE_FIT_CONFIG,
  initializeGoogleFit,
  fetchGoogleFitData,
} from "../config/googleFit";

function HealthMetrics() {
  const [healthData, setHealthData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHealthData = async () => {
    try {
      const [steps, heartRate, sleep] = await Promise.all([
        fetchGoogleFitData("com.google.step_count.delta"),
        fetchGoogleFitData("com.google.heart_rate.bpm"),
        fetchGoogleFitData("com.google.sleep.segment"),
      ]);

      // Combine all data
      const combinedData = steps.map((stepData) => ({
        date: stepData.date,
        steps: stepData.value,
        heartRate:
          heartRate.find((hr) => hr.date === stepData.date)?.value || 0,
        sleepHours:
          (sleep.find((sl) => sl.date === stepData.date)?.value || 0) / 3600000, // Convert ms to hours
      }));

      setHealthData(combinedData);
    } catch (error) {
      console.error("Error fetching health data:", error);
      const mockData = generateMockData();
      setHealthData(mockData);
    } finally {
      setIsLoading(false);
    }
  };

  const generateMockData = () => {
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return {
        date: date.toISOString().split("T")[0],
        steps: Math.floor(Math.random() * 10000),
        heartRate: Math.floor(Math.random() * 40) + 60,
        sleepHours: Math.floor(Math.random() * 4) + 4,
      };
    }).reverse(); // Reverse to show oldest to newest
  };

  useEffect(() => {
    const setupGoogleFit = async () => {
      try {
        setIsLoading(true);
        await initializeGoogleFit();
        await fetchHealthData();
      } catch (error) {
        console.error("Error setting up Google Fit:", error);
        setError("Failed to initialize Google Fit. Using mock data instead.");
        const mockData = generateMockData();
        setHealthData(mockData);
      } finally {
        setIsLoading(false);
      }
    };

    setupGoogleFit();
  }, []);

  const metrics = [
    {
      id: "steps",
      label: "Daily Steps",
      icon: <Timeline />,
      unit: "steps",
      color: "#10b981",
    },
    {
      id: "heartRate",
      label: "Heart Rate",
      icon: <Favorite />,
      unit: "bpm",
      color: "#ef4444",
    },
    {
      id: "sleepHours",
      label: "Sleep Duration",
      icon: <ShowChart />,
      unit: "hours",
      color: "#8b5cf6",
    },
  ];

  const MetricCard = ({ metric }) => (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        border: "1px solid rgba(255, 255, 255, 0.4)",
        borderRadius: "16px",
        background: "rgba(255, 255, 255, 0.9)",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography
          variant="h6"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <Box sx={{ color: metric.color }}>{metric.icon}</Box>
          {metric.label}
        </Typography>
      </Box>

      <Box sx={{ height: 200 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={healthData}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey={metric.id}
              stroke={metric.color}
              strokeWidth={2}
              dot={{ stroke: metric.color, strokeWidth: 2 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>

      <Typography
        variant="body2"
        sx={{ mt: 2, textAlign: "center", color: "text.secondary" }}
      >
        Latest: {healthData[healthData.length - 1]?.[metric.id] || "No data"}{" "}
        {metric.unit}
      </Typography>
    </Paper>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {error && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            py: 4,
          }}
        >
          <CircularProgress />
          <Typography sx={{ mt: 2 }}>Loading health metrics...</Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {metrics.map((metric) => (
            <Grid item xs={12} md={6} key={metric.id}>
              <MetricCard metric={metric} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default HealthMetrics;
