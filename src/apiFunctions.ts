import axios from "axios";

const BASE_URL = "https://sos-app.onrender.com";

// Function to make a call
export const sendSOS = async (
  contacts: string[],
  location: {
    latitude?: number | undefined;
    longitude?: number | undefined;
  },
  username = "Jane doe"
) => {
  try {
    const response = await axios.post(`${BASE_URL}/send-sos`, {
      contacts,
      location,
      username,
    });

    return response.data;
  } catch (error) {
    console.error("Error making call:", error);
    throw error;
  }
};

