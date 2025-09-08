import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User, AuthState } from "@/types/AuthTypes";

const initialState: AuthState = {
  user: null,
  token: null,
  profile: null,
  login: () => {},
  logout: () => {},
  setToken: () => {},
  setProfile: () => {},
};

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      ...initialState,
      login: (user: User, token: string) => set({ user, token }),
      logout: () =>
        set({
          user: null,
          token: null,
          profile: null,
        }),
      setToken: (token: string) => set({ token }),
      setProfile: (profile: any) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: { ...currentUser, ...profile },
            profile: profile.passport_image,
          });
        } else {
          set({
            user: profile,
            profile: profile.passport_image,
          });
          console.error("No user is logged in. Cannot update profile.");
        }
      },
    }),
    {
      name: "fairtrade",
    }
  )
);

export default useAuthStore;
