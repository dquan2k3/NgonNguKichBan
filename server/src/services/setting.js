require('dotenv').config()
const cloudinary = require('../config/cloudinaryConfig')
const streamifier = require('streamifier');
import { SettingModel } from '../Model/setting';
const crypto = require('crypto');

export const loadBanner = async () => {
    try {
        const existingProduct = await SettingModel.findOne({ Type: 'AboutUs' });
        if (existingProduct) {
            return ({ success: true, Url: existingProduct.Url })
        }
        else {
            return ({ success: false, msg: 'https://res.cloudinary.com/dwlsi7aau/image/upload/v1731775452/ojyx1doh5yyxuxi8cfaa.jpg', err: 'Chưa thêm banner' })
        }
    }
    catch (error) {
        return ({ success: false, msg: 'https://res.cloudinary.com/dwlsi7aau/image/upload/v1731775452/ojyx1doh5yyxuxi8cfaa.jpg', err: error })
    }

}

export const loadBannershop = async () => {
    try {
        const existingProduct = await SettingModel.findOne({ Type: 'Shop' });
        if (existingProduct) {
            return ({ success: true, Url: existingProduct.Url })
        }
        else {
            return ({ success: false, msg: 'https://res.cloudinary.com/dwlsi7aau/image/upload/v1731775452/ojyx1doh5yyxuxi8cfaa.jpg', err: 'Chưa thêm banner' })
        }
    }
    catch (error) {
        return ({ success: false, msg: 'https://res.cloudinary.com/dwlsi7aau/image/upload/v1731775452/ojyx1doh5yyxuxi8cfaa.jpg', err: error })
    }

}

export const UploadBanner = async ({ file }) => {
    try {
        console.log(file);

        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    resource_type: 'image',
                    public_id: 'AboutUs',
                    transformation: [
                        {
                            quality: 'auto',
                            fetch_format: 'auto',
                        },
                        {
                            width: 1200,
                            height: 900,
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
                        const existingProduct = await SettingModel.findOne({ Type: 'AboutUs' });
                        if (!existingProduct) {
                            const newAb = new SettingModel({ Type: 'AboutUs', Url: url });
                            await newAb.save();
                        } else {
                            await SettingModel.findOneAndUpdate(
                                { Type: 'AboutUs' },
                                { Url: url },
                                {
                                    new: true,
                                    runValidators: true,
                                }
                            );
                        }

                        resolve({ success: true, Url: url });
                    } catch (dbError) {
                        console.error('Database error:', dbError.message);
                        reject({ success: false, msg: 'Database update failed' });
                    }
                }
            );

            // Pipe buffer vào stream
            streamifier.createReadStream(file.buffer).pipe(uploadStream);
        });

        return result;
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        return { success: false, msg: error.msg || 'Unknown error' };
    }
};

export const UploadBannershop = async ({ file }) => {
    try {
        console.log(file);

        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    resource_type: 'image',
                    public_id: 'Shop',
                    transformation: [
                        {
                            quality: 'auto',
                            fetch_format: 'auto',
                        },
                        {
                            width: 1900,
                            height: 450,
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
                    console.log('here')
                    try {
                        const existingProduct = await SettingModel.findOne({ Type: 'Shop' });
                        if (!existingProduct) {
                            const newAb = new SettingModel({ Type: 'Shop', Url: url });
                            await newAb.save();
                        } else {
                            await SettingModel.findOneAndUpdate(
                                { Type: 'Shop' },
                                { Url: url },
                                {
                                    new: true,
                                    runValidators: true,
                                }
                            );
                        }

                        resolve({ success: true, Url: url });
                    } catch (dbError) {
                        console.error('Database error:', dbError.message);
                        reject({ success: false, msg: 'Database update failed' });
                    }
                }
            );

            // Pipe buffer vào stream
            streamifier.createReadStream(file.buffer).pipe(uploadStream);
        });

        return result;
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        return { success: false, msg: error.msg || 'Unknown error' };
    }
};


export const UploadBannerhome = async ({ file }) => {
    try {
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
                            width: 1100,
                            height: 620,
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
                        const newAb = new SettingModel({ Type: 'Home', CloudId: randomPublicId, Url: url });
                        await newAb.save();
                        resolve({ success: true, Url: url });
                    } catch (dbError) {
                        console.error('Database error:', dbError.message);
                        reject({ success: false, msg: 'Database update failed' });
                    }
                }
            );

            // Pipe buffer vào stream
            streamifier.createReadStream(file.buffer).pipe(uploadStream);
        });

        return result;
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        return { success: false, msg: error.msg || 'Unknown error' };
    }
};

export const loadBannerhome = async () =>{
    try {
        const list = await SettingModel.find({ Type: 'Home' });
        return {success: true, list: list};
    }
    catch(error){
        return { success: false, err: 3, msg: error.message || 'Lỗi không xác định' };
    }
}

export const deleteBannerhome = async ({ publicId }) => {
    try {
        const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.destroy(publicId, (error, result) => {
                if (error) {
                    reject({ success: false, err: 3, msg: error.message });
                } else {
                    resolve(result);
                }
            });
        });

        // Sau khi xóa thành công trên Cloudinary
        const toDelete = await SettingModel.findOne({ CloudId: publicId });
        if (toDelete) {
            await SettingModel.findOneAndDelete({ CloudId: publicId });
            return { success: true, msg: 'Xóa thành công' };
        }

        return { success: false, err: 3, msg: 'Không tìm thấy bản ghi trong DB' };
    } catch (error) {
        return { success: false, err: 3, msg: error.message || 'Lỗi không xác định' };
    }
};

export const alterBannerhome = async ({ file, id, publicId }) => {
    try {
        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    resource_type: 'image',
                    public_id: publicId,
                    transformation: [
                        {
                            quality: 'auto',
                            fetch_format: 'auto',
                        },
                        {
                            width: 1100,
                            height: 620,
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
                        // Tìm kiếm bản ghi trong cơ sở dữ liệu
                        const toAlter = await SettingModel.findOne({ _id: id, CloudId: publicId });
                        
                        // Nếu không tìm thấy bản ghi trong cơ sở dữ liệu
                        if (!toAlter) {
                            return reject({ success: false, err: 3, msg: 'Không tìm thấy bản ghi trong DB' });
                        }

                        // Nếu tìm thấy, thực hiện cập nhật URL mới
                        await SettingModel.findOneAndUpdate(
                            { _id: id, CloudId: publicId },
                            { Url: url },
                            {
                                new: true,
                                runValidators: true,
                            }
                        );
                        resolve({ success: true, Url: url });
                    } catch (dbError) {
                        console.error('Database error:', dbError.message);
                        reject({ success: false, msg: 'Database update failed' });
                    }
                }
            );

            // Pipe buffer vào stream
            streamifier.createReadStream(file.buffer).pipe(uploadStream);
        });

        // Không bao giờ đến dòng này nếu đoạn mã trên thành công
        return result; // Nếu thành công, trả về kết quả từ Promise
    } catch (error) {
        return { success: false, err: 3, msg: error.message || 'Lỗi không xác định' };
    }
};

