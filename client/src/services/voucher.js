import axiosConfig from '../axiosConfig'

export const apiLoadVoucher = async ({ page, voucher }) => {
    try {
        console.log(page)
        const response = await axiosConfig({
            method: 'post',
            url: '/api/loadvoucher',
            data: { page, voucher }
        })
        return response
    }
    catch (error) {
        console.log(error)
    }
}

export const apiAddVoucher = async ({ name, describe, date }) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/addvoucher',
            data: { name, describe, date }
        })
        return response
    }
    catch (error) {
        if (error.response) {
            console.error('Lỗi server:', error.response.data);
        } else {
            console.error('Lỗi khác:', error.message);
        }
    }
}


export const apiDeleteVoucher = async ({ id }) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/deletevoucher',
            data: { id }
        })

        return response
    }

    catch (error) {
        console.log(error)
        return ({ err: error, success: false })
    }
}

export const apiAlterVoucher = async ({ id, fname, fdescribe, fdate }) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/altervoucher',
            data: { id, fname, fdescribe, fdate }
        })
        return response
    }
    catch (error) {
        console.log(error)
        return ({ success: false, err: error })
    }
}