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
    const response = await fetch("http://localhost:5000/api/profile/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${params.accessToken}`,
      },
      body: JSON.stringify({
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
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.message || "Failed to update profile",
      };
    }

    return { success: true, error: "" };
  } catch (error) {
    console.error("UpdateProfile Error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Something went wrong",
    };
  }
};
