/* eslint-disable no-unused-vars */
import client from "../api/client";
import { useForm } from "react-hook-form";
import {useNavigate} from 'react-router-dom'

export default function Register() {
    const { register, handleSubmit, forState: {errors}} = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try{
            const res = await client.post('/user/register', data);
            alert('Registro exitoso');
            navigate('/home')
        }catch(err){
            alert('Error al registratse');
        }
    };

    return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <input 
        {...register("email", {required: true})} 
        className={errors.email ? 'input-error':''} 
        placeholder="Email"
        />
        <input 
        {...register("password", {required: true})} 
        className={errors.password ? 'input-error':''} 
        type="password" 
        placeholder="Password" />
        <button type="submit">Registrarse</button>
    </form>
    );
}