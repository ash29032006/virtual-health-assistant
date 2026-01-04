import React from "react";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import { HealthAndSafety } from "@mui/icons-material";

const AnimatedLogo = () => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1, rotateY: 360 }}
      transition={{
        duration: 1.5,
        scale: {
          type: "spring",
          stiffness: 260,
          damping: 20,
        },
        rotateY: {
          duration: 1.5,
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 5,
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: 120,
          height: 120,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "&::before": {
            content: '""',
            position: "absolute",
            width: "100%",
            height: "100%",
            background: "linear-gradient(45deg, #6366f1, #ec4899)",
            borderRadius: "30%",
            filter: "blur(15px)",
            opacity: 0.5,
            animation: "pulse 3s infinite",
          },
          "@keyframes pulse": {
            "0%": {
              transform: "scale(0.95)",
              opacity: 0.5,
            },
            "50%": {
              transform: "scale(1.05)",
              opacity: 0.8,
            },
            "100%": {
              transform: "scale(0.95)",
              opacity: 0.5,
            },
          },
        }}
      >
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <HealthAndSafety
            sx={{
              fontSize: 72,
              color: "#6366f1",
              filter: "drop-shadow(0 0 10px rgba(99, 102, 241, 0.5))",
              background: "linear-gradient(45deg, #6366f1, #ec4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          />
        </motion.div>
      </Box>
    </motion.div>
  );
};

export default AnimatedLogo;
