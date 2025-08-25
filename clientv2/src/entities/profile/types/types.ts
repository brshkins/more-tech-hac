export interface Profile {
  id: string;
  firstname: string;
  surname: string;
  birthday: string;
  imageUrl?: string;
  cvFile: null | File;
}
