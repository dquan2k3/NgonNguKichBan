import { ProductModel } from '../Model/product';
import { ObjectId } from 'mongodb';
require('dotenv').config()
const crypto = require('crypto');
const cloudinary = require('../config/cloudinaryConfig')
const streamifier = require('streamifier');

export const loadProduct = async () => {
  try {
    const list = await ProductModel.find({});
    return { success: true, list: list };
  }
  catch (error) {
    return { success: false, err: 3, msg: error.message || 'Lỗi không xác định' };
  }
}

export const loadProductdetail = async (id) => {
  try {
    const product = await ProductModel.findOne({ _id: new ObjectId(id) })
    return { success: true, product: product };
  }
  catch (error) {
    console.log(error)
    return { success: false, err: 3, msg: error.message || 'Lỗi không xác định' };
  }
}

export const loadRandomProduct = async () => {
  try {
    const list = await ProductModel.aggregate([
      { $sample: { size: 3 } }
    ]);
    return { success: true, list: list };
  }
  catch (error) {
    return { success: false, err: 3, msg: error.message || 'Lỗi không xác định' };
  }
}


export const addProduct = async ({ name, productType, describe, price, priceSale, quantity, imagep }) => {
  try {
    // Kiểm tra sản phẩm có tồn tại không
    const existingProduct = await ProductModel.findOne({ Name: name });

    if (existingProduct) {
      return { success: false, err: 1, msg: 'Đã tồn tại' };
    }

    // Tạo random publicId cho ảnh
    const randomPublicId = crypto.randomBytes(16).toString('hex');

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'image',
          public_id: randomPublicId,
          transformation: [
            {
              quality: 'auto',
              fetch_format: 'auto',
            },
            {
              width: 625,
              height: 475,
              crop: 'fill',
            },
          ],
        },
        async (error, uploadResult) => {
          if (error) {
            console.log('Upload error:', error.message);
            return reject({ success: false, msg: error.message });
          }

          const url = uploadResult.secure_url;
          console.log('Uploaded file URL:', url);

          try {
            const newProduct = new ProductModel({ Name: name, ProductType: productType, Describe: describe, Price: price, PriceSale: priceSale, Quantity: quantity, Image: url, CloudId: randomPublicId });
            await newProduct.save();
            resolve({ success: true, msg: 'Thêm sản phẩm thành công' });
          } catch (dbError) {
            console.error('Database error:', dbError.message);
            reject({ success: false, msg: 'Database update failed' });
          }
        }
      );

      // Pipe buffer vào stream
      streamifier.createReadStream(imagep.buffer).pipe(uploadStream);
    });

    return result; // Trả về kết quả khi Promise hoàn tất
  } catch (error) {
    return { success: false, err: 3, msg: error.message || error };
  }
};

export const alterProduct = async ({ id, fname, fproductType, fdescribe, fprice, fpriceSale, fquantity, fimagep }) => {
  try {
    const product = await ProductModel.findOne({ _id: id })
    if (product.Name != fname) {
      const existingProduct = await ProductModel.findOne({ Name: fname });
      if (existingProduct) {
        return { success: false, err: 1, msg: 'Tên sản phẩm đã tồn tại' };
      }
    }
    const cloudId = product.CloudId
    const randomPublicId = crypto.randomBytes(16).toString('hex');
    const updatedCloudId = cloudId || randomPublicId;
    if (fimagep) {
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: 'image',
            public_id: updatedCloudId,
            transformation: [
              {
                quality: 'auto',
                fetch_format: 'auto',
              },
              {
                width: 625,
                height: 475,
                crop: 'fill',
              },
            ],
          },
          async (error, uploadResult) => {
            if (error) {
              console.log('Upload error:', error.message);
              return reject({ success: false, msg: error.message });
            }

            const url = uploadResult.secure_url;
            console.log('Uploaded file URL:', url);
            try {
              await ProductModel.findOneAndUpdate(
                { _id: id },
                { Name: fname, ProductType: fproductType, Describe: fdescribe, Price: fprice, PriceSale: fpriceSale, Quantity: fquantity, Image: url, CloudId: updatedCloudId },
                {
                  new: true,
                  runValidators: true,
                }
              );
              resolve({ success: true, msg: 'Sửa sản phẩm thành công' });
            } catch (dbError) {
              console.error('Database error:', dbError.message);
              reject({ success: false, msg: 'Database update failed' });
            }
          }
        );

        // Pipe buffer vào stream
        streamifier.createReadStream(fimagep.buffer).pipe(uploadStream);
      });
      return result;
    }
    else {
      try {
        await ProductModel.findOneAndUpdate(
          { _id: id },
          { Name: fname, ProductType: fproductType, Describe: fdescribe, Price: fprice, PriceSale: fpriceSale, Quantity: fquantity },
          {
            new: true,
            runValidators: true,
          }
        );
        return { success: true, msg: 'Sửa sản phẩm thành công' };
      } catch (dbError) {
        console.error('Database error:', dbError.message);
        return { success: false, msg: 'Database update failed' };
      }
    }


  }
  catch (error) {
    console.log(fimagep)
    console.log(error)
    return { success: false, id, msg: error }
  }
}

export const deleteProduct = async ({ id }) => {
  try {
    const toDelete = await ProductModel.findOne({ _id: new ObjectId(id) });
    if (toDelete) {
      const response = await ProductModel.findOneAndDelete({ _id: new ObjectId(id) })

      if (response) return { success: true }
    }

    return { success: false }
  }
  catch (error) {
    console.log(error)
    return { success: false, err: 3, msg: error.message || 'Lỗi không xác định' };
  }
}

export const test = async () => {
  console.log("services ok")
}

export const renderHotProduct = async () => {
  try {
    const products = await ProductModel.find({})
      .sort({ createdAt: -1 }) // Sắp xếp theo thứ tự giảm dần (mới nhất trước)
      .limit(8); // Lấy tối đa 8 kết quả
    return { success: true, hotproducts: products };
  } catch (error) {
    console.error('Error fetching hot products:', error);
    return { success: false, error: error.message }; // Trả về thông tin lỗi
  }
};

export const renderSaleProduct = async () => {
  try {
    const products = await ProductModel.find({
      $expr: { $lt: ["$PriceSale", "$Price"] } // So sánh pricesale < price
    });

    return { success: true, saleproducts: products };
  } catch (error) {
    console.error('Error fetching discounted products:', error);
    return { success: false, error: error.message };
  }
}
