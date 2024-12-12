import { ModalProps } from "../../utils/types";

function ModalOverlay(props: ModalProps) {
    return (
        <div className={props.className} onClick={props.onClose}>
            {props.children}
        </div>
    );
}

export default ModalOverlay;
