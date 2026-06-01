import NotCreateNote from "../../components/NotCreateNote";

const Favorites = ()=>{


    return(
        <>
           <NotCreateNote title="Nenhuma nota por aqui" subtitle="Você ainda não adicionou nenhuma nota aos favoritos." description='Clique em "Favoritar" em uma nota para adicioná-la aqui!' />
        </>
    )
}

export default Favorites;