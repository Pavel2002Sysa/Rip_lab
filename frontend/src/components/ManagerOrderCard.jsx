import dayjs from 'dayjs';
import React from 'react';
import { useDispatch } from 'react-redux';
import axiosInstance from '../api';
import { setOrders } from '../store/reducers/orderReducer';

export const ManagerOrderCard = (props) => {
    const dispatch = useDispatch();
    const handleUpdate = async (status) => {
        const values = { status };
        await axiosInstance.put(`orders/${props.id}/`, values).then(async () => {
            await axiosInstance.get('orders-depth').then((response) => dispatch(setOrders(response?.data)));
        });
    };
    return (
        <div className='p-8 md:w-[720px] border rounded-md flex flex-col md:flex-row gap-8 items-start'>
            <img src={props?.item.description} alt={props?.item.name} className='w-96' />
            <div>
                <p>Фио: {props?.item.name}</p>
                <p>Стоимость: {props?.item.price}</p>
                <p>Пользователь: {props?.customer?.email}</p>
                <p>Дата добавления: {dayjs(props.order_date).format('YYYY.MM.DD HH:mm')}</p>
                <select onChange={(e) => handleUpdate(e.target.value)}>
                    <option disabled>Статус заказа</option>
                    <option selected={props.status === 'Подписан'} value='Подписан'>
                        Подписан
                    </option>
                    <option selected={props.status === 'Ведутся переговоры'} value='Ведутся переговоры'>
                        Ведутся переговоры
                    </option>
                    <option selected={props.status === 'Прибыл в клуб'} value='Прибыл в клуб'>
                        Прибыл в клуб
                    </option>
                </select>
            </div>
        </div>
    );
};
