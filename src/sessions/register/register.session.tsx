import axios from "axios";
import { IRegisterPayload, } from "./index";


export const register = async (payload: IRegisterPayload) => {
  const response = await axios.post(`/api/v1/auth/register`, payload);
  console.log("Register response", response.data);
  return response.data;
};
