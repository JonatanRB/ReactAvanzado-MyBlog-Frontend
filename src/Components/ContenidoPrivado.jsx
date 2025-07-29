import {useUser} from "../context/UserContext"
import ArticulosBlog from '../Components/ArticulosBlog'

export default function ContenidoPrivado() {
    const { user } = useUser();
    
    if (!user) return <h1>🔒 DEbes iniciar sesion para ver el contenido 🔒</h1>;

    return (
        <div>
            <h2>Welcom {user.name}</h2>
            <ArticulosBlog/>
        </div>
    )
}