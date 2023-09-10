import axios from "axios";

export const SignUp = (formData: any) => {
  return axios.post("/api/1.0/users", formData);
};
