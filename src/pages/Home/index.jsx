import React, { useEffect, useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faSignOutAlt,
  faClock,
  faStar,
  faTrash,
  faFolder,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../context/Context";
import logo from "../../assets/logo.svg";
import { useQuery, useQueryClient } from "@tanstack/react-query";

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
  const queryClient = useQueryClient();

  const [modalVisible, setModalVisible] = useState(false);
  const { activeRoute, setActiveRoute } = useContext(UserContext);

  // const getCurrentUser = async () => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     if (token) {
  //       const response = await api.get("api/users/me", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       const user = response.data;
  //       logUser((prevUser) => ({ ...prevUser, ...user }));
  //       console.log(user);
  //     }
  //   } catch (err) {
  //     if (localStorage.getItem("token")) {
  //       localStorage.removeItem("token");
  //     }
  //   }
  // };

  // const { data: user } = useQuery({
  //   queryKey: ["me"],
  //   queryFn: getCurrentUser,
  // });

  const location = useLocation();

  useEffect(() => {
    const route = location.pathname.split("/")[2];

    setActiveRoute(route);
  }, [location.pathname]);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
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
              <div className={style.imgProfile}>
                <FontAwesomeIcon icon={faUser} color="#fff" size="1x" />
              </div>
              <div className={style.infoProfile}>
                {/* <h3>{user.nome}</h3> */}
                <p>email@example.com</p>
              </div>
            </div>
            <div className={style.btnLogout}>
              <button onClick={logout}>
                <FontAwesomeIcon icon={faSignOutAlt} className={style.icon} />
              </button>
            </div>
          </aside>
        </div>

        <div className={style.containerContent}>
          <div className={style.headerContent}>
            {/* <p>👋 Bem-vindo, {user.nome.split(" ")[0]}!</p> */}
          </div>
          <div className={style.titlePage}>
            <h1>
              {activeRoute === "recent-notes"
                ? "Notas Recentes"
                : activeRoute === "favorites"
                  ? "Favoritos"
                  : "Lixeira"}
            </h1>
          </div>
          <div className={style.containerSearch}>
            <div className={style.search}>
              <div className={style.containerIcon}>
                <FontAwesomeIcon icon={faSearch} />
              </div>
              <input type="text" placeholder="Pesquisar nota..." />
            </div>

            <button
              className={style.btnNoteNew}
              onClick={() => setModalVisible(true)}
            >
              + Adicionar nota
            </button>
          </div>
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
