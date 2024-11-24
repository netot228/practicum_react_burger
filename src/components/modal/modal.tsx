import { useEffect } from 'react';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import { createPortal } from 'react-dom';
import style from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';

import { ModalProps } from '../../utils/types';


const modalsRoot = document.getElementById('modals') as HTMLElement;


function Modal(props: ModalProps){

    console.log('is modal rendering');

    const closeModal = props.onClose;

    const keyBoardHandler = (e:KeyboardEvent) => {

        if(e.key==='Escape'){
            closeModal();
        }

    }

    useEffect(
        ()=>{
            document.addEventListener('keydown', keyBoardHandler)
            return  ()=>{
                document.removeEventListener('keydown', keyBoardHandler)
            }
        }, []
    )

    return(

        createPortal(
            <div className={style.modal} >
                <ModalOverlay className={style.modal_overlay} onClose={closeModal} />
                <div className={style.wrapper}>
                    <h4 className={`text_type_main-large ${style.title}`}>
                        <span>
                            {props.title}
                        </span>
                        <button onClick={closeModal}>
                            <CloseIcon className={style.close} type="primary" />
                        </button>
                    </h4>

                    <div className={style.content}>
                        {props.children}
                    </div>
                </div>
            </div>,
            modalsRoot
        )

    )
}

export default Modal;