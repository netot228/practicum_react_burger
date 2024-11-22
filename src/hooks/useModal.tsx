import { useState, useCallback } from "react";


export const useModal = (initValue?: boolean) => {
    const [isModalOpen, setIsModalOpen] = useState(initValue);
  
    const closeModal = useCallback(() => {
      setIsModalOpen(false);
    }, []);

    const openModal = useCallback(() => {
        setIsModalOpen(true);
      }, []);

    
    /*
        
        хотел попробовать использовать подход делать toggle состояния
        обратил внимание, что это будет работать только в том случае, если нет обертки 
        useCallback
        
            const toggleModalState = () => {
                setIsModalOpen(!isModalOpen);
            };


        буду признателен, если прокомментируете необходимость использования 
        useCallback в данном хуке

        и почему не работает конструкция с переключение состояния при использовании 
        useCallback:

            const toggleModalState = useCallback(() => {
                setIsModalOpen(!isModalOpen);
            }, []);

    */
  
    return {
        isModalOpen,
        closeModal,
        openModal
    }
};

