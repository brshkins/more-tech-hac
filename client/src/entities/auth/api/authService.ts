import { axiosNoAuth } from "@/shared/api/baseQueryInstance";
import { AuthResponse, LoginDto, RegisterDto } from "../types/types";

class AuthService {
  public async adminLogin(loginDto: LoginDto): Promise<AuthResponse> {
    const { data } = await axiosNoAuth.post<AuthResponse>("/admin/auth/login", {
      ...loginDto,
    });

    return data;
  }

  public async userLogin(loginDto: LoginDto): Promise<AuthResponse> {
    const { data } = await axiosNoAuth.post<AuthResponse>(
      "/client/auth/login",
      { ...loginDto }
    );

    return data;
  }

  public async userRegister(registerDto: RegisterDto): Promise<AuthResponse> {
    const { data } = await axiosNoAuth.post<AuthResponse>(
      "/client/auth/register",
      { ...registerDto }
    );

    return data;
  }

  public async refresh(): Promise<string> {
    const { data } = await axiosNoAuth.post<string>("/client/auth/refresh");

    return data;
  }
}

export const { adminLogin, userLogin, userRegister, refresh } =
  new AuthService();
