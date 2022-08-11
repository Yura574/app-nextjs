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
    addCategory: (userId: string, title: string, image?: File)=> {
        return instance.post('category/create', {title, userId, image}, {
            headers: {'Content-Type': 'multipart/form-data'}
        })
    },
    subCategories: (categoryId: string) => instance.get(`category/one/${categoryId}`),
    deleteCategory:(categoryId: string)=> instance.delete(`category/delete/${categoryId}`),
    updateCategory:(id: string, title: string, image?: File)=> {
        return instance.put('category/update', {title, id, image}, {
            headers: {'Content-Type': 'multipart/form-data'}
        })
    }

}

export const subCategoryApi = {
    goods: (subCategoryId: string)=> instance.get(`subCategory/one/${subCategoryId}`)
}