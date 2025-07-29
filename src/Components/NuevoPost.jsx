import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './NuevoPost'

export default function NuevoPost() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [mensaje, setMensaje] = useState('');

    const onSubmit = data => {
    console.log("Datos del post:", data);
    setMensaje('¡Publicación enviada correctamente!');
    reset();
    };

    return (
    <form onSubmit={handleSubmit(onSubmit)} aria-label="Formulario de nuevo post">
        <label htmlFor="titulo">Título</label>
        <input
        id="titulo"
        className={errors.titulo ? 'input-error' : ''}
        placeholder="Título"
        {...register("titulo", { required: true, minLength: 5 })}
        />
        {errors.titulo && <p>El título debe tener al menos 5 caracteres.</p>}

        <label htmlFor="contenido">Contenido</label>
        <textarea
        id="contenido"
        className={errors.contenido ? 'input-error' : ''}
        placeholder="Contenido"
        {...register("contenido", { required: true, minLength: 20 })}
        />
        {errors.contenido && <p>El contenido debe tener al menos 20 caracteres.</p>}

        <label htmlFor="email">Correo electrónico (opcional)</label>
        <input
        id="email"
        className={errors.email ? 'input-error' : ''}
        placeholder="Correo electrónico"
        {...register("email", {pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/})}
        />
        {errors.email?.type === 'pattern' && <p>Introduce un correo electrónico válido.</p>}

        <button type="submit">Publicar</button>
        {mensaje && <p className="success-message">{mensaje}</p>}
    </form>
    );
}