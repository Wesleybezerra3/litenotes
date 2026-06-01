import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import ItemsNote from "../ItemsNote";
import api from "../../services/api";

import { DndContext, closestCenter } from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { data } from "react-router-dom";

const ModalNote = ({ visible, onClose }) => {
  const [items, setItems] = useState([{ id: "1", valor: "" }]);
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

  const handleUpdateItemValue = (id, newValue) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, valor: newValue } : item,
      ),
    );
  };

  const handleAddItem = () => {
    const newId = Date.now().toString();
    setItems((prevItems) => [...prevItems, { id: newId, valor: "" }]);
  };

  const handleClose = () => {
    setTitulo("");
    setItems([{ id: "1", valor: "" }]);
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (titulo.trim() === "") {
        alert("O título não pode estar vazio.");
        return;
      }

      const conteudosFiltrados = items
        .filter((item) => item.valor.trim() !== "");

      if (conteudosFiltrados.length === 0) {
        alert("A nota deve conter pelo menos um conteúdo.");
        return;
      }

      const data = {
        titulo,
        conteudos: conteudosFiltrados.map((item, index) => ({
          texto: item.valor,
          ordem: index + 1
        }))
      };

      console.log(data);
      const response = await api.post("api/notes", data);

      alert("Nota salva com sucesso!");
      handleClose();
    window.location.reload();
      console.log("Resposta da API:", response.data);
    } catch (error) {
      console.error("Erro ao salvar a nota:", error);
    }
  };

  useEffect(() => {
    console.log(items);
  }, [items]);

  return (
    <>
      <div
        className={style.modalNote}
        style={{ display: visible ? "flex" : "none" }}
      >
        <div className={style.modalHeader}>
          {/* <h2>Nova Nota</h2> */}
          <button onClick={handleClose}>X</button>
        </div>
        <form className={style.modalForm} onSubmit={handleSubmit}>
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
                      items={items}
                      valor={item.valor}
                      onRemove={handleRemoveItem}
                      onUpdateValue={handleUpdateItemValue}
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
