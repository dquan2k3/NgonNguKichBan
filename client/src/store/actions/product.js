import actionTypes from './actionTypes'
import { apiAddProduct, apiLoadProduct, apiDeleteProduct, apiAlterProduct, apiLoadProductDetail } from '../../services/Product'

export const loadProduct = (id) => async () =>{
    const data = await apiLoadProduct()
    return data
}

export const loadProductDetail = (formData) => async () =>{
    const data = await apiLoadProductDetail(formData)
    return data
}

export const addProduct = ({formData}) => async () =>{
    try{
        const response = await apiAddProduct({formData})
        return response
    }
    catch(error){
        return { success: false, message: "Lỗi action", err: error };
    }
}

export const deleteProduct = (id) => async () =>{
    const response = await apiDeleteProduct({id})
    return response
}

export const alterProduct = ({formData}) => async () =>{
     const response = await apiAlterProduct({formData})
     return response
}