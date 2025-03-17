import axios from "axios";
import type { phoneSchema } from "@/lib/validations";

export const addProduct = async ({
  productData,
  accessToken,
}: {
  productData: typeof phoneSchema;
  accessToken: string;
}): Promise<{ success: boolean; error: string }> => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/product/create",
      productData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    

    return { success: true, error: "" };
  } catch (error) {
    console.error("AddProduct Error:", error);
    return {
      success: false,
      error: error?.response?.data?.message || "Something went wrong",
    };
  }
};

export const GetAllProducts = async (
  accessToken: string
): Promise<{ success: boolean; data?: any; error?: string }> => {
  try {
    const response = await axios.get("http://localhost:5000/api/product/getAll", {
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

export const deleteProduct = async (id: string, accessToken: string) => {
  try {
    const response = await axios.delete(
      `http://localhost:5000/api/product/delete/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  } catch (error) {
    console.error("DeleteProduct Error:", error);
    return {
      success: false,
      error: error?.response?.data?.message || "Something went wrong",
    };
  }
};


export const FilterProducts = async (
  accessToken: string,
  filters: {
    brand?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    color?: string;
    size?: string;
    rating?: number;
  }
): Promise<{ success: boolean; data?: any; error?: string }> => {
  try {
    const queryString = new URLSearchParams(
      Object.fromEntries(
        Object.entries(filters)
          .filter(([, value]) => value !== undefined)
          .map(([key, value]) => [key, String(value)])
      )
    ).toString();

    const response = await axios.get(
      `http://localhost:5000/api/product/filter?${queryString}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return { success: true, data: response.data };
  } catch (error) {
    console.error("FilterProducts Error:", error);
    return {
      success: false,
      error: error?.response?.data?.message || "Something went wrong",
    };
  }
};

export const getProductById = async (
  id: string,
  accessToken: string
): Promise<{ success: boolean; data?: any; error?: string }> => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/product/get/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return { success: true, data: response.data };
  } catch (error) {
    console.error("GetProductById Error:", error);
    return {
      success: false,
      error: error?.response?.data?.message || "Something went wrong",
    };
  }
};
