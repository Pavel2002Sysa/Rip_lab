import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api';
import { setProducts } from '../store/reducers/productReducer';

export const ManagerItemCard = (props) => {
    const dispatch = useDispatch();
    const [newName, setNewName] = useState(props.name);
    const [newPosition, setNewPosition] = useState(props.position);
    const [newAge, setNewAge] = useState(props.age);
    const [newId_team, setNewId_team] = useState(props.id_team);
    const [newPrice, setNewPrice] = useState(props.price);
    const [newDescription, setNewDescription] = useState(props.description);
    const navigate = useNavigate();

    const handleUpdate = async () => {
        if (!!newName && !!newPosition && !!newAge && !!newId_team && !!newPrice && !!newDescription) {
            const values = {
                name: newName,
                position: newPosition,
                age: newAge,
                id_team: newId_team,
                price: +newPrice,
                description: newDescription,
            };
            await axiosInstance.put(`footballers/${props.id_footballer}/`, values).then(async () => {
                await axiosInstance.get('footballers-depth').then((response) => dispatch(setProducts(response?.data)));
            });
        }
    };

    const handleDelete = async () => {
        const values = {
            id_footballer: props.id_footballer,
            name: props.name,
            position: props.position,
            age: props.age,
            id_team: props.id_team,
            price: props.price,
            description: props.description,
        };
        await axiosInstance.delete(`footballers/${props.id_footballer}/`, values).then(async () => {
            await axiosInstance.get('footballers-depth').then((response) => dispatch(setProducts(response?.data)));
        });
    };

    const handleNavigate = () => {
        navigate(`/product/${props.id_footballer}`);
    };

    return (
        <div className='p-8 border w-[560px] flex flex-col justify-center items-center cursor-pointer my-8'>
            <img src={props.description} alt={props.name} className='w-80 object-contain' onClick={handleNavigate} />
            <div className='flex flex-col justify-between'>
                <div>
                    <p className='font-bold'>Позиция: </p>
                    <input
                        className='inline-table w-full overflow-y-hidden resize-none'
                        value={newPosition}
                        onChange={(e) => setNewPosition(e.target.value)}
                    />
                    <p className='font-bold'>Фио: </p>
                    <input
                        className='inline-table w-full overflow-y-hidden resize-none'
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                    />
                    <p className='font-bold'>Команда: </p>
                    <input
                        className='inline-table w-full overflow-y-hidden resize-none'
                        value={newId_team}
                        onChange={(e) => setNewId_team(e.target.value)}
                    />

                    <p className='font-bold'>Стоимость: </p>
                    <input type='number' value={newPrice} onChange={(e) => setNewPrice(e.target.value)} />
                    <button onClick={handleUpdate} className='bg-blue-400 px-10 py-1 mt-2 w-full text-white rounded-md'>
                        Сохранить
                    </button>
                    <button onClick={handleDelete} className='bg-red-400 px-10 py-1 mt-2 w-full text-white rounded-md'>
                        Удалить
                    </button>
                </div>
            </div>
        </div>
    );
};
