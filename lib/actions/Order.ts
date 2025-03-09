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
      "http://localhost:5000/api/orders/create",
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



export const getOrdersByUserId = async (
  userId: string,
): Promise<{ success: boolean; error: string; data?: any }> => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/orders/getAllByUser/${userId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      return { success: true, error: "", data: response.data.data };
    } else {
      return { success: false, error: "Unexpected server response" };
    }
  } catch (error: any) {
    console.error("GetOrdersByUserId Error:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Something went wrong",
    };
  }
};


export const getOrderById = async (
  orderId: string,
): Promise<{ success: boolean; error: string; data?: any }> => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/orders/getById/${orderId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      return { success: true, error: "", data: response.data.data };
    } else {
      return { success: false, error: "Unexpected server response" };
    }
  } catch (error: any) {
    console.error("GetOrderById Error:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Something went wrong",
    };
  }
};

export const updateOrderStatus = async (
  orderId: string,
  status: string,
  accessToken: string
): Promise<{ success: boolean; error: string }> => {
  try {
    await axios.put(
      `http://localhost:5000/api/orders/updateStatus/${orderId}`,
      { status },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return { success: true, error: "" };
  } catch (error: any) {
    console.error("UpdateOrderStatus Error:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Something went wrong",
    };
  }
};


export const deleteOrder = async (
  orderId: string,
  accessToken: string
): Promise<{ success: boolean; error: string }> => {
  try {
    await axios.delete(
      `http://localhost:5000/api/orders/delete/${orderId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return { success: true, error: "" };
  } catch (error: any) {
    console.error("DeleteOrder Error:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Something went wrong",
    };
  }
};


