import React, { useEffect, useState } from "react";

import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import style from "./style.module.css";
import api from "../../services/api";
import ModalNote from "../../components/ModalNote";
import SortableCard from "../../components/SortableCard";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const getNotes = async () => {
      try {
        const response = await api.get("api/notes");

        const data = response.data;

        const normalized = Array.isArray(data)
          ? data.reverse()
          : data?.notes?.reverse() || [];

        setNotes(normalized);
      } catch (error) {
        console.error(error);
      }
    };

    getNotes();
  }, []);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {
      setNotes((items) => {
        const oldIndex = items.findIndex(
          (item) => item.id === active.id
        );

        const newIndex = items.findIndex(
          (item) => item.id === over.id
        );

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <>
      <ModalNote
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />

      <header className={style.headerHome}>
        <h1>Lite Notes</h1>

        <button
          className={style.btnNote}
          onClick={() => setModalVisible(true)}
        >
          Nova Nota +
        </button>
      </header>

      <main className={style.container}>
        <section className={style.sectionNotes}>
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={notes}
              strategy={verticalListSortingStrategy}
            >
              <div className={style.cardsNotes}>
                {notes.map((note) => (
                  <SortableCard
                    key={note.id}
                    note={note}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </section>
      </main>
    </>
  );
};

export default Home;