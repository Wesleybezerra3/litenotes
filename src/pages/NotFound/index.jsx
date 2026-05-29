import img404 from '../../assets/page-not-found.svg';
import style from './style.module.css';




const NotFound = () => {
  return (
    <div className={style.notFoundContainer}>   
        <img src={img404} alt="Página não encontrada" className={style.notFoundImage} />
        <h1>404 - Página não encontrada</h1>
        <p>A página que você está procurando não existe.</p>

    </div>
    );
};


export default NotFound;