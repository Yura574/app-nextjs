import axios from "axios";
import {RegistrationType} from "../store/reducers/auth-reducer";


export const instance = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true
})


export const authApi = {
    registration: (user: RegistrationType) => instance.post('auth/singUp', {...user}),
    login: (email: string, password: string) => instance.post('auth/singIn', {email, password}),
    me: () => instance.get('auth/me', {}),
    logout: ()=> instance.get('auth/logout')
}

export const userApi = {
    categories: (userId: string) => instance.get(`users/one/${userId}`),

}

export const categoryApi = {
    subCategories: (categoryId: string) => instance.get(`category/one/${categoryId}`)
}

export const subCategoryApi = {
    goods: (subCategoryId: string)=> instance.get(`subCategory/one/${subCategoryId}`)
}