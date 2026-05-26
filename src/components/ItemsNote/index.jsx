import React from "react";
import style from "./style.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBraille } from '@fortawesome/free-solid-svg-icons'
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const ItemsNote = ({ id, onRemove }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({
        id,
    });

    const sortableStyle = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return(
        <>
            <div 
                ref={setNodeRef}
                style={sortableStyle}
                {...attributes}
                {...listeners}
                className={style.itemsNote}
            >
                <input type="text" placeholder="Digite sua nota..." className={style.inputNote}>
                </input>
                <div>
                    {onRemove && (
                        <button
                            type="button"
                            onClick={() => onRemove(id)}
                            className={style.buttonRemove}
                        >
                            ✕
                        </button>
                    )}
                </div>
            </div>
        </>
    )
}
export default ItemsNote;