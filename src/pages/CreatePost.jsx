/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import client from "../api/client";

export default function CreatePost() {
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        try{
            await client.post('/post', data);
            alert('Post creado correctamente');
        }catch(err){
            alert('Error al guardar el Post');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("title")} placeholder="Titulo"/>
            <textarea {...register("content")} placeholder="Contenido"/>
            <button type="submit">Crear</button>
        </form>
    )
}