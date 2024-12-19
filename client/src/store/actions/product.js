import actionTypes from './actionTypes'
import { apiAddProduct, apiLoadProduct, apiDeleteProduct, apiAlterProduct, apiLoadProductDetail, apiLoadRandomProduct, apiRenderHotProduct, apiRenderSaleProduct, apiRate, apiLoadRate, apiWish, apiCheckWish, apiLoadWish, apiLoadProductByWish } from '../../services/Product'

export const loadProduct = (page, limit, typeselect, sapxep, minPrice, maxPrice, name) => async () => {
    const data = await apiLoadProduct({page, limit, typeselect, sapxep, minPrice, maxPrice, name})
    return data
}

export const loadProductDetail = (formData) => async () => {
    const data = await apiLoadProductDetail(formData)
    return data
}

export const loadRandomProduct = (id) => async () => {
    const data = await apiLoadRandomProduct()
    return data
}

export const addProduct = ({ formData }) => async () => {
    try {
        const response = await apiAddProduct({ formData })
        return response
    }
    catch (error) {
        return { success: false, message: "Lỗi action", err: error };
    }
}

export const deleteProduct = (id) => async () => {
    const response = await apiDeleteProduct({ id })
    return response
}

export const alterProduct = ({ formData }) => async () => {
    const response = await apiAlterProduct({ formData })
    return response
}

export const renderHotProduct = () => async () => {
    const response = await apiRenderHotProduct()
    return response
}

export const renderSaleProduct = () => async() =>{
    const response = await apiRenderSaleProduct()
    return response
}

export const rate = (rate, detail, user, id) => async () => {
    const data = await apiRate({rate, detail, user, id})
    return data
}

export const loadRate = (id) => async () => {
    const data = await apiLoadRate({id})
    return data
}

export const wish = (user, id, unwish) => async () => {
    const data = await apiWish({user, id, unwish})
    return data
}

export const checkwish = (user, id) => async () => {
    const data = await apiCheckWish({user, id})
    return data
}

export const loadWish = (user) => async () => {
    const data = await apiLoadWish({user})
    return data
}

export const loadProductByWish = (wis) => async () => {
    const data = await apiLoadProductByWish({wis})
    return data
}