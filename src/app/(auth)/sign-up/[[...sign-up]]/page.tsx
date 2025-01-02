import { SignUp } from "@clerk/nextjs";
import React from "react";

const SignUpPage = () => {
  return (
    <section className="flex h-screen items-center justify-center p-4">
      <SignUp />
    </section>
  );
};

export default SignUpPage;
