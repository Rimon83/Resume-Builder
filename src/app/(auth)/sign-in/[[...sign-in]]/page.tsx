import { SignIn } from "@clerk/nextjs";
import React from "react";

const SignInPage = () => {
  return (
    <section className="flex h-screen items-center justify-center p-4">
      <SignIn />
    </section>
  );
};

export default SignInPage;
