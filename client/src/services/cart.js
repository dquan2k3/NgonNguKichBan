
import axiosConfig from '../axiosConfig'



export const apiGetCart = async (id) => {
  try {
    const response = await axiosConfig({
      method: 'get',
      url: '/api/getcart',
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })
    return response
  }
  catch(error){
    console.log(error)
  }
}
export const apiAddToCart = async (product) => {
  try {
    const response = await axiosConfig({
      method: 'post', 
      url: '/api/addcart', 
      headers: {
        'Content-Type': 'application/json', 
      },
      data: { product },
      withCredentials: true,  
    });
    return response; 
  } catch (error) {
    console.log(error); 
  }
};

export const apiRemoveCart = async (id) => {
  try {
    const response = await axiosConfig({
      method: 'delete', 
      url: `/api/removeCart/${id}`, 
      headers: {
        'Content-Type': 'application/json', 
      },
      withCredentials: true,  
    });
    console.log(response)
    return response; 
  } catch (error) {
    console.log(error); 
  }
};

export const apiCod = async(user, address, keyy) => {
  try {
    const response = await axiosConfig({
      method: 'post', 
      url: `/api/cod`, 
      headers: {
        'Content-Type': 'application/json', 
      },
      data: {user, address, keyy},
      withCredentials: true,  
    });
    console.log(response)
    return response; 
  } catch (error) {
    console.log(error); 
  }
}

