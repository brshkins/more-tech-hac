export interface Profile {
  id: string;
  firstname: string;
  lastname: string;
  birthday: string;
  imageUrl?: string;
  cvFile: null | File;
}
