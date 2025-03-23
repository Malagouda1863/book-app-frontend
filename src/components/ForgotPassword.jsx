import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from '../context/AuthContext';

const ForgotPassword = () => {
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const { resetPassword } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const onSubmit = async (data) => {
        try {
            setLoading(true);
            setMessage("");
            setSuccess(false);
            
            await resetPassword(data.email);
            
            setSuccess(true);
            setMessage("Password reset link sent to your email. Please check your inbox and spam folder.");
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setSuccess(false);
            
            if (error.code === 'auth/user-not-found') {
                setMessage("No account found with this email address.");
            } else if (error.code === 'auth/invalid-email') {
                setMessage("Invalid email format. Please try again.");
            } else if (error.code === 'auth/too-many-requests') {
                setMessage("Too many requests. Please try again later.");
            } else {
                setMessage("Failed to send password reset email: " + error.message);
            }
            
            console.error("Password reset error:", error.code, error.message);
        }
    }

    return (
        <div className='h-[calc(100vh-120px)] flex justify-center items-center'>
            <div className='w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                <h2 className='text-xl font-semibold mb-4'>Reset Your Password</h2>
                
                {success ? (
                    <div className='mb-4'>
                        <p className='text-green-500 mb-4'>{message}</p>
                        <div className='mt-4 text-center'>
                            <Link to="/login" 
                                className='text-blue-500 hover:text-blue-700 font-medium'>
                                Return to Login
                            </Link>
                        </div>
                    </div>
                ) : (
                    <>
                        <p className='mb-4 text-gray-600'>
                            Enter your email address and we'll send you a link to reset your password.
                        </p>
                        
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
                            
                            {message && <p className={`text-${success ? 'green' : 'red'}-500 text-xs italic mb-3`}>{message}</p>}
                            
                            <div className="flex justify-center">
                                <button 
                                type="submit"
                                disabled={loading}
                                className={`${loading ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-700'} text-white font-bold py-2
                                px-8 rounded focus:outline-none`}>
                                    {loading ? 'Sending...' : 'Reset Password'}
                                </button>
                            </div>
                        </form>
                        
                        <div className='mt-4 text-center'>
                            <Link to="/login" 
                                className='text-blue-500 hover:text-blue-700 font-medium'>
                                Back to Login
                            </Link>
                        </div>
                    </>
                )}
                
                <p className='mt-5 text-center text-gray-500 text-xs'>© 2025 Book Store, Inc. All rights reserved.</p>
            </div>
        </div>
    )
}

export default ForgotPassword 