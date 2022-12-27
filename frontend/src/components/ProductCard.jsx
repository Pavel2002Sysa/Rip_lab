import dayjs from 'dayjs';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api';

export const ProductCard = (props) => {
    const { authorized, user } = useSelector((store) => store.user);
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate(`/product/${props.id_footballer}`);
    };

    const handleClick = () => {
        const addBasket = async () => {
            let order_date = new Date();
            order_date.setHours(order_date.getHours() - 3);
            const values = {
                status: 'Подписан',
                item: +props.id_footballer,
                customer: user.id,
                order_date: dayjs(order_date).format('YYYY-MM-DD HH:mm:ss'),
            };
            await axiosInstance.post('orders/', values);
        };
        addBasket();
    };
    return (
        <div className='p-8 border bg-gray-100 mx-auto flex max-w-[600px] flex-col cursor-pointer'>
            <img onClick={handleNavigate} src={props.description} alt={props.name} />
            <p className='text-blue-500 text-xl'>
                <strong>{props.position}</strong>
            </p>
            <p>
                <strong>возраст:{props.age}</strong>
            </p>
            <p>
                <strong>{props.price}млн.$</strong>
            </p>
            {authorized && (
                <button className='bg-blue-400 w-full rounded-md mt-2 py-1 text-white' onClick={handleClick}>
                    <strong>Добавить в список трансферов</strong>
                </button>
            )}
        </div>
    );
};
