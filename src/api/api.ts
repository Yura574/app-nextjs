import axios from "axios";
import {RegistrationType} from "../store/reducers/auth-reducer";
import {PurchasesInfoType} from "../store/reducers/purchasesInfo-reducer";
import {MaterialOfProductType} from "../components/Personal/FinishedProductsWarehouse/Products/Products";
import {EntryType} from "../store/reducers/writeOffMoney-reducer";


export const instance = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true,
})


export const authApi = {
    registration: (user: RegistrationType) => instance.post('auth/singUp', {...user}),
    login: (email: string, password: string) => instance.post('auth/singIn', {email, password}),
    me: () => instance.get('auth/me', {}),
    logout: () => instance.get('auth/logout')
}

export const userApi = {
    categories: (userId: string) => {

        return instance.get(`users/one/${userId}`)
    },

}

export const categoryApi = {
    addCategory: (userId: string, title: string, image?: File) => {
        console.log(image)
        return instance.post('category/create', {title, userId, image}, {
            headers: {'Content-Type': 'multipart/form-data'}
        })
    },
    deleteCategory: (categoryId: string) => instance.delete(`category/delete/${categoryId}`),
    updateCategory: (id: string, title: string, image?: File) => {
        return instance.put('category/update', {title, id, image}, {
            headers: {'Content-Type': 'multipart/form-data'}
        })
    },


}

export const subCategoryApi = {
    getSubCategories: (categoryId: string) => instance.get(`category/one/${categoryId}`),
    addSubCategory: (categoryId: string, title: string, image?: File) => {
        return instance.post('subCategory/create', {categoryId, title, image}, {
            headers: {'Content-Type': 'multipart/form-data'}
        })
    },
    deleteSubCategory: (subCatId: string) => instance.delete(`subCategory/delete/${subCatId}`)
}

export const productsApi = {
    getProducts: (subCategoryId: string) => instance.get(`subCategory/one/${subCategoryId}`),
    createProduct: (userId: string, title: string, subCategoryId: string, count: number, productComposition: MaterialOfProductType[], primeCost: number) => {
        return instance.post(`products/create`,
            {userId, title, subCategoryId, count, productComposition, primeCost},
        )
    },
    addImage: (id: string, image?: File) => {
        return instance.put(`products/addImage`, {id, image}, {
            headers: {'Content-Type': 'multipart/form-data'}
        })
    },
    deleteProduct: (id: string) => {
        return instance.delete(`products/delete/${id}`)
    }

}

export const warehouseApi = {
    addWarehouse: (userId: string, title: string, image?: File) => {
        console.log(image)
        return instance.post('warehouse/create', {userId, title, image}, {
            headers: {'Content-Type': 'multipart/form-data'}
        })
    },
    updateWarehouse: (warehouseId: string, title: string, warehouseImage: string, image?: File) => {
        return instance.put(`warehouse/update`, {warehouseId, title, warehouseImage, image},
            {headers: {'Content-Type': 'multipart/form-data'}})
    },
    getAllWarehouses: (userId: string) => instance.get(`warehouse/all/${userId}`),
    deleteWarehouse: (warehouseId: string) => instance.delete(`warehouse/delete/${warehouseId}`),

}

export const purchaseApi = {
    addPurchase: (purchase: PurchasesInfoType, unitPrice: string, image?: File) => {
        console.log({...purchase})
        const {title, price, place, amount, unit, userId, date, warehouseId} = purchase
        return instance.post('purchase/create', {
            userId,
            warehouseId: warehouseId,
            title,
            price,
            place,
            amount,
            unit,
            unitPrice,
            date,
            image
        }, {
            headers: {'Content-Type': 'multipart/form-data'}
        })
    },
    getAllPurchase: (userId: string) => {
        return instance.get(`purchase/all/${userId}`)
    },
    getWarehousePurchases: (warehouseId: string) => {
        return instance.get(`warehouse/purchases/${warehouseId}`)
    },
    deletePurchase: (id: string) => {
        return instance.delete(`purchase/delete/${id}`)
    }

}

export const purchaseInfoApi = {
    addInfoPurchase: (purchaseInfo: PurchasesInfoType, unitPrice: string) => {
        const {title, price, place, amount, unit, date, userId} = purchaseInfo

        return instance.post('purchaseInfo/create', {userId, title, price, place, amount, unit, unitPrice, date})
    },
    getPurchasesInfo: (userId: string) => {
        return instance.get(`purchaseInfo/all/${userId}`)
    },
    deletePurchaseInfo: (id: string) => {
        return instance.delete(`purchaseInfo/delete/${id}`)
    }
}

export const ledgerApi = {
    getLedgerEntries: (id: string) => {
        return instance.get(`ledger/journalEntries/${id}`)
    }
}

export const accountsApi = {
    getAccounts: (id: string) => {
        return instance.get(`accounts/get/${id}`)
    },
    changeAccounts:(writeOffEntries: EntryType[], investment: EntryType[], duty: EntryType[])=>{
        return instance.put(`accounts/changeAccounts`, {writeOffEntries, investment, duty})
    }
}
