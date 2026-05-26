import React from "react";
import style from './style.module.css';

const getRelativeTime = (dateString) => {
  const createdAt = new Date(dateString);
  if (Number.isNaN(createdAt.getTime())) {
    return "há algum tempo";
  }

  const now = new Date();
  const diffMs = now - createdAt;
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffSeconds < 60) {
    return `há ${diffSeconds}s`;
  }
  if (diffMinutes < 60) {
    return `há ${diffMinutes}m`;
  }
  if (diffHours < 24) {
    return `há ${diffHours}h`;
  }
  if (diffDays < 7) {
    return `há ${diffDays}d`;
  }
  if (diffWeeks < 5) {
    return `há ${diffWeeks} semana${diffWeeks === 1 ? '' : 's'}`;
  }
  if (diffMonths < 12) {
    return `há ${diffMonths} mês${diffMonths === 1 ? '' : 'es'}`;
  }
  return `há ${diffYears} ano${diffYears === 1 ? '' : 's'}`;
};

const CardNotes = ({ title, content, date }) => {
  const relativeTime = getRelativeTime(date);

    return(
        <>
        <article className={style.cardNotes}>

            <div className={style.headerCardNotes}>
                <p>
                    {title}
                </p>
                <p>
                    {relativeTime}
                </p>
            </div>

            <div className={style.contentCardNotes}>

                {/* <div className={style.titleCardNotes}>
                    //titulo da nota
                </div> */}

                <div className={style.bodyCardNotes}>
                    {content.map((item, i) => (
                        <p key={i}>{item.texto}</p>
                    ))}
                    
                </div>
            </div>

        </article>
        </>
    )
}

export default CardNotes;