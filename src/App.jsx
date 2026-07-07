import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";

import { DndContext } from "@dnd-kit/core";
import RecentNotes from "./pages/RecentNotes";
import Trash from "./pages/TrashPage";
import Favorites from "./pages/Favorites";
import NotFound from "./pages/NotFound";
import PrivateRouter from "./components/PrivateRoute";
import { Toaster } from 'sonner' 

// import {
//   arrayMove,
//   SortableContext,
//   verticalListSortingStrategy,
// } from "@dnd-kit/sortable";

function App() {
  return (
    <>
      <Router>
         <Toaster expand={true} richColors />
        <Routes>
          <Route element={<PrivateRouter />}>
            <Route path="/home" element={<Home />}>
              <Route index element={<Navigate to="recent-notes" replace />} />
              <Route path="recent-notes" element={<RecentNotes />} />
              <Route path="favorites" element={<Favorites />} />
              <Route path="trash" element={<Trash />} />
            </Route>
          </Route>
          <Route path="/*" element={<NotFound />} />
          <Route path="/register" element={<Register />} />
          <Route index path="/" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
