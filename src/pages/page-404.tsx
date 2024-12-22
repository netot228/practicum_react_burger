import s from "./pages.module.css";
import { Link } from "react-router-dom";

function Page404() {
    return (
        <>
            <div className={s.wrapper404}>
                <h1 className={s.title404}>404</h1>

                <h2 className={s.title404_subtitle}>увы, такой страницы нет</h2>

                <Link to="/" className={s.link404}>
                    Вернуться на главную
                </Link>
            </div>
            <div className={s.bg404}></div>
        </>
    );
}

export default Page404;
