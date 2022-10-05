import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {authReducer} from "./reducers/auth-reducer";
import {profileReducer} from "./reducers/profile-reducer";
import thunk from "redux-thunk";
import {categoryReducer} from "./reducers/categories-reducer";
import {subCategoryReducer} from "./reducers/subCategory-reducer";
import {goodsReducer} from "./reducers/goods-reducer";
import {appReducer} from "./reducers/app-reducer";
import {warehousesReducer} from "./reducers/warehouse-reducer";
import {purchasesReducer} from "./reducers/purchases-reducer";
import {dateReducer} from "./reducers/date-reducer";
import {purchasesInfoReducer} from "./reducers/purchasesInfo-reducer";


const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    profile: profileReducer,
    categories: categoryReducer,
    subCategories: subCategoryReducer,
    goods: goodsReducer,
    warehouses: warehousesReducer,
    purchases: purchasesReducer,
    purchasesInfo: purchasesInfoReducer,
    date: dateReducer,

})


export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({serializableCheck: false}).prepend(thunk)
})


export type RootStateType = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

// @ts-ignore
window.store = store