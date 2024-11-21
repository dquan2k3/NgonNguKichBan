import axiosConfig from '../axiosConfig'



export const apiLoadProductType = async () => {
  try {
    const response = await axiosConfig({
      method: 'post',
      url: '/api/loadProductType'
    })
    return response
  }
  catch(error){
    console.log(error)
  }
}

export const apiAddProductType = async ({ name, describe }) => {
  try {
    const response = await axiosConfig({
      method: 'post',
      url: '/api/addProductType',
      data: { name, describe }
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


export const apiDeleteProductType = async ({id}) => {
  try{
    const response = await axiosConfig({
      method: 'post',
      url: '/api/deleteProductType',
      data: {id}
    })

    return response
  }

  catch(error){
    console.log(error)
    return ({err: error, success: false})
  }
}

export const apiAlterProductType = async ({id, fname, fdescribe}) => {
  try{
    const response = await axiosConfig({
      method:'post',
      url: '/api/alterProductType',
      data: {id, fname, fdescribe}
    })
    return response
  }
  catch(error){
    console.log(error)
    return({success: false, err:error})
  }
}