/* import {useUser} from "../context/UserContext"
import {useForm} from "react-hook-form";
import './Login.css'

export default function Login() {
    const {user, login} = useUser();
    const { register, handleSubmit, formState: {errors}} = useForm();

    if (user) return null;

    const onSubmit = (data) => {
        login(data.nombre, data.password);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} aria-label='Formulario de login'>
            <input 
                type="text"
                placeholder='Nombre'
                {...register("nombre", {required: true})}
                className={errors.nombre ? 'input-error': ''}
            />
            {errors.nombre && <p>El nombrte es obligatorio</p>}

            <input 
                type="text"
                placeholder='Password'
                {...register("password", {required: true})}
                className={errors.nombre ? 'input-error': ''}
            />
            {errors.nombre && <p>La contraseña es obligatorio</p>}
        
            <button className='login' type='submit'>Iniociar sesion</button>
        </form>
    )
} */