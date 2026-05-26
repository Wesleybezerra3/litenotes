import React, { useState } from "react";
import style from "./style.module.css";
import ItemsNote from "../ItemsNote";

import { DndContext, closestCenter } from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const ModalNote = ({ visible, onClose }) => {
  const [items, setItems] = useState([{ id: "1" }, { id: "2" }]);
  const [titulo, setTitulo] = useState("");

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {
      setItems((prevItems) => {
        const oldIndex = prevItems.findIndex((item) => item.id === active.id);

        const newIndex = prevItems.findIndex((item) => item.id === over.id);

        return arrayMove(prevItems, oldIndex, newIndex);
      });
    }
  };

  const handleRemoveItem = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleAddItem = () => {
    const newId = Date.now().toString();
    setItems((prevItems) => [...prevItems, { id: newId }]);
  };

  const handleClose = () => {
    setTitulo("");
    setItems([{ id: "1" }, { id: "2" }]);
    onClose();
  };

  return (
    <>
      <div
        className={style.modalNote}
        style={{ display: visible ? "flex" : "none" }}
      >
        <div className={style.modalHeader}>
          <h2>Nova Nota</h2>
          <button onClick={handleClose}>X</button>
        </div>
        <form className={style.modalForm} onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="titulo">Título</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className={style.inputForm}
          />
          <label htmlFor="conteudo">Conteúdo</label>
          <div>
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={items.map((item) => item.id)}
                strategy={verticalListSortingStrategy}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  {items.map((item) => (
                    <ItemsNote
                      key={item.id}
                      id={item.id}
                      onRemove={handleRemoveItem}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              type="button"
              onClick={handleAddItem}
              className={style.buttonForm}
            >
              + Adicionar Linha
            </button>
            <button type="submit" className={style.buttonForm}>
              Salvar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default ModalNote;
