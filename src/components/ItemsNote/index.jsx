import React from "react";
import { useState, useEffect } from "react";
import style from "./style.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBraille, faClose } from '@fortawesome/free-solid-svg-icons'
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const ItemsNote = ({ id, onRemove, items, valor, onUpdateValue }) => {
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


    const handlePointerDown = (e) => {
        e.stopPropagation();
    };

    return(
        <>
            <div 
                ref={setNodeRef}
                style={sortableStyle}
                // {...attributes}
                // {...listeners}
                className={style.itemsNote}
            >
                <input 
                    type="text" 
                    placeholder="Digite sua nota..." 
                    className={style.inputNote} 
                    value={valor}
                    onChange={(e) => onUpdateValue(id, e.target.value)}
                    onPointerDown={handlePointerDown}
                />
                <div className={style.actions}>
                    <div className={style.iconDrag} {...listeners} {...attributes}>
                        <FontAwesomeIcon icon={faBraille} className={style.iconDrag} color="#888" size="sm" />
                    </div>
                    {onRemove && (
                        <button
                            type="button"
                            onClick={() => items.length <= 1 ? null : onRemove(id)}
                            className={style.buttonRemove}
                        >
                            <FontAwesomeIcon icon={faClose}/>
                        </button>
                    )}
                </div>
            </div>
        </>
    )
}
export default ItemsNote;