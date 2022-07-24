import axios from "axios";


export const instance = axios.create({
    baseURL: 'http://localhost:5000'
})



export const authApi = {
   login: (email: string, password: string) => instance.post('auth/singIn', {email, password})

}

export const userApi = {

}