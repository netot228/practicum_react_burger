import s from './loader.module.css'
export default function Loader(){
    return (
      <div className={s.wrapper}>
        <div className={s.dot}></div>
        <div className={s.dot}></div>
        <div className={s.dot}></div>
      </div>
    );
}


