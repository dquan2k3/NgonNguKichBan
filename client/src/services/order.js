
import axiosConfig from '../axiosConfig'



export const apiLoadOrder = async ({page, user}) => {
  try {
    const response = await axiosConfig({
      method: 'post',
      url: '/api/loadOrder',
      data: {page, user}
    })
    return response
  }
  catch (error) {
    console.log(error)
  }
}

export const apiDone = async ({_id}) => {
  try {
    console.log(_id)
    const response = await axiosConfig({
      method: 'post',
      url: '/api/done',
      data: {_id}
    })
    return response
  }
  catch (error) {
    console.log(error)
  }
}
