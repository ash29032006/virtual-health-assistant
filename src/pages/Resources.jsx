import React from "react";
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Article,
  VideoLibrary,
  LocalHospital,
  Book,
} from "@mui/icons-material";
import { motion } from "framer-motion";

function Resources() {
  const resources = [
    {
      title: "Health Articles",
      icon: <Article />,
      items: [
        { text: "Understanding Your Health Metrics", link: "#" },
        { text: "Preventive Health Care Guide", link: "#" },
        { text: "Nutrition and Wellness Tips", link: "#" },
      ],
    },
    {
      title: "Video Resources",
      icon: <VideoLibrary />,
      items: [
        { text: "Exercise Tutorial Series", link: "#" },
        { text: "Mental Health Awareness", link: "#" },
        { text: "Healthy Cooking Guides", link: "#" },
      ],
    },
    {
      title: "Medical Resources",
      icon: <LocalHospital />,
      items: [
        { text: "Find a Doctor", link: "#" },
        { text: "Emergency Services", link: "#" },
        { text: "Telehealth Services", link: "#" },
      ],
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            mb: 4,
            background: "linear-gradient(45deg, #6366f1, #ec4899)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: "bold",
          }}
        >
          Health Resources
        </Typography>

        <Grid container spacing={3}>
          {resources.map((section, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  height: "100%",
                  background: "rgba(255, 255, 255, 0.8)",
                  backdropFilter: "blur(12px)",
                  borderRadius: "20px",
                  border: "1px solid rgba(255, 255, 255, 0.4)",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Box
                    sx={{
                      mr: 2,
                      color: "#6366f1",
                      background: "rgba(99, 102, 241, 0.1)",
                      p: 1,
                      borderRadius: "12px",
                    }}
                  >
                    {section.icon}
                  </Box>
                  <Typography variant="h6">{section.title}</Typography>
                </Box>

                <List>
                  {section.items.map((item, itemIndex) => (
                    <ListItem key={itemIndex} sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: "36px" }}>
                        <Book sx={{ color: "#ec4899" }} />
                      </ListItemIcon>
                      <ListItemText>
                        <Link
                          href={item.link}
                          sx={{
                            color: "text.primary",
                            textDecoration: "none",
                            "&:hover": {
                              color: "#6366f1",
                              textDecoration: "underline",
                            },
                          }}
                        >
                          {item.text}
                        </Link>
                      </ListItemText>
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </Container>
  );
}

export default Resources;
