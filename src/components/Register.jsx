import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const {registerUser, signInWithGoogle} = useAuth();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    //register user
    const onSubmit = async (data) => {
        try {
            setLoading(true);
            setMessage("");
            console.log("Register component: Attempting to register user:", data.email);
            
            // Try Firebase registration
            await registerUser(data.email, data.password);
            
            setLoading(false);
            alert("User registered successfully! Please login with your credentials.");
            navigate("/login");
        } catch (error) {
            setLoading(false);
            console.error("Register component error:", error.code, error.message);
            
            if (error.code === 'auth/email-already-in-use') {
                setMessage("This email is already registered. Please login instead.");
            } else if (error.code === 'auth/invalid-email') {
                setMessage("Invalid email format. Please check and try again.");
            } else if (error.code === 'auth/weak-password') {
                setMessage("Password is too weak. Please use at least 6 characters.");
            } else {
                setMessage("Registration failed: " + (error.message || "Please provide a valid email and password"));
            }
            console.error(error);
        }
    }
        
    const handleGoogleSignIn = async () => {
        try {
            setLoading(true);
            setMessage("");
            console.log("Register component: Attempting Google sign in");
            await signInWithGoogle();
            setLoading(false);
            navigate("/");
        } catch (error) {
            setLoading(false);
            console.error("Register component Google sign in error:", error.code, error.message);
            setMessage("Google sign in failed: " + (error.message || "Unknown error"));
            console.error(error);
        }
    }

  return (
    <div className='h-[calc(100vh-120px)] flex justify-center items-center'>
        <div className='w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
            <h2 className='text-xl font-semibold mb-4'>Please Register</h2>
            
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2'
                     htmlFor='email'>Email</label>
                     <input 
                     {...register("email", { 
                        required: "Email is required", 
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address"
                        }
                     })}
                     type='email' name='email' id='email' placeholder='Email Address'
                        className='shadow appearance-none border rounded w-full py-2 px-3
                        leading-tight focus:outline-none focus:shadow'
                     
                     />
                     {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2'
                     htmlFor='password'>Password</label>
                     <input 
                     {...register("password", { 
                        required: "Password is required",
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters"
                        }
                     })}
                     type='password' name='password' id='password' placeholder='Password'
                        className='shadow appearance-none border rounded w-full py-2 px-3
                        leading-tight focus:outline-none focus:shadow'
                     
                     />
                     {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}
                </div>
                {
                    message && <p className='text-red-500 text-xs italic mb-3'>{message}</p>
                }
                <div>
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2
                    px-8 rounded focus:outline-none'>Register </button>
                </div>
            </form>
            <p className='align-baseline font-medium mt-4 text-sm'>Have an account? Please  
                <Link to="/login" className='text-blue-500 hover:text-blue-700'> Login</Link>.
                </p>
                {/* google sign in */}
            <div className='mt-4'>
                <button 
                onClick={handleGoogleSignIn}
                className='w-full flex flex-wrap gap-1 items-center justify-center 
                bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded 
                focus:outline-none'>
                <FaGoogle className='mr-2'/>
                Sign in with Google
                </button>
            </div>
            <p className='mt-5 text-center text-gray-500 text-xs'>© 2025 Book Store, Inc. All rights reserved.</p>
        </div>
    </div>
  )
}

export default Register