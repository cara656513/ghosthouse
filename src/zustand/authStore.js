import { create } from 'zustand';

// Zustand 전역 상태 관리
export const useToastStore = create((set) => ({
  message: { text: '', type: '' },
  setMessage: (newMessage) => set({ message: newMessage })
}));
