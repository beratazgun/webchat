import { create } from "zustand";

type UseUsers = {
  username: string;
  role: string;
  setData: (username: string, role: string) => void;
};

export const useUsers = create<UseUsers>((set) => ({
  username: "",
  role: "",
  setData: (username, role) => set({ username, role }),
}));
