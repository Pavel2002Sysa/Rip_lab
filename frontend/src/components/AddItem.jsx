import React, { useState } from 'react';
import axiosInstance from '../api';

export const AddItem = ({ resetType }) => {
    const [position, setPosition] = useState('');
    const [name, setName] = useState('');
    const [id_team, setId_team] = useState('');
    const [age, setAge] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!!name && !!id_team && !!position && !!age && !!price && !!description) {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('price', price);
            formData.append('position', position);
            formData.append('id_team', id_team);
            formData.append('age', age);
            formData.append('description', description);
            await axiosInstance.post('footballers/', formData);
            resetType();
        }
    };
    return (
        <form onSubmit={handleSubmit} className='md:w-[600px] flex flex-col gap-1'>
            <p className='font-bold'>Позиция: </p>
            <input
                className='inline-table md:w-[600px] overflow-y-hidden resize-none border rounded-md px-2 h-7 outline-none'
                value={position}
                onChange={(e) => setPosition(e.target.value)}
            />
            <p className='font-bold'>Фио: </p>
            <input
                className='inline-table md:w-[600px] overflow-y-hidden resize-none border rounded-md px-2 h-7 outline-none'
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <p className='font-bold'>Команда: </p>
            <input
                className='inline-table md:w-[600px] overflow-y-hidden resize-none border rounded-md px-2 h-7 outline-none'
                value={id_team}
                onChange={(e) => setId_team(e.target.value)}
            />
            <p className='font-bold'>Стоимость: </p>
            <input
                type='number'
                className='inline-table md:w-[600px] overflow-y-hidden resize-none border rounded-md px-2 h-7 outline-none'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            {/*<input type='file' accept='image/png, image/gif, image/jpeg' onChange={(e) => setImage(e.target.files)} />*/}
            <button type='submit' className='bg-blue-400 px-10 py-1 mt-2 w-full text-white rounded-md'>
                Добавить
            </button>
        </form>
    );
};
