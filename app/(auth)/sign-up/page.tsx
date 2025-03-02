"use client";

import AuthForm from "@/components/AuthForm";
import { signUpSchema } from "@/lib/validations";

const Page = () => (
  <AuthForm
    type="SIGN_UP"
    schema={signUpSchema}
    defaultValues={{
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    }}
    onSubmit={async () => {
      return { success: true, error: "" };
    }}
  />
);

export default Page;
