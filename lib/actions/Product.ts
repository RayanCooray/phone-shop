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
    const response = await fetch(`http://localhost:5000/api/product/filter?${queryString}`, {
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
        error: result.message || "Failed to filter products",
      };
    }

    return { success: true, data: result };
  } catch (error) {
    console.error("FilterProducts Error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Something went wrong",
    };
  }
};
