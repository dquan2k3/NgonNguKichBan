import { apiAddVoucher, apiAlterVoucher, apiDeleteVoucher, apiLoadVoucher } from "../../services/voucher";


export const addvoucher = ({ name, describe, date }) => async () => {
    try {
        if (describe <= 0 || describe > 100) {
            return { success: false, message: "Vui lòng nhập phần trăm giảm giá từ 1 đến 100%" };
        }
        const response = await apiAddVoucher({ name, describe, date })
        if (response?.data.err === 0) {
            return { success: true, message: "Thành công" };
        }
        else if (response?.data.err === 1) {
            return { success: false, message: "Mã giảm giá đã tồn tại" };
        }
        else if (response?.data.err === 2) {
            return { success: false, message: "Chưa nhập đủ thông tin" };
        }
    }
    catch (error) {
        return { success: false, message: "Mã giảm giá đã tồn tại", err: error };
    }
}

export const loadvoucher = (page, voucher) => async () => {
    console.log(voucher,page)
    const data = await apiLoadVoucher({ page, voucher })
    return data
}



export const deletevoucher = (id) => async () => {
    const response = await apiDeleteVoucher({ id })
    return response
}

export const altervoucher = (id, fname, fdescribe, fdate) => async () => {
    const response = await apiAlterVoucher({ id, fname, fdescribe, fdate })
    return response
}