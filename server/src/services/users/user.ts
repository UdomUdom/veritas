import { UserLoginType, UserRegisterType } from "@/models/user";

export const userRegister = (data: UserRegisterType) => {
  console.log(data);
  return data;
};

export const userLogin = (data: UserLoginType) => {
  console.log(data);
  return data;
};
