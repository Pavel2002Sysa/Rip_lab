import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axiosInstance from '../api';
import { ProductCard } from '../components/ProductCard';
import { setProducts } from '../store/reducers/productReducer';

export const HomePage = () => {
    const { products } = useSelector((store) => store.product);
    const dispatch = useDispatch();
    const [nameQ, setNameQ] = useState('');
    const [positionQ, setPositionQ] = useState('');
    const [min, setMin] = useState('');
    const [max, setMax] = useState('');
    const [value, setValue] = useState({});

    useEffect(() => {
        const fetchProducts = async () => {
            await axiosInstance
                .get('/footballers-depth', { params: value })
                .then((response) => dispatch(setProducts(response?.data)));
        };

        fetchProducts();
    }, [dispatch, value]);

    const handleReset = () => {
        setNameQ('');
        setPositionQ('');
        setMax('');
        setMin('');
        setValue('');
    };

    return (
        <div className='m-8'>
            <div className='flex gap-1'>
                <Link to='#'> Главная</Link>
                {/*<p>/</p>*/}
            </div>
            <div>
                <div>
                    <p>Фио</p>
                    <input value={nameQ} onChange={(e) => setNameQ(e.target.value)} placeholder='Введите фио' />
                </div>
                <div>
                    <p>Позиция</p>
                    <input
                        value={positionQ}
                        onChange={(e) => setPositionQ(e.target.value)}
                        placeholder='Введите позицию'
                    />
                </div>
                <div>
                    <p>Минимальная трансферная стоимость</p>
                    <input
                        value={min}
                        onChange={(e) => setMin(e.target.value)}
                        placeholder='Введите'
                        type='number'
                    />
                </div>
                <div>
                    <p>Максимальная трансферная стоимость</p>
                    <input
                        value={max}
                        onChange={(e) => setMax(e.target.value)}
                        placeholder='Введите'
                        type='number'
                    />
                </div>
                <button onClick={() => setValue({ nameQ, positionQ, min_cost: min, max_cost: max })}>Поиск</button>
                <button onClick={handleReset} className='ml-4'>
                    Сброс
                </button>
            </div>
            {products.length > 0 && (
                <div className='flex gap-2 flex-wrap'>
                    {products.map((product) => (
                        <ProductCard key={product.id_footballer} {...product} />
                    ))}
                </div>
            )}
        </div>
    );
};
