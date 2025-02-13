import s from "./loader.module.css";
export default function Loader(props: { text?: string }) {
    return (
        <div className={s.loader}>
            {props.text && <span>{props.text}</span>}
        </div>
    );
}
