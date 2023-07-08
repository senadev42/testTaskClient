import React from "react";
import RegisterForm from "../components/RegisterForm";

const LoginPage: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row w-full">
      {/* teal rectangle */}
      <div className="bg-teal-400 hidden sm:flex sm:w-1/6 h-screen "></div>

      <RegisterForm />
    </div>
  );
};

export default LoginPage;
