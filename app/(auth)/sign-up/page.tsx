'use client'

import AuthForm from "@/components/forms/AuthForm";
import { signUpSchema } from "@/lib/validations/validations";
import React from "react";

const signUpPage = () => {
  return (
    <AuthForm
      type="SIGN_UP"
      schema={signUpSchema}
      defaultValues={{
        email: "",
        password: "",
        fullName: "",
        universityId: 0,
        universityCard: "",
      }}
      onSubmit={() => { }}
    />
  );
};

export default signUpPage;
