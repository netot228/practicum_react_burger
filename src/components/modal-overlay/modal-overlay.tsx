import { ModalProps } from "../../service/types";

const ModalOverlay: React.FC<ModalProps> = (props) => {
    return (
        <div className={props.className} onClick={props.onClose}>
            {props.children}
        </div>
    );
};

export default ModalOverlay;
