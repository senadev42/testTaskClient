import React from "react";
import LoginForm from "../components/LoginForm";
import Loader from "../components/Loader";

import { useLoginMutation } from "../slices/usersApiSlice";

const LoginPage: React.FC = () => {
  const [login, { isLoading }] = useLoginMutation();

  console.log(isLoading);
  if (isLoading == true) return <Loader />;
  else
    return (
      <div>
        <LoginForm />
      </div>
    );
};

export default LoginPage;
