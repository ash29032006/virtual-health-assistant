import { gapi } from "gapi-script";

// Let's create this configuration file
export const GOOGLE_FIT_CONFIG = {
  clientId:
    "234152782628-1p2l0hqict8et9fdssr358urrlpeknca.apps.googleusercontent.com",
  scope: [
    "https://www.googleapis.com/auth/fitness.activity.read",
    "https://www.googleapis.com/auth/fitness.heart_rate.read",
    "https://www.googleapis.com/auth/fitness.sleep.read",
  ].join(" "),
  discoveryDocs: [
    "https://www.googleapis.com/discovery/v1/apis/fitness/v1/rest",
  ],
};

let gapiInitialized = false;

export const initializeGoogleFit = async () => {
  if (gapiInitialized) {
    return true;
  }

  try {
    // Wait for GAPI to load
    await new Promise((resolve) => {
      if (gapi.client) {
        resolve();
      } else {
        gapi.load("client", resolve);
      }
    });

    // Initialize the client
    await gapi.client.init({
      clientId: GOOGLE_FIT_CONFIG.clientId,
      scope: GOOGLE_FIT_CONFIG.scope,
      discoveryDocs: GOOGLE_FIT_CONFIG.discoveryDocs,
    });

    // Load fitness API
    await gapi.client.load("fitness", "v1");

    gapiInitialized = true;
    return true;
  } catch (error) {
    console.error("Error initializing Google Fit:", error);
    throw error;
  }
};

export const fetchGoogleFitData = async (dataType, timeRange = 7) => {
  if (!gapiInitialized) {
    await initializeGoogleFit();
  }

  const endTime = new Date();
  const startTime = new Date();
  startTime.setDate(startTime.getDate() - timeRange);

  try {
    const response = await gapi.client.fitness.users.dataset.aggregate({
      userId: "me",
      requestBody: {
        aggregateBy: [{ dataTypeName: dataType }],
        startTimeMillis: startTime.getTime(),
        endTimeMillis: endTime.getTime(),
        bucketByTime: { durationMillis: 86400000 },
      },
    });

    return response.result.bucket.map((bucket) => ({
      date: new Date(parseInt(bucket.startTimeMillis))
        .toISOString()
        .split("T")[0],
      value: bucket.dataset[0]?.point[0]?.value[0]?.intVal || 0,
    }));
  } catch (error) {
    console.error(`Error fetching ${dataType}:`, error);
    return [];
  }
};
