import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faSignOutAlt,
  faClock,
  faStar,
  faTrash,
  faFolder,
} from "@fortawesome/free-solid-svg-icons";

import logo from "../../assets/logo.svg";

import { DndContext, closestCenter } from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import style from "./style.module.css";
import api from "../../services/api";
import ModalNote from "../../components/ModalNote";
import SortableCard from "../../components/SortableCard";
import { Link, Outlet, useLocation } from "react-router-dom";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

        const location = useLocation();

  const [activeRoute, setActiveRoute] = useState("");

  useEffect(() => {
    const route = location.pathname.split("/")[2];

    setActiveRoute(route);
  }, [location.pathname]);

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
        const oldIndex = items.findIndex((item) => item.id === active.id);

        const newIndex = items.findIndex((item) => item.id === over.id);

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

      <main className={style.container}>
        <div className={style.containerMenu}>
          <aside className={style.menuSide}>
            <div>
              <img src={logo} alt="Lite Notes" className={style.logo} />
            </div>
            <div className={style.linksMenu}>
              <div className={style.linksMenuNote}>
                <ul>
                  <li>
                    <Link
                      to="recent-notes"
                      className={
                        activeRoute === "recent-notes" ? style.active : ""
                      }
                      onClick={() => setActiveRoute("recent-notes")}
                    >
                      <FontAwesomeIcon icon={faClock} className={style.icon} />{" "}
                      Notas Recentes
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="favorites"
                      className={
                        activeRoute === "favorites" ? style.active : ""
                      }
                      onClick={() => setActiveRoute("favorites")}
                    >
                      <FontAwesomeIcon icon={faStar} className={style.icon} />{" "}
                      Favoritos
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="trash"
                      className={activeRoute === "trash" ? style.active : ""}
                      onClick={() => setActiveRoute("trash")}
                    >
                      <FontAwesomeIcon icon={faTrash} className={style.icon} />{" "}
                      Lixeira
                    </Link>
                  </li>
                </ul>
              </div>

              <div className={style.linksMenuFolder}>
                <h2>Pastas</h2>
                <ul>
                  <li>
                    <Link to="*">
                      <FontAwesomeIcon icon={faFolder} className={style.icon} />{" "}
                      Lorem ipsum
                    </Link>
                  </li>
                  <li>
                    <Link to="*">
                      <FontAwesomeIcon icon={faFolder} className={style.icon} />{" "}
                      Lorem ipsum
                    </Link>
                  </li>
                  <li>
                    <Link to="*">
                      <FontAwesomeIcon icon={faFolder} className={style.icon} />{" "}
                      Lorem ipsum
                    </Link>
                  </li>
                  <li>
                    <Link to="*">
                      <FontAwesomeIcon icon={faFolder} className={style.icon} />{" "}
                      Lorem ipsum
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className={style.containerProfile}>
              <div className={style.imgProfile}></div>
              <div className={style.infoProfile}>
                <h3>John Doe</h3>
                <p>email@example.com</p>
              </div>

              <div className={style.btnLogout}>
                <button>
                  <FontAwesomeIcon icon={faSignOutAlt} className={style.icon} />
                </button>
              </div>
            </div>
          </aside>
        </div>

        <div className={style.containerContent}>
          <Outlet />
         
        </div>
      </main>
      {/* 
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
      </main> */}
    </>
  );
};

export default Home;
