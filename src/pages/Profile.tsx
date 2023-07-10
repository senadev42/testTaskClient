import React, { useEffect, useState } from "react";

import { PiEyeClosedDuotone, PiEyeDuotone } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";

//visual components
import { toast } from "react-toastify";
import Loader from "../components/Loader";

//redux
import { useDispatch, useSelector } from "react-redux";
import { useUpdateUserMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { RootState } from "../store";

//Profile
export const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const { userInfo } = useSelector((state: RootState) => state.auth);

  const [formState, setFormState] = useState({
    username: "",
    email: "",
    errors: {
      username: "",
      email: "",
    },
  });

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

    toast.info("Updating profile");
    if (validateForm()) {
      //create body
      let name = formState.username;

      try {
        //send update request
        const res = await updateUser({ name }).unwrap();
        //set userinfo to local storage
        dispatch(setCredentials({ ...res }));

        // tell user
        toast.success("Updated successfully");
      } catch (err: any) {
        toast.error(err?.data?.message || err.error);
      }
    } else {
      toast.error("Something went wrong");
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
        className={`shadow appearance-none border rounded w-[14rem] py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline ${
          formState.errors.username ? "border-red-500" : ""
        }`}
        id="username"
        type="text"
        placeholder={userInfo.name}
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
      <input
        className={`shadow appearance-none border rounded w-[14rem] py-2 px-3 placeholder-slate-300`}
        id="email"
        type="email"
        placeholder={userInfo.email}
        name="email"
        value={formState.email}
        onChange={handleInputChange}
        disabled
      />
    </div>
  );

  return (
    <div className="flex flex-row  h-full">
      <div className="max-w-xs w-full bg-white p-8">
        <div className="text-lg p-2 mb-4">Update your username</div>
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
          {/* Sign in Button */}
          <div className="flex items-center justify-between">
            <button
              className="bg-black hover:bg-teal-500 hover:text-black text-teal-400 rounded-xs font-bold py-2 px-6 focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {isLoading ? <Loader /> : "Update your Profile"}
            </button>
          </div>{" "}
        </form>
      </div>
    </div>
  );
};
