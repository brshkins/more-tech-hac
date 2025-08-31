import { axiosAuth } from "@/shared/api/baseQueryInstance";
import { Profile } from "../types/types";

class ProfileService {
  public async getCurrentProfile(): Promise<Profile> {
    const { data } = await axiosAuth.get<Profile>("/client/auth/current_user");

    return data;
  }

  public async updateCurrentProfile({ form }: { form: FormData }) {
    return await axiosAuth.put(
      "/client/user",
      form as unknown as Record<string, unknown>,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  }
}

export const { getCurrentProfile, updateCurrentProfile } = new ProfileService();
