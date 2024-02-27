import { create } from 'zustand';

export interface StoreState {
  message: string;
  setMessage: (newMessage: string) => void;
  isAuthenticated: boolean;
  login: (username: string, password: string) => void;
  logout: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const useStore = create<StoreState>(set => ({
  message: 'Hello',
  setMessage: (newMessage: string) => set({ message: newMessage }),
  isAuthenticated: false,
  login: (username, password) => {
    // Add logic to authenticate
    if (username === 'admin' && password === 'password') {
      set({ isAuthenticated: true });
    }
  },
  logout: () => set({ isAuthenticated: false }),
  isDarkMode: false,
  toggleDarkMode: () => set(state => ({ isDarkMode: !state.isDarkMode }))
}));