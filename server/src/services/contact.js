import { response } from 'express';
import { ContactModel } from '../Model/contact';
import { ObjectId } from 'mongodb';
require('dotenv').config()

export const upContact = async ({ hoten, email, mess }) => {
    try {
        const newProductType = new ContactModel({ Name: hoten, Email: email, Thongtin: mess });
        await newProductType.save();
        return { success: true, err: 0, msg: 'Gửi thành công' };
    }
    catch (error) {
        return { success: false, err: 3, msg: error.message || 'Lỗi không xác định' };
    }
}


export const loadContact = async ({page = 1, limit = 7}) => {
    try {
        // Tính toán số lượng tài liệu cần bỏ qua dựa trên số trang
        const skip = (page - 1) * limit;

        // Tìm danh sách liên hệ và sắp xếp theo điều kiện
        const list = await ContactModel.find({})
            .sort({ isRead: 1, createdAt: -1 }) // Sắp xếp isRead (false trước) và createdAt (mới nhất trước)
            .skip(skip) // Bỏ qua số lượng đối tượng theo trang
            .limit(limit); // Giới hạn số lượng kết quả trả về

        // Trả về danh sách kèm thông tin phân trang
        const totalContacts = await ContactModel.countDocuments(); // Tổng số tài liệu
        const totalPages = Math.ceil(totalContacts / limit);

        return {
            success: true,
            list: list,
            totalPages: totalPages
        };
    } catch (error) {
        return {
            success: false,
            err: 3,
            msg: error.message || 'Lỗi không xác định',
        };
    }
};


export const readContact = async ({_id}) =>{
  try{
    const readed = await ContactModel.findOneAndUpdate(
      {
          _id: _id
      },
      {
          isRead: true,
      },
      {
          new: true,                       
          runValidators: true              
      });
      if(readed){
        return { success: true };
      }
      return { success: true, msg: 'Khong sua duoc' };
  
  }
  catch(error){
    return{success: false, msg: error}
  }
}