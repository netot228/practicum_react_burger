import { ModalProps } from "../../service/types";

const ModalOverlay: React.FC<ModalProps> = (props) => {
    return (
        <div
            data-testid="modal_overlay"
            className={props.className}
            onClick={props.onClose}
        >
            {props.children}
        </div>
    );
};

export default ModalOverlay;
