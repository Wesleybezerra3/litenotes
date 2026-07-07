
import React, { useContext, useState } from "react";
import { UserContext } from "../../context/Context";
import {useQueryClient} from "@tanstack/react-query";
import style from "./style.module.css";
import api from '../../services/api';
import { toast } from "sonner";

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const ViewNote = () => {
  const queryClient = useQueryClient();

  const { openNote, setOpenNote, openNoteData } = useContext(UserContext);
  const [editMode, setEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState(openNoteData.content || []);

  const handleClose = () => setOpenNote(false);

  if (!openNote) return null;

  const handleContentChange = (index, newValue) => {
    const updatedContent = [...editedContent];
    updatedContent[index].texto = newValue;
    setEditedContent(updatedContent);
  }

  const deleteNote = async() => {
    try {
      console.log(openNoteData)
      const response = await api.delete(`api/notes/${openNoteData.id}`);
      if (response.status === 200) {
        handleClose();
       queryClient.invalidateQueries(['notes']);
       toast.success("Nota deletada com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao deletar nota:", error);
      toast.error("Erro ao deletar nota.");
    }
  }
  

  return (
    <div className={style.overlay} onClick={handleClose}>
      <div className={style.modal} onClick={(e) => e.stopPropagation()}>
        <div className={style.header}>
          <div>
            <h2>{openNoteData.title || "Visualizar nota"}</h2>
            {openNoteData.date && (
              <p className={style.date}>Criado em: {formatDate(openNoteData.date)}</p>
            )}
          </div>
          <button className={style.closeButton} onClick={handleClose}>
            ×
          </button>
        </div>
        <div>

            <button onClick={() => setEditMode(!editMode)} className={(editMode ? style.btnActive : style.btnInactive)}>
                Editar
            </button>
            <button onClick={deleteNote} className={style.btnDelete}>
              Deletar
            </button>
        </div>

        <div className={style.body}>
          {openNoteData.content?.length > 0 ? (
            <ul className={style.list}>
              {openNoteData.content.map((item, index) => (
                <li key={index} className={style.item}>
                    {editMode ? (
                        <input
                          className={style.inputEdit}
                            type="text"
                            value={item.texto}
                            onChange={(e) => {
                                handleContentChange(index, e.target.value);
                            }}
                        />
                    ) : (
                        <>
                            {/* <span className={style.bullet} /> */}
                            <span>{item.texto}</span>
                        </>
                    )}
                </li>
              ))}
            </ul>
          ) : (
            <p className={style.emptyText}>Nenhum conteúdo disponível.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewNote;
