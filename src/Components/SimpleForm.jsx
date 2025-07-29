import React from "react";
import {Form, useForm} from "react-hook-form"
import './SimpleForm.css'

export default function SimpleForm() {
    const { register, handleSubmit, formState: {errors} } = useForm();
    
    const onSubmit = data => {
        console.log(data);
        console.log(`${data.nombre} es el mas perron y estudio en ${data.escuela}`);
        
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder="Nombre" {...register("nombre", {required:true, minLength:5})}/>
            {errors.nombre?.type === 'required' && <p>El nombre es requerido</p>}
            {errors.nombre?.type === 'minLength' && <p>Tu nombre debe tener al menos 5 caracteres</p>}
            <input type="text" placeholder="Correo" {...register("correo")}/>
            <input type="text" placeholder="Edad" {...register("edad")}/>
            <input className={errors.direccion ? 'input-error':''} type="text" placeholder="Dirección" {...register("direccion", {required:true, minLength:10})}/>
            {errors.direccion && (<span className="error-message"> { errors.direccion.type === 'required' ? 'Campo obligatorio' : 'Debe tener al menos 10 caracteres' } </span>)}
            <input type="text" placeholder="Telefono" {...register("phone")}/>
            <input type="text" placeholder="Color" {...register("color")}/>
            <input type="text" placeholder="Escuela" {...register("escuela")}/>
            
            <button type="submit">Enviar</button>
        </form>
    );
}