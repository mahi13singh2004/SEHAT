import axios from "axios";
import { create } from "zustand";

axios.defaults.withCredentials = true;

export const useAuthStore = create((set, get) => ({
  loading: false,
  err: null,
  user: null,
  backendConnected: false,
  connectionAttempts: 0,

  checkBackendConnection: async () => {
    const state = get();
    try {
      set({ connectionAttempts: state.connectionAttempts + 1 });
      const res = await axios.get("https://sehat-k5dt.onrender.com/api/auth/checkAuth", {
        timeout: 10000
      });
      set({ backendConnected: true, user: res.data.user, err: null });
      return true;
    } catch (error) {
      set({ backendConnected: false, user: null });

      if (error.code === 'ECONNABORTED' || error.code === 'ERR_NETWORK' || !error.response) {
        return false;
      }

      if (error.response?.status === 401) {
        set({ backendConnected: true, err: "Not authenticated" });
        return true;
      }

      return false;
    }
  },

  waitForBackend: async () => {
    const maxAttempts = 30;

    while (get().connectionAttempts < maxAttempts) {
      const connected = await get().checkBackendConnection();
      if (connected) {
        return true;
      }

      await new Promise(resolve => setTimeout(resolve, 10000));
    }

    set({ err: "Unable to connect to server. Please try again later." });
    return false;
  },

  signup: async (data) => {
    try {
      set({ loading: true });
      const res = await axios.post("https://sehat-k5dt.onrender.com/api/auth/signup", data);
      set({ user: res.data.user, backendConnected: true });
    } catch (error) {
      set({ err: error.response?.data?.message || "Signup failed" });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  login: async (data) => {
    try {
      set({ loading: true });
      const res = await axios.post("https://sehat-k5dt.onrender.com/api/auth/login", data);
      set({ user: res.data.user, backendConnected: true });
    } catch (error) {
      set({ err: error.response?.data?.message || "Login failed" });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  checkAuth: async () => {
    try {
      set({ loading: true, err: null });
      const res = await axios.get("https://sehat-k5dt.onrender.com/api/auth/checkAuth");
      set({ user: res.data.user, backendConnected: true });
    } catch (error) {
      set({
        user: null,
        err: error.response?.data?.message || "Unable to authenticate",
      });
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      set({ loading: true, err: null });
      await axios.post("https://sehat-k5dt.onrender.com/api/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
      // Even if backend logout fails, clear the user state locally
    } finally {
      // Always clear user state and loading regardless of backend response
      set({ user: null, loading: false });
    }
  },
}));