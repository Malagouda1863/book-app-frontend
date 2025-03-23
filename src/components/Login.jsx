import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const { loginUser, signInWithGoogle } = useAuth();
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const onSubmit = async (data) => {
     try {
        setLoading(true);
        setMessage("");
        console.log("Attempting to login with:", data.email);
        
        // Regular user login through AuthContext
        await loginUser(data.email, data.password);
        setLoading(false);
        navigate("/")
     } catch (error) {
        setLoading(false);
        console.error("Login error:", error.code, error.message);
        
        if (error.code === 'auth/invalid-credential' || error.code === 'auth/invalid-login-credentials') {
            setMessage("Invalid email or password. Please try again.");
        } else if (error.code === 'auth/user-not-found') {
            setMessage("No account found with this email. Please register first.");
        } else if (error.code === 'auth/wrong-password') {
            setMessage("Incorrect password. Please try again.");
        } else if (error.code === 'auth/too-many-requests') {
            setMessage("Too many unsuccessful login attempts. Please try again later.");
        } else {
            setMessage("Login failed: " + error.message);
        }
     }
    }
    
    const handleGoogleSignIn = async () => {
        try {
            setLoading(true);
            setMessage("");
            await signInWithGoogle();
            setLoading(false);
            navigate("/")
        } catch (error) {
            setLoading(false);
            console.error("Google sign in error:", error.code, error.message);
            setMessage("Google sign in failed: " + error.message);
        }
    }

    return (
        <div className='h-[calc(100vh-120px)] flex justify-center items-center'>
            <div className='w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                <h2 className='text-xl font-semibold mb-4'>Please Login</h2>
                
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
                    <div className="mb-4 text-right">
                        <Link to="/forgot-password" className="text-blue-500 hover:text-blue-700 text-sm">
                            Forgot Password?
                        </Link>
                    </div>
                    {
                        message && <p className='text-red-500 text-xs italic mb-3'>{message}</p>
                    }
                    <div className="flex justify-center">
                        <button 
                        type="submit"
                        disabled={loading}
                        className={`${loading ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-700'} text-white font-bold py-2
                        px-8 rounded focus:outline-none`}>
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </div>
                </form>
                <p className='align-baseline font-medium mt-4 text-sm text-center'>Don't have an account? Please  
                    <Link to="/register" className='text-blue-500 hover:text-blue-700'> Register</Link>.
                </p>
                {/* google sign in */}
                <div className='mt-4 flex justify-center'>
                    <button 
                    type="button"
                    onClick={handleGoogleSignIn}
                    disabled={loading}
                    className={`w-full flex flex-wrap gap-1 items-center justify-center 
                    ${loading ? 'bg-gray-400' : 'bg-secondary hover:bg-blue-700'} text-white font-bold py-2 px-4 rounded 
                    focus:outline-none`}>
                    <FaGoogle className='mr-2'/>
                    {loading ? 'Signing in...' : 'Sign in with Google'}
                    </button>
                </div>
                <p className='mt-5 text-center text-gray-500 text-xs'>© 2025 Book Store, Inc. All rights reserved.</p>
            </div>
        </div>
    )
}

export default Login