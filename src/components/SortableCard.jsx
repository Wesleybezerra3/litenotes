import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import CardNotes from "./cards/CardNotes";

const SortableCard = ({ note, onCardClick }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: note.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleCardClick = (noteData) => {
    if(onCardClick) {
      onCardClick(noteData);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
    >
      <CardNotes
        id={note.id}
        title={note.titulo}
        content={note.conteudos}
        date={note.criadaEm}
        onCardClick={handleCardClick}
        dragListeners={listeners}
      />
    </div>
  );
};

export default SortableCard;