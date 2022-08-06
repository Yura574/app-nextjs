import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {authReducer} from "./reducers/auth-reducer";
import {profileReducer} from "./reducers/profile-reducer";
import thunk from "redux-thunk";
import {categoryReducer} from "./reducers/categories-reducer";
import {subCategoryReducer} from "./reducers/subCategory-reducer";
import {goodsReducer} from "./reducers/goods-reducer";


const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    categories: categoryReducer,
    subCategories: subCategoryReducer,
    goods: goodsReducer,
})


export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk)
})


export type RootStateType = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

// @ts-ignore
window.store = store