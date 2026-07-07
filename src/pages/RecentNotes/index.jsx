import { useContext, useEffect, useState } from "react";
import SortableCard from "../../components/SortableCard";
import api from "../../services/api";
import style from "./style.module.css";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import { UserContext } from "../../context/Context";


import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import {
  restrictToParentElement,
  restrictToWindowEdges,
} from "@dnd-kit/modifiers";
import NotCreateNote from "../../components/NotCreateNote";
import ViewNote from "../../components/ViewNote";


const RecentNotes = () => {
  const queryClient = useQueryClient();
  const { openNote,setOpenNote, openNoteData, setOpenNoteData } = useContext(UserContext);
  const[orderedNotes, setOrderedNotes] = useState([]);
  


  useEffect(() => {
  setOrderedNotes(notes);
}, [notes]);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {
      setOrderedNotes((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);

        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleCardClick = (noteData) => {
     console.log("Card clicado:", noteData);
      setOpenNote(true);
      setOpenNoteData(noteData);
    // Aqui você pode abrir um modal, navegar para página de edição, etc
  };
  

  return (
    <>
      <ViewNote />
      <section className={style.sectionNotes}>
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToParentElement, restrictToWindowEdges]}
        >
          <SortableContext items={orderedNotes} strategy={verticalListSortingStrategy}>
            {orderedNotes.length === 0 ? (
              <NotCreateNote
                title="Nenhuma nota por aqui"
                subtitle="Você ainda não criou nenhuma nota."
                description='Clique em \" + Adicionar nota\" para começar!'
              />
            ) : (
              <div className={style.cardsNotes}>
                {orderedNotes.map((note) => (
                  <SortableCard
                    key={note.id}
                    note={note}
                    onCardClick={handleCardClick}
                  />
                ))}
              </div>
            )}
          </SortableContext>
        </DndContext>
      </section>
    </>
  );
};

export default RecentNotes;
