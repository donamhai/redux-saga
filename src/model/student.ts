export interface Student {
  id?: string;
  name: string;
  age: number;
  mark: number;
  gender: "male" | "female";

  createdAt?: number;
  updateedAt?: number;
}
