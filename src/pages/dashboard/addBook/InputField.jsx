import React from 'react';

const InputField = ({ label, name, type = 'text', register, placeholder, validation = { required: true } }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
      {type === 'textarea' ? (
        <textarea
          {...register(name, validation)}
          className="p-2 border w-full rounded-md focus:outline-none focus:ring focus:border-blue-300"
          placeholder={placeholder}
          rows={4}
        />
      ) : (
        <input
          type={type}
          {...register(name, validation)}
          className="p-2 border w-full rounded-md focus:outline-none focus:ring focus:border-blue-300"
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

export default InputField;