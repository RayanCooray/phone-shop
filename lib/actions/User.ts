import axios from "axios";

export const getAllUsers = async (
    accessToken: string
  ): Promise<{ success: boolean; data?: any; error?: string }> => {
    try {
      const response = await axios.get("http://localhost:5000/api/auth/getAllUsers", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      return { success: true, data: response.data };
    } catch (error) {
      console.error("GetAllProducts Error:", error);
      return {
        success: false,
        error: error?.response?.data?.message || "Something went wrong",
      };
    }
};