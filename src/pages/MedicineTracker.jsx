import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Chip,
  Box,
  Alert,
  Snackbar,
  CircularProgress,
  Paper,
} from "@mui/material";
import {
  Add,
  Delete,
  Edit,
  Medication,
  CheckCircle,
  Warning,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import axios from "axios";

const API_URL = "http://localhost:5002/api";
const MotionCard = motion(Card);

function MedicineTracker() {
  const [medications, setMedications] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingMed, setEditingMed] = useState(null);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [newMedication, setNewMedication] = useState({
    name: "",
    dosage: "",
    frequency: "",
    timeToTake: "",
    notes: "",
  });

  // Fetch medications
  useEffect(() => {
    fetchMedications();
  }, []);

  const fetchMedications = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/medications`, {
        withCredentials: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!response.data) {
        throw new Error("No data received from server");
      }

      setMedications(response.data);
    } catch (error) {
      console.error("Error fetching medications:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to load medications";
      showSnackbar(errorMessage, "error");
      setMedications([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleAddMedication = async () => {
    try {
      if (editingMed) {
        // Update existing medication
        const response = await axios.put(
          `${API_URL}/medications/${editingMed._id}`,
          newMedication
        );
        setMedications(
          medications.map((med) =>
            med._id === editingMed._id ? response.data : med
          )
        );
        showSnackbar("Medication updated successfully");
      } else {
        // Add new medication
        const response = await axios.post(
          `${API_URL}/medications`,
          newMedication
        );
        setMedications([...medications, response.data]);
        showSnackbar("Medication added successfully");
      }
      handleCloseDialog();
    } catch (error) {
      showSnackbar("Failed to save medication", "error");
      console.error("Error saving medication:", error);
    }
  };

  const handleOpenDialog = (medication = null) => {
    if (medication) {
      setEditingMed(medication);
      setNewMedication({
        name: medication.name,
        dosage: medication.dosage,
        frequency: medication.frequency,
        timeToTake: medication.timeToTake,
        notes: medication.notes || "",
      });
    } else {
      setEditingMed(null);
      setNewMedication({
        name: "",
        dosage: "",
        frequency: "",
        timeToTake: "",
        notes: "",
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingMed(null);
    setNewMedication({
      name: "",
      dosage: "",
      frequency: "",
      timeToTake: "",
      notes: "",
    });
  };

  const handleDelete = async (medication) => {
    try {
      await axios.delete(`${API_URL}/medications/${medication._id}`);
      setMedications(medications.filter((med) => med._id !== medication._id));
      showSnackbar("Medication deleted successfully");
    } catch (error) {
      showSnackbar("Failed to delete medication", "error");
      console.error("Error deleting medication:", error);
    }
  };

  const handleTakeMedication = async (medication) => {
    try {
      const response = await axios.put(
        `${API_URL}/medications/${medication._id}`,
        {
          ...medication,
          lastTaken: new Date().toISOString(),
        }
      );
      setMedications(
        medications.map((med) =>
          med._id === medication._id ? response.data : med
        )
      );
      showSnackbar("Medication marked as taken");
    } catch (error) {
      showSnackbar("Failed to update medication status", "error");
      console.error("Error updating medication:", error);
    }
  };

  if (loading) {
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        sx={{
          mb: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            background: "linear-gradient(45deg, #6366f1, #ec4899)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: "bold",
          }}
        >
          Medicine Tracker
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
          sx={{
            background: "linear-gradient(45deg, #6366f1, #ec4899)",
            "&:hover": {
              background: "linear-gradient(45deg, #4f46e5, #db2777)",
            },
          }}
        >
          Add Medication
        </Button>
      </Box>

      <Grid container spacing={3}>
        {medications.length === 0 && !loading ? (
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 3,
                textAlign: "center",
                background: "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(12px)",
              }}
            >
              <Typography variant="h6" color="text.secondary">
                No medications found
              </Typography>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => handleOpenDialog()}
                sx={{
                  mt: 2,
                  background: "linear-gradient(45deg, #6366f1, #ec4899)",
                  "&:hover": {
                    background: "linear-gradient(45deg, #4f46e5, #db2777)",
                  },
                }}
              >
                Add Your First Medication
              </Button>
            </Paper>
          </Grid>
        ) : (
          medications.map((med, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <MotionCard
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                sx={{
                  height: "100%",
                  background: "rgba(255, 255, 255, 0.8)",
                  backdropFilter: "blur(12px)",
                  borderRadius: "16px",
                  border: "1px solid rgba(255, 255, 255, 0.4)",
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <Typography variant="h6" component="div">
                      {med.name}
                    </Typography>
                    <Box>
                      <IconButton
                        onClick={() => handleOpenDialog(med)}
                        size="small"
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(med)}
                        size="small"
                        color="error"
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  </Box>

                  <Typography color="text.secondary" gutterBottom>
                    Dosage: {med.dosage}
                  </Typography>
                  <Typography color="text.secondary" gutterBottom>
                    Frequency: {med.frequency}
                  </Typography>
                  <Typography color="text.secondary" gutterBottom>
                    Time to take: {med.timeToTake}
                  </Typography>

                  {med.notes && (
                    <Typography color="text.secondary" sx={{ mt: 1 }}>
                      Notes: {med.notes}
                    </Typography>
                  )}

                  <Box
                    sx={{
                      mt: 2,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Chip
                      icon={med.lastTaken ? <CheckCircle /> : <Warning />}
                      label={
                        med.lastTaken
                          ? `Last taken: ${new Date(
                              med.lastTaken
                            ).toLocaleTimeString()}`
                          : "Not taken yet"
                      }
                      color={med.lastTaken ? "success" : "warning"}
                    />
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleTakeMedication(med)}
                      startIcon={<Medication />}
                      sx={{
                        background: "linear-gradient(45deg, #6366f1, #ec4899)",
                        "&:hover": {
                          background:
                            "linear-gradient(45deg, #4f46e5, #db2777)",
                        },
                      }}
                    >
                      Take Now
                    </Button>
                  </Box>
                </CardContent>
              </MotionCard>
            </Grid>
          ))
        )}
      </Grid>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {editingMed !== null ? "Edit Medication" : "Add New Medication"}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Medication Name"
            value={newMedication.name}
            onChange={(e) =>
              setNewMedication({ ...newMedication, name: e.target.value })
            }
            margin="normal"
          />
          <TextField
            fullWidth
            label="Dosage"
            value={newMedication.dosage}
            onChange={(e) =>
              setNewMedication({ ...newMedication, dosage: e.target.value })
            }
            margin="normal"
          />
          <TextField
            fullWidth
            label="Frequency"
            value={newMedication.frequency}
            onChange={(e) =>
              setNewMedication({ ...newMedication, frequency: e.target.value })
            }
            margin="normal"
          />
          <TextField
            fullWidth
            label="Time to Take"
            value={newMedication.timeToTake}
            onChange={(e) =>
              setNewMedication({ ...newMedication, timeToTake: e.target.value })
            }
            margin="normal"
          />
          <TextField
            fullWidth
            label="Notes"
            value={newMedication.notes}
            onChange={(e) =>
              setNewMedication({ ...newMedication, notes: e.target.value })
            }
            margin="normal"
            multiline
            rows={2}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleAddMedication}
            variant="contained"
            sx={{
              background: "linear-gradient(45deg, #6366f1, #ec4899)",
              "&:hover": {
                background: "linear-gradient(45deg, #4f46e5, #db2777)",
              },
            }}
          >
            {editingMed !== null ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default MedicineTracker;
