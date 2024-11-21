import axiosConfig from '../axiosConfig'

export const apiRegister = (payload) => new Promise(async(resolve, reject) =>{
    try{
        const response = await axiosConfig({
            method: 'post',
            url: '/api/register',
            data: payload
        })
        resolve(response)
    }
    catch (error) {
        if (error.response) {
          console.error('Lỗi server:', error.response.data);
        } else {
          console.error('Lỗi khác:', error.message);
        }
      }
})

export const apiLogin = (payload) => new Promise(async(resolve, reject) =>{
  try{
      const response = await axiosConfig({
          method: 'post',
          url: '/api/login',
          data: payload
      })
      resolve(response)
  }
  catch (error) {
      if (error.response) {
        console.error('Lỗi server:', error.response.data);
      } else {
        console.error('Lỗi khác:', error.message);
      }
    }
})