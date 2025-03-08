import axios from "axios";

export const ProfileCreate = async (params: {
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
  addressLine1: string;
  apartment?: string;
  province: string;
  country: string;
  postalCode: string;
  profileImage?: string;
  accessToken: string;
}): Promise<{ success: boolean; error: string }> => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/profile/create",
      {
        firstName: params.firstName,
        lastName: params.lastName,
        email: params.email,
        contact: params.contact,
        addressLine1: params.addressLine1,
        apartment: params.apartment,
        province: params.province,
        country: params.country,
        postalCode: params.postalCode,
        profileImage: params.profileImage,
        accessToken: params.accessToken,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${params.accessToken}`,
        },
      }
    );

    return { success: true, error: "" };
  } catch (error) {
    console.error("UpdateProfile Error:", error);
    return {
      success: false,
      error: error?.response?.data?.message || "Something went wrong",
    };
  }
};

export const fetchProfile = async (
  accessToken: string,
  email: string
): Promise<{ success: boolean; data?: any; error?: string }> => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/profile/get/?email=${encodeURIComponent(email)}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return { success: true, data: response.data };
  } catch (error) {
    console.error("fetchProfile Error:", error);
    return {
      success: false,
      error: error?.response?.data?.message || "Something went wrong",
    };
  }
};
