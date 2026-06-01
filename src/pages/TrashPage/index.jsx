import NotCreateNote from "../../components/NotCreateNote";

const Trash = () => {
    return(
        <>
        <NotCreateNote title="Lixeira vazia" subtitle="Nenhuma nota foi deletada ainda." description='As notas deletadas aparecerão aqui. Para deletar uma nota, basta clicar no ícone de lixeira na nota.' />
        </>
    )
}

export default Trash;