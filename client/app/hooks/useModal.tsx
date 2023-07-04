import { create } from "zustand";

type UseModal = {
  openModal: (ıdName: string) => void;
  closeModal: (ıdName: string) => void;
};

export const useModal = create<UseModal>((set) => ({
  openModal: (ıdName: string) => {
    const modal = document.getElementById(ıdName) as HTMLDialogElement;

    modal.hasAttribute("open") ? modal.close() : modal.showModal();
  },
  closeModal: (ıdName: string) => {
    const modal = document.getElementById(ıdName) as HTMLDialogElement;

    modal.close();
  },
}));
