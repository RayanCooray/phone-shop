import axios from "axios";
import { orderSchema } from "../validations";

export const createOrder = async ({
  orderData,
  accessToken,
}: {
  orderData: typeof orderSchema._type;
  accessToken: string;
}): Promise<{ success: boolean; error: string }> => {
  try {
    await axios.post(
      "http://localhost:5000/api/order/create",
      orderData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return { success: true, error: "" };
  } catch (error: any) {
    console.error("CreateOrder Error:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Something went wrong",
    };
  }
};
