import actionTypes from './actionTypes'
import { apiAddProductType, apiLoadProductType, apiDeleteProductType, apiAlterProductType } from '../../services/ProductType'

export const loadProductType = () => async () =>{
    const data = await apiLoadProductType()
    return data
}

export const addProductType = ({name, describe}) => async () =>{
    try{
        const response = await apiAddProductType({name, describe})
        if(response?.data.err === 0){
            return { success: true, message: "Thành công" };
        }
        else if(response?.data.err === 1){
            return { success: false, message: "Loại sản phẩm đã tồn tại" };
        }
        else if(response?.data.err === 2){
            return { success: false, message: "Chưa nhập đủ thông tin" };
        }
    }
    catch(error){
        return { success: false, message: "Loại sản phẩm đã tồn tại", err: error };
    }
}

export const deleteProductType = (id) => async () =>{
    const response = await apiDeleteProductType({id})
    return response
}

export const alterProductType = (id, fname, fdescribe) => async () =>{
    const response = await apiAlterProductType({id, fname, fdescribe})
    return response
}