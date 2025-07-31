import {
    Card, CardHeader, CardTitle, CardDescription, CardContent
} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Buttom} from '@/components/ui/buttom';
import {Label} from '@/components/ui/label';
import {Textarea} from '@/components/ui/textarea';
import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import client from "../api/client";

import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';

export default function PostList () {
    const { user, login, logout } = useState();
    const [posts, setPosts] = useState([]);
    const { toast } = useToast();
    const [filter, setFilter] = useState('');

    const {
        register,
        handleSubmit, 
        formState: {errors},
        reset,
    } = useForm();

    const {
        register: registerAuth,
        handleSubmit: handleAuthSubmit,
        reset: resetAuth, 
    } = useForm();

    const fetchPosts = async () => {
        try{
            const res = await client.get("./post");
            setPosts(res.data);
        }catch(err){
            toast({title: 'Error al cargar posts'});
        }
    }

    const handleCreatePosy = async (data) => {
        try{
            await client.post("/post", {
                ...data,
                user_id: user._id,
            });
            toast({title: 'Post creado correctamente'});
            reset();
            fetchPosts();
        }catch (err) {
            toast({title: 'Error al crear post'});
        }
    };

    const handleLogin = async (data) => {
        try {
            const res = await client.post("/user/login", data);
            login({email: res.data.email, password: res.data.password,});
            toast({title: 'Sesion iniciada'});
            resetAuth();
            fetchPosts();
        }catch(err){
            toast({title:'Error en iniciar sesion'})
        }
    };

    const handleRegister = async (data) => {
        try {
            const res = await client.post("/user/register", data);
            login({ email: res.data.email, password: res.data.password})
            toast({title: "Registrado con exitos"});
            resetAuth();
            fetchPosts();
        }catch (err) {
            toast({ title: "Error al registrarse"});
        }
    };

    const filteredPosts = posts.filter((p) => 
        p.title.toLowerCase().includes(filter.toLocaleLowerCase())
    );

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div className='p-4 max-w-3xl mx-auto space-y-4'>
            <Toaster />
            {!user ? (
                <Card>
                    <CardHeader>
                        <CardTitle>Accede o Regístrate</CardTitle>
                        <CardDescription>Con tu email y contraseña</CardDescription>
                        <CardContent className='space-y-2'>
                            <form onSubmit={handleAuthSubmit(handleLogin)} className='space-y-2'>
                                <label>Email</label>
                                <Input {...registerAuth("email", {required: true})} />
                                <label>Password</label>
                                <Input 
                                    type="password"
                                    {...registerAuth("password", {required: true})}
                                />
                                <Buttom className='w-full' type="submit">
                                    Iniciar Sesión
                                </Buttom>
                            </form>
                        </CardContent>
                    </CardHeader>
                </Card>
            ) : (
                <>
                    <div className='flex justify-between items-center'>
                        <h2 className=''>Hola, {user.email}</h2>
                    </div>
                </>
            )}
        </div>
    )
}