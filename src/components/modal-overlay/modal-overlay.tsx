import React, { useRef, useState } from 'react';

interface ModalProps {
    onClose?: () => void
    children: any
    className: string
}

function ModalOverlay(props:ModalProps){
    return (
        <div className={props.className} onClick={props.onClose}>
            {props.children}
        </div>
    )
}

export default ModalOverlay;