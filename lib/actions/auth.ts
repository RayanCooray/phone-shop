"use server";

import { signIn } from "@/auth";


export const signInWithCredentials = async (params: { email: string; password: string }) => {
    try {
        const response = await signIn("credentials", {
            email: params.email,
            password: params.password,
            redirect: false,
        });

        if (response?.error) {
            return { success: false, error: response.error };
        }

        return { success: true, error: "" };
    } catch (error) {
        console.log("SignIn Error:", error);
        return { success: false, error: "Something went wrong while logging in" };
    }
};

export const signUp = async (params: { fullName: string; email: string; password: string }): Promise<{ success: boolean; error: string }> => {
  try {
    const response = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });

    const result = await response.json();

    if (!response.ok) {
      return { success: false, error: result.message || "Signup failed" };
    }

    // After successful sign-up, try to sign in with the credentials
    const signInResult = await signInWithCredentials({ email: params.email, password: params.password });

    return { ...signInResult, error: signInResult.error || "" };
  } catch (error) {
    console.error("SignUp Error:", error);
    return { success: false, error: error instanceof Error ? error.message : "Something went wrong" };
  }
};
