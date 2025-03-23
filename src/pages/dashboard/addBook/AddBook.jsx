import React, { useState } from 'react'
import InputField from './InputField'
import SelectField from './SelectField'
import { useForm } from 'react-hook-form'
import { useAddBookMutation } from '../../../redux/features/books/booksApi'
import Swal from 'sweetalert2'

const AddBook = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [imageFile, setimageFile] = useState(null);
    const [addBook, {isLoading}] = useAddBookMutation()
    const [imageFileName, setimageFileName] = useState('')

    const onSubmit = async (data) => {
        try {
            console.log("Form data:", data);
            
            // Set trending to false if undefined
            if (data.trending === undefined) {
                data.trending = false;
            }
            
            // Use a default image URL if no image is provided
            const newBookData = {
                ...data,
                coverImage: imageFileName || "default-book-cover.jpg"
            };
            
            console.log("Submitting book data:", newBookData);
            
            const response = await addBook(newBookData).unwrap();
            console.log("Add book response:", response);
            
            Swal.fire({
                title: "Book added",
                text: "Your book is added successfully!",
                icon: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK"
            });
            
            reset();
            setimageFileName('');
            setimageFile(null);
        } catch (error) {
            console.error("Error adding book:", error);
            
            let errorMessage = "Failed to add book. Please try again.";
            if (error.data && error.data.message) {
                errorMessage = error.data.message;
                if (error.data.fields) {
                    errorMessage += ": " + error.data.fields.join(", ");
                }
            }
            
            Swal.fire({
                title: "Error",
                text: errorMessage,
                icon: "error",
                confirmButtonText: "OK"
            });
        }
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if(file) {
            setimageFile(file);
            setimageFileName(file.name);
        }
    }
    
    return (
        <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Book</h2>

        {/* Form starts here */}
        <form onSubmit={handleSubmit(onSubmit)} className=''>
            {/* Title */}
            <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Title</label>
                <input
                type="text"
                {...register("title", { required: "Title is required" })}
                className="p-2 border w-full rounded-md focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Enter book title"
                />
                {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
            </div>

            {/* Description */}
            <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                <textarea
                {...register("description", { required: "Description is required" })}
                className="p-2 border w-full rounded-md focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Enter book description"
                rows={4}
                />
                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
            </div>

            {/* Category */}
            <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                <select
                {...register("category", { required: "Category is required" })}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                >
                <option value="">Choose A Category</option>
                <option value="business">Business</option>
                <option value="technology">Technology</option>
                <option value="fiction">Fiction</option>
                <option value="horror">Horror</option>
                <option value="adventure">Adventure</option>
                </select>
                {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
            </div>

            {/* Trending Checkbox */}
            <div className="mb-4">
                <label className="inline-flex items-center">
                <input
                    type="checkbox"
                    {...register('trending')}
                    className="rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm font-semibold text-gray-700">Trending</span>
                </label>
            </div>

            {/* Old Price */}
            <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Old Price</label>
                <input
                type="number"
                step="0.01"
                {...register("oldPrice", { 
                    required: "Old price is required",
                    valueAsNumber: true,
                    min: { value: 0, message: "Price must be positive" } 
                })}
                className="p-2 border w-full rounded-md focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Old Price"
                />
                {errors.oldPrice && <p className="text-red-500 text-xs mt-1">{errors.oldPrice.message}</p>}
            </div>

            {/* New Price */}
            <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1">New Price</label>
                <input
                type="number"
                step="0.01"
                {...register("newPrice", { 
                    required: "New price is required",
                    valueAsNumber: true,
                    min: { value: 0, message: "Price must be positive" } 
                })}
                className="p-2 border w-full rounded-md focus:outline-none focus:ring focus:border-blue-300"
                placeholder="New Price"
                />
                {errors.newPrice && <p className="text-red-500 text-xs mt-1">{errors.newPrice.message}</p>}
            </div>

            {/* Cover Image Upload */}
            <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Image</label>
                <input type="file" accept="image/*" onChange={handleFileChange} className="mb-2 w-full" />
                {imageFileName && <p className="text-sm text-gray-500">Selected: {imageFileName}</p>}
                {!imageFileName && <p className="text-sm text-gray-500">No image selected. A default cover will be used.</p>}
            </div>

            {/* Submit Button */}
            <button 
                type="submit" 
                disabled={isLoading}
                className={`w-full py-2 ${isLoading ? 'bg-green-300' : 'bg-green-500 hover:bg-green-600'} text-white font-bold rounded-md transition-colors`}
            >
                {isLoading ? 'Adding...' : 'Add Book'}
            </button>
        </form>
        </div>
    )
}

export default AddBook