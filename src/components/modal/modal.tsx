import React, { useRef, useState } from 'react';

import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';

import style from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';

interface ModalProps {
    onClose: () => void
    children: any
    title: string
}

function Modal(props: ModalProps){
    return(
        <ModalOverlay className={style.modal} /*onClose={props.onClose}*/>

            <div className={style.wrapper}>
                <h4 className={`text_type_main-large ${style.title}`}>
                    {props.title}
                    <CloseIcon className={style.close} onClick={props.onClose} type="primary" />
                </h4>

                <div className={style.content}>
                    {props.children}
                </div>
            </div>
               
        </ModalOverlay>
    )
}

export default Modal;