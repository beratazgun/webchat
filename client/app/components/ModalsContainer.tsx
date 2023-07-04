"use client";
import dynamic from "next/dynamic";

const SigninModal = dynamic(() => import("./Modal/signinModal/SigninModal"));
const SignupModal = dynamic(() => import("./Modal/signupModal/SignupModal"));

const ModalsContainer = () => {
  return (
    <>
      <SigninModal />
      <SignupModal />
    </>
  );
};

export default ModalsContainer;
