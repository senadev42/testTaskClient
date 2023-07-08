import React, { useEffect, useState } from "react";

import { PiEyeClosedDuotone, PiEyeDuotone } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";

//visual components
import { toast } from "react-toastify";
import Loader from "../components/Loader";

//redux
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { RootState } from "../store";

const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const [formState, setFormState] = useState({
    email: "",
    password: "",
    errors: {
      email: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    validateForm();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Add code to submit the form
    if (true) {
      // Add code to submit the form
      console.log("Form valid");
      let email = formState.email;
      let password = formState.password;

      try {
        // get login deets
        const res = await login({ email, password }).unwrap();
        // save them
        dispatch(setCredentials({ ...res }));
        // go to home page
        navigate("/");
        // tell user
        toast.success("Login Successful");
      } catch (err: any) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const validateForm = () => {
    const errors = {
      username: "",
      email: "",
      password: "",
    };

    // Check email
    if (!formState.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      errors.email = "Email is invalid";
    }

    // Check password
    if (!formState.password) {
      errors.password = "Password is required";
    } else if (formState.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }

    setFormState((prevState) => ({
      ...prevState,
      errors,
    }));

    // Return true if there are no errors
    return Object.values(errors).every((error) => !error);
  };

  const EmailInput = (
    <div className="mb-4">
      {/* <label className="block text-slate-600 mb-2" htmlFor="email">
          Email
        </label> */}
      <input
        className={`shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
          formState.errors.email ? "border-red-500" : ""
        }`}
        id="email"
        type="email"
        placeholder="Email"
        name="email"
        value={formState.email}
        onChange={handleInputChange}
      />
      {formState.errors.email && (
        <p className="text-red-500 text-xs italic">{formState.errors.email}</p>
      )}
    </div>
  );

  const PasswordInput = (
    <div className="mb-6 relative">
      {/* <label className="block text-slate-600 mb-2" htmlFor="password">
          Password
        </label> */}
      <div className=" flex flex-row justify-start items-center">
        <input
          className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={formState.password}
          onChange={handleInputChange}
        />
        <button
          className="py-1 px-1 ml-2 appearance-none"
          onClick={() => setShowPassword(!showPassword)}
          type="button"
        >
          {!showPassword ? (
            <PiEyeClosedDuotone size={20} />
          ) : (
            <PiEyeDuotone size={20} />
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-xs w-full bg-white shadow-lg shadow-teal-100 rounded-md p-8">
        <form onSubmit={handleSubmit}>
          {
            // Email
            EmailInput
          }
          <hr className="mb-4"></hr>
          {
            //passwords
            PasswordInput
          }
          {/* Sign in Button */}
          <div className="flex items-center justify-between">
            <button
              className="bg-teal-500 hover:bg-teal-600 text-white rounded-sm font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {isLoading ? <Loader /> : "Login"}
            </button>
          </div>{" "}
          <div>
            <p className="text-start text-xs text-slate-600 my-2">
              Don't have an account?{" "}
              <Link to="/register" className="text-teal-500">
                {" "}
                Register{" "}
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
