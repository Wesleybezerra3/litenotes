import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cadastro from "./pages/Cadastro";
import Login from "./pages/Login";
import Home from "./pages/Home";

import { DndContext } from "@dnd-kit/core";

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
            <Route path="/home" element={<Home />} />
          </Routes>
        </Router>
    </>
  );
}

export default App;
