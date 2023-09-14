import React, { useEffect, useState } from "react";
import { SignUp } from "../api/SignUpApiCall";
import { UserSignUpComponent } from "../component/UserSignUpComponent";
import axios, { AxiosError } from "axios";

interface IUserSignUp {
  username: string;
  displayName: string;
  email: string;
  password: string;
  pendingApiCall: boolean;
  showPassword: boolean;
  successMessage: string;
}

export const UserSignUpContainer = () => {
  const [formData, setFormData] = useState<IUserSignUp>({
    username: "",
    displayName: "",
    email: "",
    password: "",
    pendingApiCall: false,
    showPassword: false,
    successMessage: "",
  });
  const [errors, setErrors] = useState<IUserSignUp>({
    username: "",
    displayName: "",
    email: "",
    password: "",
    pendingApiCall: false,
    showPassword: false,
    successMessage: "",
  });
  const [showSuccessMessage, setSuccessMessage] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormData((prevData) => ({ ...prevData, pendingApiCall: true }));
    try {
      const response = await axios.post("/api/1.0/users", formData);
      console.log(response);

      setTimeout(() => {
        setSuccessMessage(false);
      }, 3000);
      setFormData((prevData) => ({
        ...prevData,
        successMessage: response.data.message,
      }));
      console.log(formData.successMessage);
    } catch (error) {
      const axiosError = error as AxiosError<any>;
      if (
        axiosError.response?.data &&
        axiosError.response.data.status === 400
      ) {
        setErrors(axiosError.response?.data.validationErrors);
        console.log(errors);
      }
    }
    setFormData((prevData) => ({ ...prevData, pendingApiCall: false }));
  };

  const formFields = [
    {
      label: "Username",
      id: "username",
      name: "username",
      placeholder: "Username",
      validError: errors.username,
    },
    {
      label: "Display Name",
      id: "dname",
      name: "displayName",
      placeholder: "Display Name",
      validError: errors.displayName,
    },
    {
      label: "E-mail",
      id: "email",
      name: "email",
      placeholder: "example@mail.com",
      validError: errors.email,
    },
    {
      label: "Password",
      id: "password",
      name: "password",
      placeholder: "••••••••",
      validError: errors.password,
    },
  ];

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
          {formFields.map((field) => (
            <div key={field.id}>
              {field.id === "password" ? (
                <UserSignUpComponent
                  type="password"
                  key={field.id}
                  label={field.label}
                  handleChange={handleChange}
                  formData={formData}
                  id={field.id}
                  name={field.name}
                  placeholder={field.placeholder}
                  validError={field.validError}
                />
              ) : (
                <UserSignUpComponent
                  type="text"
                  key={field.id}
                  label={field.label}
                  handleChange={handleChange}
                  formData={formData}
                  id={field.id}
                  name={field.name}
                  placeholder={field.placeholder}
                  validError={field.validError}
                />
              )}
            </div>
          ))}
          <button
            type="submit"
            className={`bg-purple-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ${
              formData.pendingApiCall ? "disabled-button" : ""
            }`}
            disabled={formData.pendingApiCall}
          >
            Sign UP!
          </button>
          {showSuccessMessage && (
            <div
              className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
              role="alert"
            >
              <span className="font-medium">{formData.successMessage}</span>{" "}
            </div>
          )}
        </form>
      </div>
    </section>
  );
};
