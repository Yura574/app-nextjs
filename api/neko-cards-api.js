import axios from 'axios';


const instance = axios.create({
    // baseURL: 'http://localhost:7542/2.0',
    baseURL: 'https://neko-back.herokuapp.com/2.0',
    withCredentials: true,
});


export const nekoCardsAPI = {
    requestNewPassword(email) {
        const data = {
            email,
            from: 'test-front-admin <ai73a@yandex.by>',
            message: `<div style="background-color: lime; padding: 15px">
                      password recovery link: 
                        <a href='http://localhost:3000/#/set-new-password/$token$'>
                          link
                        </a> 
                      </div>`,
        }
        return instance.post(`/auth/forgot`, data);
    },
    setNewPassword(password, resetPasswordToken) {
        return instance.post(`/auth/set-new-password`, {password, resetPasswordToken});
    },
    AuthMe() {
        return instance.post('/auth/me', {})
    },
    editProfile(dataProfile) {
        const {name, avatar} = dataProfile
        return instance.put(`/auth/me`, {name, avatar})
    },
    login(email, password, rememberMe) {
        return instance.post('/auth/login', {email, password, rememberMe})
    },
    logout() {
        return instance.delete('/auth/me')
    },
    registration(email, password) {
        return instance.post('/auth/register', {email, password})
    },
}