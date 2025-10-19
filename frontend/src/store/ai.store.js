import axios from "axios";
import { create } from "zustand";

axios.defaults.withCredentials = true;

export const useAiStore = create((set) => ({
  loading: false,
  err: null,
  response:null,
  therapistResponse:null,

  fetchSymptom:async(prompt)=>{
    try {
        set({loading:true})
        const res=await axios.post("http://localhost:5000/api/ai/symptom",{prompt})
        set({response:res.data.response})
    } 
    catch (error) {
        set({err:error.response?.data?.message || "Login failed"})
        throw error
    }
    finally{
        set({loading:false})
    }
  },

  clearResponse: () => set({ response: null, err: null }),
}));
