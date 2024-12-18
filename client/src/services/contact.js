
import axiosConfig from '../axiosConfig'



export const apiLoadContact = async ({page}) => {
  try {
    const response = await axiosConfig({
      method: 'post',
      url: '/api/loadContact',
      data: {page}
    })
    return response
  }
  catch (error) {
    console.log(error)
  }
}

export const apiReadContact = async ({_id}) => {
  try {
    const response = await axiosConfig({
      method: 'post',
      url: '/api/readContact',
      data: {_id}
    })
    return response
  }
  catch (error) {
    console.log(error)
  }
}