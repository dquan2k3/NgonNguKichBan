import axiosConfig from '../axiosConfig'



export const apiUploadBanner = async ({formData}) => {
  try {
   
    const response = await axiosConfig({
      method: 'post',
      url: '/api/UploadBanner',
      data: formData
    })
    return response
  }
  catch(error){
    console.log(error)
  }
}

export const apiUploadBannershop = async ({formData}) => {
  try {
   
    const response = await axiosConfig({
      method: 'post',
      url: '/api/UploadBannershop',
      data: formData
    })
    return response
  }
  catch(error){
    console.log(error)
  }
}

export const apiLoadBanner = async () => {
  try {
    const response = await axiosConfig({
      method: 'post',
      url: '/api/loadBanner'
    })
    return response
  }
  catch(error){
    console.log(error)
  }
}

export const apiLoadBannershop = async () => {
  try {
    const response = await axiosConfig({
      method: 'post',
      url: '/api/loadBannershop'
    })
    return response
  }
  catch(error){
    console.log(error)
  }
}


export const apiUploadBannerhome = async ({formData}) => {
  try {
   
    const response = await axiosConfig({
      method: 'post',
      url: '/api/UploadBannerhome',
      data: formData
    })
    return response
  }
  catch(error){
    console.log(error)
  }
}


export const apiLoadBannerhome = async () => {
  try {
    const response = await axiosConfig({
      method: 'post',
      url: '/api/loadBannerhome'
    })
    return response
  }
  catch(error){
    console.log(error)
  }
}

export const apiDeletebannerhome = async (publicId) => {
  try {
    const response = await axiosConfig({
      method: 'post',
      url: '/api/deleteBannerhome',
      data: publicId
    })
    return response
  }
  catch(error){
    console.log(error)
  }
}

export const apiAlterbannerhome = async ({formData}) => {
  try {
    const response = await axiosConfig({
      method: 'post',
      url: '/api/alterBannerhome',
      data: formData
    })
    return response
  }
  catch(error){
    console.log(error)
  }
}