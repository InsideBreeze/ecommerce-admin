import { create } from 'zustand';

interface StoreModalStore {
    open: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useStoreModal = create<StoreModalStore>((set) => ({
    open: false,
    onOpen: () => set({ open: true }),
    onClose: () => set({ open: false })
}))
