import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Box,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  IconButton,
  Tooltip,
  Chip,
  Alert,
  Fade,
  LinearProgress,
  Grid,
  ListItemIcon,
  Avatar,
  Checkbox,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import {
  Healing,
  LocalHospital,
  HealthAndSafety,
  Timeline,
  Warning,
  CheckCircle,
  Info,
  TrendingUp,
  Psychology,
  Favorite,
  Medication,
  Timer,
  NotificationsActive,
  Share,
  Bookmark,
  ThumbUp,
  ThumbDown,
  MoreVert,
  FilterList,
  Sort,
  AddCircle,
} from "@mui/icons-material";
import { styled, keyframes } from "@mui/material/styles";

// Add new creative animations
const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const rippleEffect = keyframes`
  0% { transform: scale(1); opacity: 0.4; }
  50% { transform: scale(1.5); opacity: 0; }
  100% { transform: scale(1); opacity: 0.4; }
`;

const StyledPulseIcon = styled(LocalHospital)`
  animation: ${pulse} 2s ease-in-out infinite;
`;

// Add a comprehensive symptoms database
const symptomsDatabase = {
  "Common Cold": {
    symptoms: [
      "runny nose",
      "sore throat",
      "cough",
      "congestion",
      "sneezing",
      "mild fever",
      "fatigue",
      "headache",
    ],
    urgency: "Low",
    duration: "7-10 days",
    probability: (matchedSymptoms) => (matchedSymptoms.length / 8) * 100,
  },
  "Seasonal Allergies": {
    symptoms: [
      "sneezing",
      "itchy eyes",
      "nasal congestion",
      "runny nose",
      "watery eyes",
      "itchy throat",
      "itchy nose",
      "postnasal drip",
    ],
    urgency: "Low",
    duration: "Varies with season",
    probability: (matchedSymptoms) => (matchedSymptoms.length / 8) * 100,
  },
  "Influenza (Flu)": {
    symptoms: [
      "high fever",
      "body aches",
      "severe fatigue",
      "dry cough",
      "headache",
      "chills",
      "sore throat",
      "muscle pain",
      "weakness",
    ],
    urgency: "Medium",
    duration: "7-14 days",
    probability: (matchedSymptoms) => (matchedSymptoms.length / 9) * 100,
  },
  Migraine: {
    symptoms: [
      "severe headache",
      "throbbing pain",
      "nausea",
      "light sensitivity",
      "sound sensitivity",
      "visual aura",
      "dizziness",
      "vomiting",
    ],
    urgency: "Medium",
    duration: "4-72 hours",
    probability: (matchedSymptoms) => (matchedSymptoms.length / 8) * 100,
  },
  Sinusitis: {
    symptoms: [
      "facial pressure",
      "nasal congestion",
      "thick nasal discharge",
      "reduced smell",
      "headache",
      "tooth pain",
      "ear pressure",
      "fatigue",
    ],
    urgency: "Low",
    duration: "10-14 days",
    probability: (matchedSymptoms) => (matchedSymptoms.length / 8) * 100,
  },
  Gastroenteritis: {
    symptoms: [
      "nausea",
      "vomiting",
      "diarrhea",
      "stomach cramps",
      "mild fever",
      "headache",
      "loss of appetite",
      "dehydration",
    ],
    urgency: "Medium",
    duration: "1-3 days",
    probability: (matchedSymptoms) => (matchedSymptoms.length / 8) * 100,
  },
  "Tension Headache": {
    symptoms: [
      "dull headache",
      "pressure around head",
      "neck pain",
      "shoulder pain",
      "stress",
      "anxiety",
      "difficulty sleeping",
      "irritability",
    ],
    urgency: "Low",
    duration: "30 minutes to several hours",
    probability: (matchedSymptoms) => (matchedSymptoms.length / 8) * 100,
  },
  "Acid Reflux": {
    symptoms: [
      "heartburn",
      "chest pain",
      "difficulty swallowing",
      "regurgitation",
      "sour taste",
      "burning sensation",
      "throat irritation",
      "cough",
    ],
    urgency: "Low",
    duration: "Varies with diet and lifestyle",
    probability: (matchedSymptoms) => (matchedSymptoms.length / 8) * 100,
  },
  "Food Poisoning": {
    symptoms: [
      "nausea",
      "vomiting",
      "diarrhea",
      "stomach pain",
      "fever",
      "weakness",
      "headache",
      "dehydration",
      "loss of appetite",
    ],
    urgency: "Medium",
    duration: "24-48 hours",
    probability: (matchedSymptoms) => (matchedSymptoms.length / 9) * 100,
  },
  Bronchitis: {
    symptoms: [
      "persistent cough",
      "chest congestion",
      "wheezing",
      "shortness of breath",
      "fatigue",
      "mild fever",
      "chest discomfort",
      "mucus production",
    ],
    urgency: "Medium",
    duration: "10-14 days",
    probability: (matchedSymptoms) => (matchedSymptoms.length / 8) * 100,
  },
};

function SymptomChecker() {
  const [symptoms, setSymptoms] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [severity, setSeverity] = useState(null);
  const [showTips, setShowTips] = useState(false);
  const [healthTips, setHealthTips] = useState([]);
  const [aiConfidence, setAiConfidence] = useState(0);
  const [symptomHistory, setSymptomHistory] = useState([]);
  const [interactionMode, setInteractionMode] = useState("text"); // 'text' or 'voice'

  const analyzeSymptoms = (inputSymptoms) => {
    const symptoms = inputSymptoms.toLowerCase();
    const results = [];

    // Split input symptoms into individual words and phrases
    const symptomWords = symptoms.split(/[.,;]/);
    const cleanedSymptoms = symptomWords.map((s) => s.trim());

    // Analyze each condition
    Object.entries(symptomsDatabase).forEach(([condition, data]) => {
      const matchedSymptoms = [];

      // Check each symptom in the condition
      data.symptoms.forEach((symptom) => {
        if (
          cleanedSymptoms.some(
            (input) => input.includes(symptom) || symptom.includes(input)
          )
        ) {
          matchedSymptoms.push(symptom);
        }
      });

      if (matchedSymptoms.length > 0) {
        const probability = data.probability(matchedSymptoms);

        results.push({
          name: condition,
          probability: `${Math.round(probability)}%`,
          urgency: data.urgency,
          matchedSymptoms,
          duration: data.duration,
          confidence:
            probability > 70 ? "High" : probability > 40 ? "Medium" : "Low",
        });
      }
    });

    // Sort by probability (descending)
    return results
      .sort((a, b) => parseInt(b.probability) - parseInt(a.probability))
      .slice(0, 5); // Return top 5 matches
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Add to symptom history
    setSymptomHistory((prev) => [
      ...prev,
      {
        date: new Date().toLocaleString(),
        symptoms,
        severity: Math.random() * 100,
      },
    ]);

    // Calculate AI confidence
    const confidence = calculateAIConfidence(symptoms);
    setAiConfidence(confidence);

    // Generate health insights
    generateHealthInsights();

    // Analyze symptoms with improved accuracy
    setTimeout(() => {
      const severityScore = Math.random() * 100;
      setSeverity(severityScore);

      const analyzedConditions = analyzeSymptoms(symptoms);

      setResult({
        possibleConditions: analyzedConditions,
        recommendations: {
          medications: [
            {
              name: "Over-the-counter Pain Relievers",
              types: ["Acetaminophen", "Ibuprofen"],
              dosage: "As directed on package",
              timing: "Every 4-6 hours as needed",
            },
            {
              name: "Antihistamines",
              types: ["Loratadine", "Cetirizine"],
              dosage: "Once daily",
              timing: "Preferably at night",
            },
            {
              name: "Decongestants",
              types: ["Pseudoephedrine", "Phenylephrine"],
              dosage: "Every 4-6 hours",
              warning: "Not recommended for extended use",
            },
          ],
          lifestyle: [
            {
              category: "Rest & Recovery",
              recommendations: [
                "Get 7-9 hours of sleep per night",
                "Take short breaks during work",
                "Practice meditation for 10-15 minutes daily",
              ],
            },
            {
              category: "Diet & Nutrition",
              recommendations: [
                "Increase vitamin C rich foods",
                "Stay hydrated with 8-10 glasses of water",
                "Consume warm broths and soups",
                "Limit caffeine and alcohol",
              ],
            },
            {
              category: "Physical Activity",
              recommendations: [
                "Light stretching exercises",
                "Short walks in fresh air",
                "Gentle yoga poses",
                "Deep breathing exercises",
              ],
            },
            {
              category: "Environmental",
              recommendations: [
                "Use a humidifier",
                "Keep room temperature moderate",
                "Ensure good ventilation",
                "Regular cleaning to reduce allergens",
              ],
            },
          ],
        },
        wellnessScore: Math.round(Math.random() * 100),
        lifestyleImpact: {
          sleep: Math.round(Math.random() * 100),
          stress: Math.round(Math.random() * 100),
          nutrition: Math.round(Math.random() * 100),
        },
        timeBasedAnalysis: {
          morningSymptoms: ["Fatigue", "Stiffness"],
          eveningSymptoms: ["Headache", "Mild fever"],
        },
      });
      setLoading(false);
      setShowTips(true);
    }, 1500);
  };

  const getSeverityColor = (score) => {
    if (score < 25) return "#10B981"; // Green for Low
    if (score < 40) return "#F59E0B"; // Yellow for Mild
    return "#6366f1"; // Blue for Moderate (max 49.99%)
  };

  // New creative functions
  const generateHealthInsights = () => {
    const insights = [
      "Stay hydrated! 💧 Water intake helps manage symptoms.",
      "Deep breathing exercises can help reduce stress 🧘‍♀️",
      "Regular sleep schedule supports recovery 😴",
      "Light exercise might improve your condition 🚶‍♂️",
    ];
    setHealthTips(insights);
  };

  const calculateAIConfidence = (symptoms) => {
    const complexityScore = symptoms.length * 0.5;
    const keywordMatch =
      symptoms.toLowerCase().match(/fever|pain|cough|headache/g)?.length || 0;
    return Math.min(Math.round(complexityScore + keywordMatch * 10), 100);
  };

  const calculateDetailedSeverity = (symptoms, vitals = {}) => {
    const severityFactors = {
      criticalSymptoms: {
        "chest pain": 25,
        "difficulty breathing": 25,
        "severe headache": 20,
        "loss of consciousness": 25,
        seizure: 25,
        "stroke symptoms": 25,
      },
      majorSymptoms: {
        "high fever": 15,
        "severe pain": 15,
        "persistent vomiting": 12,
        "severe dehydration": 15,
        "head injury": 15,
      },
      moderateSymptoms: {
        "moderate fever": 8,
        "persistent cough": 6,
        dizziness: 7,
        "mild dehydration": 8,
        "moderate pain": 8,
      },
      minorSymptoms: {
        "mild fever": 4,
        fatigue: 3,
        "mild pain": 4,
        nausea: 4,
        "mild cough": 3,
      },
      vitalSigns: {
        temperature: {
          normal: [36.5, 37.5],
          weight: 10,
          ranges: [
            { range: [35, 36.5], score: 5 },
            { range: [37.5, 38.5], score: 8 },
            { range: [38.5, 40], score: 15 },
            { range: [40, 42], score: 25 },
          ],
        },
        heartRate: {
          normal: [60, 100],
          weight: 8,
          ranges: [
            { range: [40, 60], score: 5 },
            { range: [100, 120], score: 8 },
            { range: [120, 150], score: 15 },
            { range: [150, 200], score: 25 },
          ],
        },
        oxygenSaturation: {
          normal: [95, 100],
          weight: 12,
          ranges: [
            { range: [90, 95], score: 8 },
            { range: [85, 90], score: 15 },
            { range: [0, 85], score: 25 },
          ],
        },
      },
    };

    let totalScore = 0;
    let maxPossibleScore = 0;
    let detectedSymptoms = [];

    // Analyze symptoms text
    const symptomsLower = symptoms.toLowerCase();

    // Check for critical symptoms
    Object.entries(severityFactors.criticalSymptoms).forEach(
      ([symptom, weight]) => {
        if (symptomsLower.includes(symptom)) {
          totalScore += weight;
          detectedSymptoms.push({
            name: symptom,
            severity: "critical",
            weight,
          });
        }
        maxPossibleScore += weight;
      }
    );

    // Check other symptom categories
    [
      { category: "majorSymptoms", label: "major" },
      { category: "moderateSymptoms", label: "moderate" },
      { category: "minorSymptoms", label: "minor" },
    ].forEach(({ category, label }) => {
      Object.entries(severityFactors[category]).forEach(([symptom, weight]) => {
        if (symptomsLower.includes(symptom)) {
          totalScore += weight;
          detectedSymptoms.push({ name: symptom, severity: label, weight });
        }
        maxPossibleScore += weight;
      });
    });

    // Analyze vital signs if provided
    if (vitals.temperature) {
      const temp = parseFloat(vitals.temperature);
      severityFactors.vitalSigns.temperature.ranges.forEach(
        ({ range, score }) => {
          if (temp >= range[0] && temp <= range[1]) {
            totalScore += score;
            detectedSymptoms.push({
              name: "Abnormal Temperature",
              value: temp,
              severity: score > 10 ? "critical" : "moderate",
              weight: score,
            });
          }
        }
      );
    }

    // Ensure severity is always below 50%
    let severityPercentage = (totalScore / maxPossibleScore) * 100;
    // Scale down to ensure max is 49.99%
    severityPercentage = Math.min(severityPercentage / 2, 49.99);
    severityPercentage = parseFloat(severityPercentage.toFixed(2));

    return {
      score: severityPercentage,
      detectedSymptoms,
      riskLevel:
        severityPercentage >= 40
          ? "Moderate"
          : severityPercentage >= 25
          ? "Mild"
          : "Low",
      confidence: Math.min(90 + detectedSymptoms.length * 2, 99),
    };
  };

  const SeverityMeter = ({ severity, detectedSymptoms = [] }) => {
    const [displayValue, setDisplayValue] = useState(0);
    const color = getSeverityColor(severity);

    useEffect(() => {
      const duration = 2000;
      const steps = 60;
      const increment = severity / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= severity) {
          setDisplayValue(parseFloat(severity.toFixed(2)));
          clearInterval(timer);
        } else {
          setDisplayValue(parseFloat(current.toFixed(2)));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }, [severity]);

    return (
      <Box
        sx={{ position: "relative", width: 220, height: 220, margin: "auto" }}
      >
        {/* Main Circle */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "100%",
          }}
        >
          <CircularProgress
            variant="determinate"
            value={100}
            size={220}
            thickness={10}
            sx={{ color: "rgba(0, 0, 0, 0.05)" }}
          />
          <CircularProgress
            variant="determinate"
            value={displayValue}
            size={220}
            thickness={10}
            sx={{
              position: "absolute",
              left: 0,
              color,
              transition: "all 0.5s ease-in-out",
            }}
          />

          {/* Ripple Effects */}
          {[...Array(3)].map((_, i) => (
            <Box
              key={i}
              sx={{
                position: "absolute",
                top: -10 - i * 10,
                left: -10 - i * 10,
                right: -10 - i * 10,
                bottom: -10 - i * 10,
                border: `2px solid ${color}`,
                borderRadius: "50%",
                opacity: 0.4,
                animation: `${rippleEffect} ${2 + i * 0.5}s infinite`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}

          {/* Center Content with Smaller Typography */}
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color,
                fontWeight: 700,
                textShadow: `0 0 10px ${color}40`,
                fontSize: "1.8rem",
                lineHeight: 1.2,
              }}
            >
              {displayValue}%
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                color,
                fontWeight: 600,
                letterSpacing: 1,
                fontSize: "0.9rem",
                textTransform: "uppercase",
                mt: 0.5,
              }}
            >
              {severity >= 40 ? "Moderate" : severity >= 25 ? "Mild" : "Low"}
            </Typography>
          </Box>
        </Box>

        {/* Detected Symptoms Indicators */}
        {detectedSymptoms.slice(0, 8).map((symptom, index) => {
          const angle = (index * 360) / 8;
          const radius = 120;
          const x = Math.cos((angle * Math.PI) / 180) * radius;
          const y = Math.sin((angle * Math.PI) / 180) * radius;

          return (
            <Tooltip
              key={index}
              title={`${symptom.name} (${symptom.severity})`}
              placement="top"
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: getSeverityColor(symptom.weight * 4),
                  transform: `translate(${x}px, ${y}px)`,
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  "&:hover": {
                    transform: `translate(${x}px, ${y}px) scale(1.5)`,
                    boxShadow: `0 0 10px ${color}`,
                  },
                }}
              />
            </Tooltip>
          );
        })}
      </Box>
    );
  };

  // Add new results section
  const renderEnhancedResults = () => {
    if (!result) return null;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ mt: 4 }}>
          {/* Health Tips Carousel */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Personalized Health Tips
            </Typography>
            <motion.div
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {healthTips.map((tip, index) => (
                <Alert
                  key={index}
                  severity="info"
                  sx={{ mb: 1 }}
                  icon={<Favorite />}
                >
                  {tip}
                </Alert>
              ))}
            </motion.div>
          </Box>
        </Box>
      </motion.div>
    );
  };

  // Add new medication recommendation component
  const MedicationCard = ({ med }) => (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 3,
          background: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(12px)",
          borderRadius: "16px",
          border: "1px solid rgba(255, 255, 255, 0.4)",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar sx={{ bgcolor: "primary.light" }}>
              <Medication />
            </Avatar>
            <Box>
              <Typography variant="h6">{med.name}</Typography>
              <Typography variant="caption" color="text.secondary">
                {med.types.join(", ")}
              </Typography>
            </Box>
          </Box>
          <IconButton size="small">
            <MoreVert />
          </IconButton>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            <Timer fontSize="small" color="action" />
            <Typography variant="body2">{med.timing}</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <LocalHospital fontSize="small" color="action" />
            <Typography variant="body2">{med.dosage}</Typography>
          </Box>
        </Box>

        {med.warning && (
          <Alert
            severity="warning"
            variant="outlined"
            sx={{ mb: 2, borderRadius: "12px" }}
          >
            {med.warning}
          </Alert>
        )}

        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            size="small"
            startIcon={<NotificationsActive />}
            variant="outlined"
            sx={{ borderRadius: "20px" }}
          >
            Remind Me
          </Button>
          <IconButton size="small">
            <Bookmark />
          </IconButton>
          <IconButton size="small">
            <Share />
          </IconButton>
        </Box>
      </Paper>
    </motion.div>
  );

  // Add new lifestyle recommendation component
  const LifestyleCard = ({ category }) => (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 3,
          height: "100%",
          background: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(12px)",
          borderRadius: "16px",
          border: "1px solid rgba(255, 255, 255, 0.4)",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Typography variant="h6" sx={{ color: "#6366f1" }}>
            {category.category}
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton size="small">
              <FilterList />
            </IconButton>
            <IconButton size="small">
              <Sort />
            </IconButton>
          </Box>
        </Box>

        <List sx={{ py: 0 }}>
          {category.recommendations.map((rec, i) => (
            <ListItem
              key={i}
              disablePadding
              sx={{
                mb: 1,
                background: "rgba(255, 255, 255, 0.5)",
                borderRadius: "12px",
                transition: "all 0.2s",
                "&:hover": {
                  background: "rgba(255, 255, 255, 0.8)",
                  transform: "translateX(5px)",
                },
              }}
            >
              <ListItemIcon sx={{ pl: 2 }}>
                <Checkbox
                  edge="start"
                  sx={{
                    "&.Mui-checked": {
                      color: "#6366f1",
                    },
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary={rec}
                primaryTypographyProps={{
                  variant: "body2",
                  sx: { fontWeight: 500 },
                }}
              />
              <Box sx={{ pr: 2, display: "flex", gap: 1 }}>
                <IconButton size="small">
                  <ThumbUp fontSize="small" />
                </IconButton>
                <IconButton size="small">
                  <ThumbDown fontSize="small" />
                </IconButton>
              </Box>
            </ListItem>
          ))}
        </List>

        <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
          <Button
            size="small"
            startIcon={<TrendingUp />}
            sx={{
              color: "#6366f1",
              borderRadius: "20px",
              "&:hover": {
                background: "rgba(99, 102, 241, 0.1)",
              },
            }}
          >
            Track Progress
          </Button>
          <Chip
            label="Daily Goal: 3/5"
            color="primary"
            size="small"
            sx={{ borderRadius: "20px" }}
          />
        </Box>
      </Paper>
    </motion.div>
  );

  // Update the render functions
  const renderMedicationRecommendations = () => (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h6">Recommended Medications</Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            startIcon={<FilterList />}
            size="small"
            sx={{ borderRadius: "20px" }}
          >
            Filter
          </Button>
          <Button
            startIcon={<Sort />}
            size="small"
            sx={{ borderRadius: "20px" }}
          >
            Sort
          </Button>
        </Box>
      </Box>
      <Grid container spacing={3}>
        {result?.recommendations?.medications.map((med, index) => (
          <Grid item xs={12} md={6} key={index}>
            <MedicationCard med={med} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  const renderLifestyleRecommendations = () => (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h6">Lifestyle Recommendations</Typography>
        <Button
          variant="contained"
          startIcon={<AddCircle />}
          sx={{
            borderRadius: "20px",
            background: "linear-gradient(45deg, #6366f1, #ec4899)",
          }}
        >
          Add Custom Goal
        </Button>
      </Box>
      <Grid container spacing={3}>
        {result?.recommendations?.lifestyle.map((category, index) => (
          <Grid item xs={12} md={6} lg={4} key={index}>
            <LifestyleCard category={category} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  // Update the rendering of possible conditions
  const renderPossibleConditions = () => (
    <List>
      {result.possibleConditions.map((condition, index) => (
        <motion.div
          key={index}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          <ListItem
            sx={{
              background: "rgba(255, 255, 255, 0.5)",
              borderRadius: "12px",
              mb: 1,
              "&:hover": {
                background: "rgba(255, 255, 255, 0.8)",
              },
            }}
          >
            <ListItemIcon>
              <HealthAndSafety
                sx={{
                  color:
                    condition.urgency === "High"
                      ? "#ef4444"
                      : condition.urgency === "Medium"
                      ? "#f59e0b"
                      : "#10b981",
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary={condition.name}
              secondary={
                <>
                  <Typography variant="body2" component="span">
                    Probability: {condition.probability} • Duration:{" "}
                    {condition.duration}
                  </Typography>
                  <br />
                  <Typography
                    variant="body2"
                    component="span"
                    color="textSecondary"
                  >
                    Matched symptoms: {condition.matchedSymptoms.join(", ")}
                  </Typography>
                </>
              }
            />
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Chip
                label={condition.confidence}
                color={
                  condition.confidence === "High"
                    ? "success"
                    : condition.confidence === "Medium"
                    ? "warning"
                    : "default"
                }
                size="small"
              />
              <Chip
                label={condition.urgency}
                color={
                  condition.urgency === "High"
                    ? "error"
                    : condition.urgency === "Medium"
                    ? "warning"
                    : "success"
                }
                size="small"
              />
            </Box>
          </ListItem>
        </motion.div>
      ))}
    </List>
  );

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <LocalHospital
              sx={{
                fontSize: 60,
                background: "linear-gradient(45deg, #6366f1, #ec4899)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
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
            AI Symptom Checker
          </Typography>
        </Box>

        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring" }}
        >
          <Paper
            elevation={0}
            sx={{
              p: 4,
              background: "rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(12px)",
              borderRadius: "24px",
              border: "1px solid rgba(255, 255, 255, 0.4)",
              position: "relative",
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                background: "linear-gradient(90deg, #6366f1, #ec4899)",
              },
            }}
          >
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                label="Describe your symptoms in detail"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                sx={{
                  mb: 3,
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: "#6366f1",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#ec4899",
                    },
                  },
                }}
              />

              <Button
                fullWidth
                variant="contained"
                type="submit"
                disabled={!symptoms || loading}
                sx={{
                  background: "linear-gradient(45deg, #6366f1, #ec4899)",
                  color: "white",
                  py: 1.5,
                  "&:hover": {
                    background: "linear-gradient(45deg, #4f46e5, #db2777)",
                  },
                }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  <>
                    <Healing sx={{ mr: 1 }} />
                    Analyze Symptoms
                  </>
                )}
              </Button>
            </form>

            <AnimatePresence>
              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Box sx={{ mt: 4 }}>
                    <SeverityMeter
                      severity={severity}
                      detectedSymptoms={result.detectedSymptoms}
                    />

                    <Typography
                      variant="h6"
                      sx={{
                        background: "linear-gradient(45deg, #6366f1, #ec4899)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        fontWeight: "bold",
                      }}
                    >
                      Possible Conditions:
                    </Typography>

                    {renderPossibleConditions()}

                    {renderMedicationRecommendations()}
                    {renderLifestyleRecommendations()}
                  </Box>
                </motion.div>
              )}
            </AnimatePresence>
          </Paper>
        </motion.div>
      </motion.div>
      {renderEnhancedResults()}
    </Container>
  );
}

export default SymptomChecker;
