import axios from "axios";


export const instance = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true
})



export const authApi = {
   login: (email: string, password: string) => instance.post('auth/singIn', {email, password}),
    me: ()=> instance.get('auth/me', {})

}

export const userApi = {

}