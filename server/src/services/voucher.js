import { ObjectId } from 'mongodb';
import { VoucherModel } from '../Model/voucher';
require('dotenv').config()

export const loadvoucher = async ({ page = -1, voucher = '', limit = 9 }) => {
    try {
        if (page != -1) {
            const skip = (page - 1) * limit;

            // Sử dụng aggregate để lấy danh sách và chỉ trả ngày
            const list = await VoucherModel.aggregate([
                { $sort: { createdAt: -1 } },
                { $skip: skip },
                { $limit: limit },
                {
                    $project: {
                        Name: 1,
                        Phantram: 1,
                        Date: { $dateToString: { format: "%Y-%m-%d", date: "$Date" } },
                    },
                },
            ]);

            const totalContacts = await VoucherModel.countDocuments();
            const totalPages = Math.ceil(totalContacts / limit);

            return { success: true, list: list, totalPages: totalPages };
        }
        else {
            const result = await VoucherModel.findOne({ Name: voucher });
            if (result) {
                // Lấy ngày mà không có giờ
                const dateWithoutTime = result.Date.toISOString().split('T')[0]; // Lấy phần ngày trước 'T'
                return { success: true, list: { ...result.toObject(), Date: dateWithoutTime } };
            } else {
                return { success: true, msg: "Không tìm thấy voucher với tên này." };
            }
        }

    } catch (error) {
        return { success: false, err: 3, msg: error.message || 'Lỗi không xác định' };
    }
};


export const addvoucher = async ({ name, describe, date }) => {
    try {
        const existingProductType = await VoucherModel.findOne({ Name: name });

        if (existingProductType) {
            return { success: false, err: 1, msg: 'Đã tồn tại' };
        }

        const newVoucher = new VoucherModel({ Name: name, Phantram: describe, Date: date });
        await newVoucher.save();
        return { success: true, err: 0, msg: 'Thêm voucher thành công' };
    } catch (error) {
        return { success: false, err: 3, msg: error.message || error };
    }
};


export const deletevoucher = async ({ id }) => {
    try {
        const toDelete = await VoucherModel.findOne({ _id: new ObjectId(id) });
        if (toDelete) {
            const response = await VoucherModel.findOneAndDelete({ _id: new ObjectId(id) })

            if (response) return { success: true }
        }

        return { success: false }
    }
    catch (error) {
        console.log(error)
        return { success: false, err: 3, msg: error.message || 'Lỗi không xác định' };
    }
}

export const altervoucher = async ({ id, fname, fdescribe, fdate }) => {
    try {
        const user = await VoucherModel.findOneAndUpdate(
            {
                _id: id
            },
            {
                Name: fname,
                Phantram: fdescribe,
                Date: fdate
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