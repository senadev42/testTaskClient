import React, { useEffect, useState } from "react";

import { PiEyeClosedDuotone, PiEyeDuotone } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";

//visual components
import { toast } from "react-toastify";
import Loader from "../components/Loader";

//redux
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { RootState } from "../store";

const RegisterForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state: RootState) => state.auth);

  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    errors: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    validateForm();
  }, [formState]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Add code to submit the form
    if (validateForm()) {
      //create body
      let name = formState.username;
      let email = formState.email;
      let password = formState.password;

      try {
        //send register request
        const res = await register({ name, email, password }).unwrap();
        //set token to local storage
        dispatch(setCredentials({ ...res }));
        // go to home page
        navigate("/");
        // tell user
        toast.success("Registered successfully");
      } catch (err: any) {
        toast.error(err?.data?.message || err.error);
      }

      // Add code to submit the form
      console.log("is valid");
      alert("Good to go");
    } else {
      alert("validate didn't pass");
    }
  };

  const validateForm = () => {
    const errors = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    // Check username
    if (!formState.username) {
      errors.username = "Username is required";
    }

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

    // Check confirm password
    if (!formState.confirmPassword) {
      errors.confirmPassword = "Confirm Password is required";
    } else if (formState.password !== formState.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setFormState((prevState) => ({
      ...prevState,
      errors,
    }));

    // Return true if there are no errors
    return Object.values(errors).every((error) => !error);
  };

  const UserNameInput = (
    <div className="mb-4">
      <input
        className={`shadow appearance-none border rounded  w-[14rem] py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
          formState.errors.username ? "border-red-500" : ""
        }`}
        id="username"
        type="text"
        placeholder="Username"
        name="username"
        value={formState.username}
        onChange={handleInputChange}
      />
      {formState.errors.username && (
        <p className="text-red-500 text-xs italic">
          {formState.errors.username}
        </p>
      )}
    </div>
  );

  const EmailInput = (
    <div className="mb-4">
      {/* <label className="block text-slate-600 mb-2" htmlFor="email">
          Email
        </label> */}
      <input
        className={`shadow appearance-none border rounded w-[14rem] py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
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
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    setShowConfirmPassword(!showConfirmPassword);
  };
  const PasswordInput = (
    <div className="mb-6 relative">
      {/* <label className="block text-slate-600 mb-2" htmlFor="password">
          Password
        </label> */}
      <div className=" flex flex-row justify-start items-center">
        <input
          className="shadow appearance-none border rounded  w-[14rem] py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={formState.password}
          onChange={handleInputChange}
        />
        <button
          className="py-1 px-1 ml-2"
          onClick={togglePasswordVisibility}
          type="button"
        >
          {!showPassword ? (
            <PiEyeClosedDuotone size={20} />
          ) : (
            <PiEyeDuotone size={20} />
          )}
        </button>
      </div>
      {formState.errors.password && (
        <p className="text-red-500 text-xs italic">
          {formState.errors.password}
        </p>
      )}

      {/* Confirm Password */}
      <div className=" flex flex-row justify-start items-center mt-2">
        <input
          className="shadow appearance-none border rounded  w-[14rem] py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="confirm-password"
          name="confirmPassword"
          type={showPassword ? "text" : "password"}
          placeholder="Confirm Password"
          value={formState.confirmPassword}
          onChange={handleInputChange}
          style={{ display: " none !important" }}
        />
        <button
          className="py-1 px-1 ml-2 appearance-none"
          onClick={togglePasswordVisibility}
          type="button"
        >
          {!showPassword ? (
            <PiEyeClosedDuotone size={20} />
          ) : (
            <PiEyeDuotone size={20} />
          )}
        </button>
      </div>
      {formState.errors.confirmPassword && (
        <p className="text-red-500 text-xs italic">
          {formState.errors.confirmPassword}
        </p>
      )}
    </div>
  );

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-xs w-full bg-white p-8">
        <form onSubmit={handleSubmit}>
          {
            //Username
            UserNameInput
          }
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
              {isLoading ? <Loader /> : "Register"}
            </button>
          </div>{" "}
          <div>
            <p className="text-start text-xs text-slate-600 my-2">
              Already have an account?{" "}
              <Link to="/login" className="text-teal-500">
                {" "}
                Login{" "}
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
