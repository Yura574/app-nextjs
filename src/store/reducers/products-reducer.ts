import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import {productsApi} from "../../api/api";
import {MaterialOfProductType} from "../../components/Personal/Products/Products";

export type ProductsType = {
    id?: string
    title: string
    image?: string
    // composition?: CompositionType[]
}

// export type CompositionType = {
//     purchaseTitle: string
//     amount: string
//     unit: string
//     price: string
// }
// export type ProductCompositionType = {
//     productId?: string,
//     composition: CompositionType[]
// }

type InitialStateType = {
    products: ProductsType[]
}

const initialState: InitialStateType = {
    products: []
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<ProductsType[]>) => {
            state.products = action.payload
        },
        addNewProduct: (state, action) => {
            state.products = [...state.products, action.payload]
        },
        addImage: (state, action: PayloadAction<{ id: string, image: string }>) => {
            state.products.map( el=> {
               let image  = el.id ===action.payload.id? {...el, image: action.payload.image}: el

               if(image){
                   console.log('1',image)
               }
           })
            // console.log(state.products)

        },
        deleteProduct:(state, action:PayloadAction<string>)=>{
            const index = state.products.findIndex(cat => cat.id === action.payload)
            state.products.splice(index, 1)
        }
    }
})


export const productsReducer = productsSlice.reducer
export const {setProducts, addNewProduct,addImage, deleteProduct} = productsSlice.actions


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

export const AddNewProductTC = (title: string, subCategoryId: string, productComposition: MaterialOfProductType[],image?: File) => (dispatch: Dispatch) => {
    console.log(title)
    console.log(image)
    productsApi.createProduct(title, subCategoryId, productComposition)
        .then(res => {
            console.log(res.data)
            dispatch(addNewProduct(res.data))
           if(image) {
               console.log(res.data)
               productsApi.addImage(res.data.id, image)
                   .then(r=>{
                       console.log(r)
                       dispatch(addImage({id:res.data.id, image:r.data}))
                   })
           }
        })
        .catch(err => err.response.data)
}
export const DeleteProductTC = (id: string)=> (dispatch: Dispatch)=>{
    productsApi.deleteProduct(id)
        .then(res=> {
            console.log(res)
            dispatch(deleteProduct(id))
        })
}