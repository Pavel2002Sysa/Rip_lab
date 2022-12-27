import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { axiosInstance } from '../api';
import { setProduct } from '../store/reducers/productReducer';

export const ProductPage = () => {
    const dispatch = useDispatch();
    const { product } = useSelector((store) => store.product);
    const { id } = useParams();
    const { authorized, user } = useSelector((store) => store.user);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            await axiosInstance.get(`footballers-depth/${id}`).then((response) => dispatch(setProduct(response?.data)));
        };

        fetchProduct();
        !product.name && navigate('/');
    }, [dispatch, id, navigate, product.name]);

    const handleClick = () => {
        const addBasket = async () => {
            let order_date = new Date();
            order_date.setHours(order_date.getHours() - 3);
            const values = {
                status: 'Подписан',
                item: +id,
                customer: user.id,
                order_date: dayjs(order_date).format('YYYY-MM-DD HH:mm:ss'),
            };
            await axiosInstance.post('orders/', values);
        };
        addBasket();
    };

    return (
        <div className='m-8'>
            <div className='flex gap-1'>
                <Link to='/'>{product?.category?.title ? product?.category?.title : 'Главная'}</Link> <p>/</p>
                <Link to='#'>{product.name}</Link>
            </div>
            {!!product && (
                <div className='p-8 border bg-gray-100 max-w-[720px] flex flex-col justify-center cursor-pointer mt-8'>
                    <img src={product.description} alt={product.name}/>
                    <p>
                        <strong>Позиция:</strong> {product.position}
                    </p>
                    <p>
                        <strong>Описание:</strong> {product.description}
                    </p>
                    <p>
                        <strong>Команда:</strong> {product.id_team}
                    </p>
                    <p>
                        <strong>Стоимость:</strong> {product.price}млн.$
                    </p>
                    {authorized && (
                        <button onClick={handleClick} className='bg-blue-400 w-full py-1 text-white rounded-md'>
                            <strong>Добавить в список трансферов</strong>
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};
