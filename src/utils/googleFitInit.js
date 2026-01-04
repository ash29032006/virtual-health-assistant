import { gapi } from "gapi-script";
import GOOGLE_FIT_CONFIG from "../config/googleFit";

export const initializeGoogleFit = () => {
  return new Promise((resolve, reject) => {
    gapi.load("client:auth2", () => {
      gapi.client
        .init({
          clientId: GOOGLE_FIT_CONFIG.clientId,
          scope: GOOGLE_FIT_CONFIG.scope,
        })
        .then(() => {
          // Initialize the Fitness API
          return gapi.client.load("fitness", "v1");
        })
        .then(() => {
          resolve();
        })
        .catch((error) => {
          console.error("Error initializing Google Fit:", error);
          reject(error);
        });
    });
  });
};
