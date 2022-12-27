import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../api';
import { setOrders } from '../store/reducers/orderReducer';

export const OrdersPage = () => {
    const { orders } = useSelector((store) => store.order);
    const { authorized, user } = useSelector((store) => store.user);
    const navigate = useNavigate();
    const [type, setType] = useState('all');
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchBasket = async () => {
            const values = { id: user.id };
            await axiosInstance
                .get('orders-depth/', { params: values })
                .then((response) => dispatch(setOrders(response?.data)));
        };
        authorized ? fetchBasket() : navigate('/');
    }, [authorized, dispatch, navigate, user?.id]);

    const handleDelete = (id) => {
        const fetchDelete = async (id) => {
            await axiosInstance
                .delete(`orders/${id}`)
                .then(
                    async () =>
                        await axiosInstance.get('orders-depth').then((response) => dispatch(setOrders(response?.data)))
                );
        };
        fetchDelete(id);
    };

    return (
        <div className='m-8'>
            <div className='flex gap-1'>
                <Link to='/'>Главная</Link> <p>/</p>
                <Link to='#'>Трансферы</Link>
            </div>
            <div className='flex gap-2'>
                <button
                    className={`py-1 px-2 rounded-md border ${type === 'all' && 'bg-gray-400 text-white'}`}
                    onClick={() => setType('all')}
                >
                    Все
                </button>
                <button
                    className={`py-1 px-2 rounded-md border ${type === 'Подписан' && 'bg-gray-400 text-white'}`}
                    onClick={() => setType('Подписан')}
                >
                    Оформлен
                </button>
                <button
                    className={`py-1 px-2 rounded-md border ${type === 'Ведутся переговоры' && 'bg-gray-400 text-white'}`}
                    onClick={() => setType('Ведутся переговоры')}
                >
                    Ведутся переговоры
                </button>
                <button
                    className={`py-1 px-2 rounded-md border ${type === 'Прибыл в клуб' && 'bg-gray-400 text-white'}`}
                    onClick={() => setType('Прибыл в клуб')}
                >
                    Прибыл в клуб
                </button>
            </div>
            <ul className='flex mt-8 flex-wrap gap-4'>
                {orders.map((order) =>
                    !!order?.item && type === 'all' ? (
                        <li key={order.id} className='p-8 border rounded-md w-[440px]'>
                            <img src={order?.item.description} alt={order?.item.name} className='w-96' />
                            <p>Название: {order?.item.name}</p>
                            <p>Стоимость: {order?.item.price}</p>
                            <p>Дата добавления: {dayjs(order.order_date).format('YYYY.MM.DD HH:mm')}</p>
                            <p>Статус: {order.status}</p>
                            {order.status !== 'Подписан' && (
                                <button
                                    onClick={() => handleDelete(order.id)}
                                    className='bg-red-400 text-white w-full rounded-md'
                                >
                                    Отменить
                                </button>
                            )}
                        </li>
                    ) : (
                        order.status === type && (
                            <li key={order.id} className='p-8 border rounded-md w-[440px]'>
                                <img src={order?.item.description} alt={order?.item.name} className='w-96' />
                                <p>Название: {order?.item.name}</p>
                                <p>Стоимость: {order?.item.price}</p>
                                <p>Дата добавления: {dayjs(order.order_date).format('YYYY.MM.DD HH:mm')}</p>
                                <p>Статус: {order.status}</p>
                                {order.status !== 'Подписан' && (
                                    <button
                                        onClick={() => handleDelete(order.id)}
                                        className='bg-red-400 text-white w-full rounded-md'
                                    >
                                        Отменить
                                    </button>
                                )}
                            </li>
                        )
                    )
                )}
            </ul>
        </div>
    );
};
