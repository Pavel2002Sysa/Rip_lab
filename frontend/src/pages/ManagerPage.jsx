import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axiosInstance from '../api';
import { AddItem } from '../components/AddItem';
import { ManagerItemCard } from '../components/ManagerItemCard';
import { ManagerOrderCard } from '../components/ManagerOrderCard';
import { setOrders } from '../store/reducers/orderReducer';
import { setProducts } from '../store/reducers/productReducer';

export const ManagerPage = () => {
    const dispatch = useDispatch();
    const { products } = useSelector((store) => store.product);
    const { orders } = useSelector((store) => store.order);
    const [type, setType] = useState('');
    const [orderType, setOrderType] = useState('all');
    useEffect(() => {
        const fetchProducts = async () => {
            await axiosInstance.get('footballers-depth').then((response) => dispatch(setProducts(response?.data)));
        };
        const fetchOrders = async () => {
            await axiosInstance.get('orders-depth').then((response) => dispatch(setOrders(response?.data)));
        };
        type === 'Футболисты' ? fetchProducts() : type === 'Трансферы' && fetchOrders();
    }, [dispatch, type, orderType]);
    return (
        <div className='p-8 flex flex-col gap-4'>
            <div className='flex gap-1'>
                <Link to='/'>Главная</Link> <p>/</p>
                <Link to='#'>Панель менеджера</Link>
            </div>
            <div className='flex gap-4'>
                <button
                    className={`py-1 px-2 rounded-md border ${type === 'Футболисты' && 'bg-gray-400 text-white'}`}
                    onClick={() => setType('Футболисты')}
                >
                    Футболисты
                </button>
                <button
                    className={`py-1 px-2 rounded-md border ${type === 'Трансферы' && 'bg-gray-400 text-white'}`}
                    onClick={() => setType('Трансферы')}
                >
                    Трансферы
                </button>
                <button
                    className={`py-1 px-2 rounded-md border ${type === 'newItem' && 'bg-gray-400 text-white'}`}
                    onClick={() => setType('newItem')}
                >
                    Добавить трансфер
                </button>
            </div>
            <div>
                {type === 'Футболисты' ? (
                    products?.length > 0 &&
                    products.map((product) => <ManagerItemCard key={product.id_footballer} {...product} />)
                ) : type === 'Трансферы' ? (
                    orders.length > 0 && (
                        <div>
                            <div className='flex gap-2 mb-4'>
                                <button
                                    className={`py-1 px-2 rounded-md border ${
                                        orderType === 'all' && 'bg-gray-400 text-white'
                                    }`}
                                    onClick={() => setOrderType('all')}
                                >
                                    Все
                                </button>
                                <button
                                    className={`py-1 px-2 rounded-md border ${
                                        orderType === 'Подписан' && 'bg-gray-400 text-white'
                                    }`}
                                    onClick={() => setOrderType('Подписан')}
                                >
                                    Подписан
                                </button>
                                <button
                                    className={`py-1 px-2 rounded-md border ${
                                        orderType === 'Ведутся переговоры' && 'bg-gray-400 text-white'
                                    }`}
                                    onClick={() => setOrderType('Ведутся переговоры')}
                                >
                                    Ведутся переговоры
                                </button>
                                <button
                                    className={`py-1 px-2 rounded-md border ${
                                        orderType === 'Прибыл в клуб' && 'bg-gray-400 text-white'
                                    }`}
                                    onClick={() => setOrderType('Прибыл в клуб')}
                                >
                                    Прибыл в клуб
                                </button>
                            </div>
                            {orders.map((order) =>
                                orderType === 'all' ? (
                                    <ManagerOrderCard key={order.id} {...order} />
                                ) : (
                                    orderType === order.status && <ManagerOrderCard key={order.id} {...order} />
                                )
                            )}
                        </div>
                    )
                ) : type === 'newItem' ? (
                    <AddItem resetType={() => setType('')} />
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};
