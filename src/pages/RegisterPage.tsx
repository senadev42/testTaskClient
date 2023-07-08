import React from "react";
import RegisterForm from "../components/RegisterForm";

const LoginPage: React.FC = () => {
  return (
    <div className="flex flex-row">
      {/* teal rectangle */}
      <div className="bg-teal-400 w-1/6 h-screen"></div>

      <RegisterForm />
    </div>
  );
};

export default LoginPage;
