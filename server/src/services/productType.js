import { response } from 'express';
import { ProductTypeModel } from '../Model/ProductType';
import { ObjectId } from 'mongodb';
require('dotenv').config()

export const loadProductType = async ({ page = 1, limit = 9 }) => {
  try {
    const skip = (page - 1) * limit;
    const list = await ProductTypeModel.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    const totalContacts = await ProductTypeModel.countDocuments();
    const totalPages = Math.ceil(totalContacts / limit);
    return { success: true, list: list, totalPages: totalPages };
  }
  catch (error) {
    return { success: false, err: 3, msg: error.message || 'Lỗi không xác định' };
  }
}


export const addProductType = async ({ name, describe }) => {
  try {
    const existingProductType = await ProductTypeModel.findOne({ Name: name });

    if (existingProductType) {
      return { success: false, err: 1, msg: 'Đã tồn tại' };
    }

    const newProductType = new ProductTypeModel({ Name: name, Describe: describe });
    await newProductType.save();
    return { success: true, err: 0, msg: 'Thêm sản phẩm thành công' };
  } catch (error) {
    return { success: false, err: 3, msg: error.message || error };
  }
};

export const deleteProductType = async ({ id }) => {
  try {
    const toDelete = await ProductTypeModel.findOne({ _id: new ObjectId(id) });
    if (toDelete) {
      const response = await ProductTypeModel.findOneAndDelete({ _id: new ObjectId(id) })

      if (response) return { success: true }
    }

    return { success: false }
  }
  catch (error) {
    console.log(error)
    return { success: false, err: 3, msg: error.message || 'Lỗi không xác định' };
  }
}

export const alterProductType = async ({ id, fname, fdescribe }) => {
  try {
    const user = await ProductTypeModel.findOneAndUpdate(
      {
        _id: id
      },
      {
        Name: fname,
        Describe: fdescribe
      },
      {
        new: true,
        runValidators: true
      });
    if (user) {
      return { success: true, id: id, msg: user };
    }
    return { success: true, id: id, msg: 'Khong sua duoc' };

  }
  catch (error) {
    return { success: false, id, msg: error }
  }
}