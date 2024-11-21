import { apiAlterbannerhome, apiDeletebannerhome, apiLoadBanner, apiLoadBannerhome, apiLoadBannershop, apiUploadBanner, apiUploadBannerhome, apiUploadBannershop } from "../../services/setting";

export const uploadBanner = ({ formData }) => async () => {
    const data = await apiUploadBanner({ formData })
    return data
}

export const loadBanner = () => async () => {
    const data = await apiLoadBanner()
    return data
}

export const uploadBannershop = ({ formData }) => async () => {
    const data = await apiUploadBannershop({ formData })
    return data
}

export const loadBannershop = () => async () => {
    const data = await apiLoadBannershop()
    return data
}

export const uploadBannerhome = ({ formData }) => async () => {
    const data = await apiUploadBannerhome({ formData })
    return data
}

export const loadBannerhome = () => async () => {
    const data = await apiLoadBannerhome()
    return data
}

export const deleteBannerhome = ({ publicId }) => async () => {
    const data = await apiDeletebannerhome({ publicId })
    return data
}

export const alterBannerhome = ({ formData }) => async () => {
    const data = await apiAlterbannerhome({ formData })
    return data
}