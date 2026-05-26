import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import CardNotes from "./cards/CardNotes";

const SortableCard = ({ note }) => {
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

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <CardNotes
        title={note.titulo}
        content={note.conteudos}
        date={note.criadaEm}
      />
    </div>
  );
};

export default SortableCard;