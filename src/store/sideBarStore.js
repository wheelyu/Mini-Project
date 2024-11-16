import {create} from 'zustand';

const useDarkStore = create((set) => ({
    isOpen: false,
    toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
  }));

  export default useDarkStore;