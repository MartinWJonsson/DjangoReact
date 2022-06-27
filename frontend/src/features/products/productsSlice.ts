import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchProducts } from './productsAPI';

export interface Product {
    id?: number;
    product_name: string;
    product_description: string;
    product_price: number;
}

export enum LoadingStatus {
    IDLE,
    LOADING,
    FAILED
}

interface ProductState {
    products: Product[];
    status: LoadingStatus;
}

const initialState: ProductState = {
    products: [] as Product[],
    status: LoadingStatus.IDLE,
}

export const fetchAsync =
    createAsyncThunk(
        'products/fetchProducts',
        async () => {
            const response = await fetchProducts();
            return response;
        }
    )

const updateProduct = (products: Product[], product : Product) => {
    products.forEach((prod, index) => {
        if(current(prod).id === product.id){
            products[index] = product;
        }
    })
    return products;
}

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        deleteProductAction: (state, action) => {
            state.products = state.products.filter(product => product.id !== action.payload)
        },
        addProductAction: (state, action) => {
            state.products = [...state.products, action.payload].sort((a, b) => a.product_name != b.product_name ? a.product_name > b.product_name ? 1 : -1 : a.id > b.id ? 1 : - 1)
        },
        updateProductAction: (state, action) => {
            state.products = updateProduct([...state.products], action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAsync.pending, (state) => {
                state.status = LoadingStatus.LOADING
            })
            .addCase(fetchAsync.fulfilled,
                (state: ProductState, action) => {
                    state.status = LoadingStatus.IDLE
                    state.products = [...action.payload].sort((a, b) => a.product_name != b.product_name ? a.product_name > b.product_name ? 1 : -1 : a.id > b.id ? 1 : - 1)
                })
            .addCase(fetchAsync.rejected, (state) => {
                state.status = LoadingStatus.FAILED
            })
    }
})

export const selectProducts = (state: RootState) => state.products;

export const { deleteProductAction, addProductAction, updateProductAction } = productsSlice.actions

export default productsSlice.reducer;