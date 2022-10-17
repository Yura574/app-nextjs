import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import {productsApi} from "../../api/api";

export type ProductsType = {
    id?: string
    title: string
    image?: string
    // composition?: CompositionType[]
}

export type CompositionType = {
    purchaseTitle: string
    amount: string
    unit: string
    price: string
}
export type ProductCompositionType = {
    productId?: string,
    composition: CompositionType[]
}

type InitialStateType = {
    products: ProductsType[]
}

const initialState: InitialStateType = {
    products: []
}

const productsSlice = createSlice({
    name: 'goods',
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<ProductsType[]>) => {
            state.products = action.payload
        },
        addNewProduct: (state, action) => {
            state.products = [...state.products, action.payload]
        },
        // addComposition: (state, action: PayloadAction<ProductCompositionType>) => {
        //     const product = state.products.find(el => el.id === action.payload.productId)
        //     if (product) {
        //         product.composition = action.payload.composition
        //     }
        // }
    }
})


export const productsReducer = productsSlice.reducer
export const {setProducts, addNewProduct, } = productsSlice.actions


export const SetProductsTC = (subCategoryId: string) => (dispatch: Dispatch) => {
    productsApi.getProducts(subCategoryId)
        .then(res => {
            console.log(res)
            dispatch(setProducts(res.data))
        })
        .catch(err => {
            console.log(err)
        })
}

export const AddNewProductTC = (product: ProductsType, composition: CompositionType[]) => (dispatch: Dispatch) => {
    return console.log(product, composition)
    // productsApi.createProduct(product)
    //     .then(res => {
    //         console.log(res)
    //         dispatch(addNewProduct(res.data))
    //     })
    //     .then(() => {
    //         productsApi.addComposition(composition)
    //             .then((res) => {
    //                 console.log(res)
    //                 dispatch(addComposition(res.data))
    //             })
    //     })
}