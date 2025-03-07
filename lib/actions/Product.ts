import type { phoneSchema } from "@/lib/validations";

export const addProduct = async ({
  productData,
  accessToken,
}: {
  productData: typeof phoneSchema;
  accessToken: string;
}): Promise<{ success: boolean; error: string }> => {
  try {
    const response = await fetch("http://localhost:5000/api/product/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(productData),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.message || "Failed to add product",
      };
    }

    return { success: true, error: "" };
  } catch (error) {
    console.error("AddProduct Error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Something went wrong",
    };
  }
};


export const GetAllProducts = async (accessToken: string): Promise<{ success: boolean; data?: any; error?: string }> => {
  try {
    const response = await fetch("http://localhost:5000/api/product/getAll", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.message || "Failed to fetch products",
      };
    }

    return { success: true, data: result };
  } catch (error) {
    console.error("GetAllProducts Error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Something went wrong",
    };
  }
}