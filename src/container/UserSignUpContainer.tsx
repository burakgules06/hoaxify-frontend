import React, { useEffect, useState } from "react";
import { SignUp } from "../api/SignUpApiCall";
import { UserSignUpComponent } from "../component/UserSignUpComponent";
import axios, { AxiosError } from "axios";

interface IUserSignUp {
  errors: any;
  username: string;
  displayName: string;
  email: string;
  password: string;
  pendingApiCall: boolean;
  showPassword: boolean;
}

export const UserSignUpContainer = () => {
  const [formData, setFormData] = useState<IUserSignUp>({
    errors: {},
    username: "",
    displayName: "",
    email: "",
    password: "",
    pendingApiCall: false,
    showPassword: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormData((prevData) => ({ ...prevData, pendingApiCall: true }));
    try {
      await axios.post("/api/1.0/users", formData);
    } catch (error) {
      const axiosError = error as AxiosError;
      console.log(axiosError);

      formData.errors = axiosError.response?.data as {
        validationErrors: {
          username: string;
          displayName: string;
          email: string;
          password: string;
        };
      };

      console.log(
        "Error Data from Backend:",
        formData.errors.validationErrors.username
      );
    }
    setFormData((prevData) => ({ ...prevData, pendingApiCall: false }));
  };

  const formFields = [
    {
      label: "Username",
      id: "username",
      name: "username",
      placeholder: "Username",
      validError: formData.errors.username,
    },
    {
      label: "Display Name",
      id: "dname",
      name: "displayName",
      placeholder: "Display Name",
      validError: formData.errors.displayName,
    },
    {
      label: "E-mail",
      id: "email",
      name: "email",
      placeholder: "example@mail.com",
      validError: formData.errors.email,
    },
    {
      label: "Password",
      id: "password",
      name: "password",
      placeholder: "••••••••",
      validError: formData.errors.password,
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
        </form>
      </div>
    </section>
  );
};
