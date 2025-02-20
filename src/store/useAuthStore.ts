import Cookies from "js-cookie";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  user: any;
  login: (user: any) => void;
  logout: () => void;
}
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: (user) => {
        // const expires = new Date(new Date().getTime() + 10 * 1000); // 10 seconds
        Cookies.set("user", JSON.stringify(user), { expires: 1 });
        set({ user });

        // Set a timeout to automatically logout after 10 seconds
        // setTimeout(() => {
        //   set({ user: null });
        //   Cookies.remove("user");
        //   window.location.href = "/login"; // Redirect to login page
        // }, 10 * 1000); // 10 seconds
      },
      logout: () => {
        Cookies.remove("user");
        set({ user: null });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
