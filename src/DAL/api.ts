import axios from "axios";


const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:5000'
})


export const userApi = {
    createUser(email: string, password: string) {
        // console.log(user)
        return instance.post('users', {email, password})
    },
    getAllUsers() {
        return instance.get('users/all')
    },
    login  (email: string, password: string){
      return instance.post('auth/singin', {email, password})
    },
    me(){
        return instance.post('auth/me', {})
    }

}