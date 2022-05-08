



const initialState = {
    isAuth: false
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state, isAuth: action.isAuth
            }
        default:
            return state
    }

}

export const setUser = (isAuth) => {
    return {
        type: 'SET_USER',
        isAuth
    }
}