import { mockProfile } from "../lib/mockProfile";
import { Profile } from "../types/types";

class ProfileService {
  public async getCurrentProfile(): Promise<Profile> {
    return new Promise((resolve) => resolve(mockProfile));
  }
}

export const { getCurrentProfile } = new ProfileService();
