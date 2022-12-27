import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: [],
    product: {},
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProducts: (state, { payload }) => {
            state.products = payload;
        },
        setProduct: (state, { payload }) => {
            state.product = payload;
        },
        resetProduct: (state) => {
            state.product = {};
        },
    },
});

export const productReducer = productSlice.reducer;

export const { setProduct, setProducts, resetProduct } = productSlice.actions;
