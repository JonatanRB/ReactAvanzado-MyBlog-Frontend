import React, { useEffect, useState } from "react";
import './ArticulosBlog.css'

export default function ArticulosBlog() {
    const [naves, setNave] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        fetch('https://swapi.py4e.com/api/vehicles/')
            .then( res => {
                if (!res.ok) throw new Error('Error al obtener los articulos');
                return res.json();
            })
            .then(data => setNave(data.results))
            .catch(err => setError(err))
            .finally(() => setIsLoading(false));
    }, []);

    if (isLoading) return <h1>Cargando articulos...</h1>;
    if (error) return <h1> Error: {error.message}</h1>;

    return (
        <div className="articulo">
            <h2>Naves bien tuneadas Star Wars</h2>
            {naves.map(nave => (
                <div className="card" >
                    <h3>{nave.name}</h3>
                    <ul>
                        <li>{nave.model}</li>
                        <li>{nave.manufacturer}</li>
                        <li>{nave.vehicle_class}</li>
                    </ul>
                </div>
            ))}
        </div>
    )
}