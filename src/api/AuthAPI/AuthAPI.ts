import { $authHost, $host } from "..";
import { IUser } from "@/models/IUser";
import { LoginUserDto } from "./dto/login-user.dto";
import { setToken } from "@/helpers/localStorage";
import { jwtDecode } from "jwt-decode";
import { ChangePasswordDto } from "./dto/change-password.dto";

export default class AuthAPI {
  static async login(loginUserDto: LoginUserDto): Promise<IUser> {
    const { data } = await $host.post("auth/login", loginUserDto);
    setToken(data.token);
    return jwtDecode(data.token);
  }

  static async checkAuth(): Promise<IUser> {
    const { data } = await $authHost.get("auth/check");
    setToken(data.token);
    return jwtDecode(data.token);
  }

  static async changePassword(
    changePasswordDto: ChangePasswordDto
  ): Promise<boolean> {
    const { data } = await $authHost.put(
      "auth/change-password",
      changePasswordDto
    );
    return data;
  }
}
