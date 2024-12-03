import { useState, useCallback } from "react";


export const useModal = (initValue?: boolean) => {
    const [isModalOpen, setIsModalOpen] = useState(initValue);
  
    const closeModal = useCallback(() => {
      setIsModalOpen(false);
    }, []);

    const openModal = useCallback(() => {
        setIsModalOpen(true);
      }, []);
    
    return {
        isModalOpen,
        closeModal,
        openModal
    }
};

