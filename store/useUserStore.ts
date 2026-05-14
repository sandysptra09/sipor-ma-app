import { create } from 'zustand';

interface UserData {
    id: string;
    name: string | null;
    email: string | null;
    role : string | null;
    image: string | null;
}

interface UserStore {
    user: UserData | null;
    setUser: (user: UserData | null) => void;
    clearUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
    user: null, 
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
}));

