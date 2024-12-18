const Cart = require('../Model/cart');
require('dotenv').config()

export const loadOrder = async ({page = 1, limit = 7}) => {
    try {
        const skip = (page - 1) * limit;
        const list = await Cart.find({})
            .sort({ createdAt: -1 }) 
            .skip(skip) 
            .limit(limit); 

        const totalContacts = await Cart.countDocuments(); 
        const totalPages = Math.ceil(totalContacts / limit);

        return {
            success: true,
            list: list,
            totalPages: totalPages
        };
    } catch (error) {
        console.log(error)
        return {
            success: false,
            err: 3,
            msg: error.message || 'Lỗi không xác định',
        };
    }
};


export const done = async ({_id}) =>{
  try{
    console.log(_id)
    const donee = await Cart.findOneAndUpdate(
      {
          _id: _id
      },
      {
          isDone: true,
      },
      {
          new: true,                       
          runValidators: true              
      });
      if(donee){
        return { success: true };
      }
      return { success: true, msg: 'Khong sua duoc' };
  
  }
  catch(error){
    return{success: false, msg: error}
  }
}