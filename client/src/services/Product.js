import axiosConfig from '../axiosConfig'



export const apiLoadProduct = async ({page, limit, typeselect, sapxep, minPrice, maxPrice, name}) => {
  try {
    const response = await axiosConfig({
      method: 'post',
      url: '/api/loadProduct',
      data: {page, limit, typeselect, sapxep, minPrice, maxPrice, name}
    })
    return response
  }
  catch(error){
    console.log(error)
  }
}

export const apiLoadRandomProduct = async (id) => {
  try {
    const response = await axiosConfig({
      method: 'post',
      url: '/api/loadRandomProduct'
    })
    return response
  }
  catch(error){
    console.log(error)
  }
}

export const apiLoadProductDetail = async (formData) => {
  try {
    const response = await axiosConfig({
      method: 'post',
      url: '/api/loadProductDetail',
      data: formData
    })
    return response
  }
  catch(error){
    console.log(error)
  }
}

export const apiAddProduct = async ({ formData }) => {
  try {
    const response = await axiosConfig({
      method: 'post',
      url: '/api/addProduct',
      data: formData
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


export const apiDeleteProduct = async ({id}) => {
  try{
    const response = await axiosConfig({
      method: 'post',
      url: '/api/deleteProduct',
      data: {id}
    })

    return response
  }

  catch(error){
    console.log(error)
    return ({err: error, success: false})
  }
}

export const apiAlterProduct = async ({ formData }) => {
  try{
    const response = await axiosConfig({
      method:'post',
      url: '/api/alterProduct',
      data: formData 
    })
    return response
  }
  catch(error){
    console.log(error)
    return({success: false, err:error})
  }
}

export const apiRenderHotProduct = async () => {
  try{
    const response = await axiosConfig({
      method:'post',
      url: '/api/renderHotProduct'
    })
    return response
  }
  catch(error){
    console.log(error)
    return({success: false, err:error})
  }
}

export const apiRenderSaleProduct = async () => {
  try{
    const response = await axiosConfig({
      method:'post',
      url: '/api/renderSaleProduct'
    })
    return response
  }
  catch(error){
    console.log(error)
    return({success: false, err:error})
  }
}

export const apiRate = async ({rate, detail, user, id}) => {
  try {
    const response = await axiosConfig({
      method: 'post',
      url: '/api/rate',
      data: {rate, detail, user, id}
    })
    return response
  }
  catch(error){
    console.log(error)
  }
}

export const apiLoadRate = async ({id}) => {
  try {
    const response = await axiosConfig({
      method: 'post',
      url: '/api/loadrate',
      data: {id}
    })
    return response
  }
  catch(error){
    console.log(error)
  }
}

export const apiWish = async ({user, id, unwish}) => {
  try {
    const response = await axiosConfig({
      method: 'post',
      url: '/api/addwish',
      data: {user, id, unwish}
    })
    return response
  }
  catch(error){
    console.log(error)
  }
}

export const apiCheckWish = async ({user, id}) => {
  try {
    const response = await axiosConfig({
      method: 'post',
      url: '/api/checkwish',
      data: {user, id}
    })
    return response
  }
  catch(error){
    console.log(error)
  }
}

export const apiLoadWish = async ({user}) => {
  try {
    const response = await axiosConfig({
      method: 'post',
      url: '/api/loadwish',
      data: {user}
    })
    return response
  }
  catch(error){
    console.log(error)
  }
}

export const apiLoadProductByWish = async ({wis}) => {
  try {
    const response = await axiosConfig({
      method: 'post',
      url: '/api/loadproductbywish',
      data: {wis}
    })
    return response
  }
  catch(error){
    console.log(error)
  }
}