import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Cadastro from "./pages/Cadastro";
import Login from "./pages/Login";
import Home from "./pages/Home";

import { DndContext } from "@dnd-kit/core";
import RecentNotes from "./pages/RecentNotes";
import Trash from "./pages/TrashPage";
import Favorites from "./pages/Favorites";

// import {
//   arrayMove,
//   SortableContext,
//   verticalListSortingStrategy,
// } from "@dnd-kit/sortable";

function App() {
  return (
    <>

        <Router>
          <Routes>
            <Route path="/cadastro" element={<Cadastro />} />
            <Route index path="/" element={<Login />} />
            <Route path="/home" element={<Home />} >
              <Route index element={<Navigate to="recent-notes" replace />} />
              <Route path="recent-notes" element={<RecentNotes />} />
              <Route path="favorites" element={<Favorites />} />
              <Route path="trash" element={<Trash />} />
            </Route>
          </Routes>
        </Router>
    </>
  );
}

export default App;
