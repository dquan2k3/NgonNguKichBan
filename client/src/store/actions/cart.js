import { apiAddToCart, apiGetCart, apiRemoveCart, apiCod } from "../../services/cart"


export const getCart  =  (id) => async () => {
    const data = await apiGetCart()
    return data
}

export const addToCart = (product) => async () => {
    const data = await apiAddToCart(product)
    return data
}

export const removeCart = (id) => async () => {
    const data = await apiRemoveCart(id)
    return data
}


export const cod = (user, address) => async () => {
    const data = await apiCod(user, address)
    return data
}