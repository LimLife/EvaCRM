import { create } from "zustand";

interface AppState
{
    selectedItem: string | null;
    setSelectedItem: (id: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
    selectedItem: null,
    setSelectedItem: (id) => set({ selectedItem: id }),
}));