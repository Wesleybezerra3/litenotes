import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faFileArchive,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";

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
    return `última edição: ${diffSeconds}s`;
  }
  if (diffMinutes < 60) {
    return `última edição: ${diffMinutes}m`;
  }
  if (diffHours < 24) {
    return `última edição: ${diffHours}h`;
  }
  if (diffDays < 7) {
    return `última edição: ${diffDays}d`;
  }
  if (diffWeeks < 5) {
    return `última edição: ${diffWeeks} semana${diffWeeks === 1 ? "" : "s"}`;
  }
  if (diffMonths < 12) {
    return `última edição: ${diffMonths} mês${diffMonths === 1 ? "" : "es"}`;
  }
  return `última edição: ${diffYears} ano${diffYears === 1 ? "" : "s"}`;
};

const CardNotes = ({ title, content, date }) => {
  const relativeTime = getRelativeTime(date);
  const [qtdItems, setQtdItems] = useState('');
  const [listItems, setListItems] = useState([]);

  useEffect(()=>{
    if(content.length > 0) {
      setQtdItems(prev => content.length);
    }
  
  }, [content])

  useEffect(() => {
    const getListItems = () => {
      if(content.length > 0) {
        setListItems(content.map(item => item.texto).slice(0, 3));
      }
    }
    getListItems();
  }, [content])
  

    console.log(qtdItems + '   ' + listItems);
  return (
    <>
      <article className={style.cardNotes}>
        <div className={style.headerCardNotes}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div>
              <FontAwesomeIcon icon={faFileArchive} color="#6B52E7" size="xl" />
            </div>
            <div className={style.info}>
              <p className={style.titleCardNotes}>{title}</p>
              <p className={style.relativeTime}>{relativeTime}</p>
            </div>
          </div>
          {/* <div className={style.status}>
            <div>
              <FontAwesomeIcon icon={faCheckCircle} color="#4CAF50" />
            </div>
            <p>Salvo</p>
          </div> */}
        </div>

        <div className={style.contentCardNotes}>
          {/* <div className={style.titleCardNotes}>
                    //titulo da nota
                </div> */}

          <div className={style.bodyCardNotes}>
            
            {listItems.map((item, i) => (
              <ul>
                <li key={i}>
                  <span>
                    <FontAwesomeIcon
                      icon={faCircle}
                      color="#6B52E7"
                      size="sm"
                    />
                  </span>
                  {item}
                </li>
              </ul>
            ))}
            <div className={style.qtdItems}>
              <p>
                 {qtdItems > 3 ? `+${qtdItems - 3} conteúdos` : ''}
              </p>
              {/* {qtdItems > 3 && `+${qtdItems - 3} item${qtdItems - 3 > 1 ? 's' : ''}...`} */}
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default CardNotes;
