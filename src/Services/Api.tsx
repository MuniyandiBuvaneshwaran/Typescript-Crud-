import axios, { AxiosInstance } from "axios";

export const API_URL ="https://65adf7111dfbae409a73a318.mockapi.io/script/"
;

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
});

export interface UserData { 
  name: string;
  email: string;
  phone: string;
  password?: string;
  cpass?: string;
  language: string;
  gender: string;
  dob: string;
}

export const createUser = async (userdata: UserData) => {
  try {
    const response = await axiosInstance.post(API_URL, userdata);
    console.log(response);
    return response;
   
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (id: string, userdata: UserData) => {
  try {
    const response = await axiosInstance.put(`${API_URL}/${id}`, userdata);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getUser = async (id: string) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`${API_URL}/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const response = await axiosInstance.get(API_URL);
    return response;
  } catch (e) {
    throw e;
  }
};

export default UserData; 
