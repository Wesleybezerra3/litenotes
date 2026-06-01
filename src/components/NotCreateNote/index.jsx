
import imgNotCreateNote from '../../assets/add-notes.svg'
import style from './style.module.css';

const NotCreateNote = ({title, subtitle, description}) => {
  return (
    <div className={style.container}>
      <div className={style.notCreateNote}>
        {/* <div className={style.imageContainer}>
          <img src={imgNotCreateNote} alt="Adicionar nota" />
        </div> */}
        <h2 className={style.title}>{title || "Nenhuma nota por aqui"}</h2>
        <p className={style.subtitle}>{subtitle || "Você ainda não criou nenhuma nota."}</p>
        <p className={style.description}>{description || "Clique em \" + Adicionar nota\" para começar!"}</p>
      </div>
    </div>
  );
};

export default NotCreateNote;
