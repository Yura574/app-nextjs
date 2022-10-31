import commonClass from './../../common.module.css'
import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {Navigate} from "react-router-dom";
import {CategoryType, GetCategoriesTC} from "../../store/reducers/categories-reducer";
import {Category} from "../Personal/Category/Category";

export const Main = () => {
    const dispatch = useAppDispatch()
    const isAuth = useAppSelector<boolean>(state => state.auth.isAuth)
    const categories = useAppSelector<CategoryType[]>(state => state.categories.categories)
    const userId = useAppSelector<string>(state => state.profile.profile.id)

    useEffect(() => {
        dispatch(GetCategoriesTC(userId))
    }, [dispatch, userId])

    if (!isAuth) {
        return <Navigate to={'/login'}/>
    }
    return (
        <div className={commonClass.wrapper}>
            {categories && categories.map(cat => {
                return (
                    <Category
                        key={cat.id}
                        id={cat.id}
                        title={cat.title}
                        image={cat.image}
                    />
                )
            })}


        </div>
    )
}