const Cart = require('../Model/cart');
require('dotenv').config()

export const loadOrder = async ({ page = 1, user, limit = 7 }) => {
    try {
        if (page > 0) {
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
        }
        else if (page === -1) {
            const list = await Cart.find({ Account: user })
                .sort({ createdAt: -1 })

            return {
                success: true,
                list: list,
            };
        }
        else if (page === -2) {
            // Lấy ngày hiện tại và ngày đầu tháng
            const now = new Date();
            const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1); // Ngày đầu tháng
            const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59); // Ngày cuối tháng

            // Thực hiện đồng thời cả ba phép toán: đếm Cart, tính tổng số lượng sản phẩm và tính tổng `Total`
            const [cartCount, totalAmountResult, totalPriceResult] = await Promise.all([
                Cart.countDocuments({
                    createdAt: { $gte: firstDayOfMonth, $lt: lastDayOfMonth }  // Chỉ tính các Cart trong tháng này
                }),
                Cart.aggregate([  // Tính tổng số lượng sản phẩm (amount)
                    {
                        $match: {
                            createdAt: { $gte: firstDayOfMonth, $lt: lastDayOfMonth }  // Chỉ tính các Cart trong tháng này
                        }
                    },
                    { $unwind: "$Items" },  // Tách các phần tử trong mảng Items
                    { $group: { _id: null, totalAmount: { $sum: "$Items.amount" } } }  // Tính tổng amount
                ]),
                Cart.aggregate([  // Tính tổng Total
                    {
                        $match: {
                            createdAt: { $gte: firstDayOfMonth, $lt: lastDayOfMonth }  // Chỉ tính các Cart trong tháng này
                        }
                    },
                    { $group: { _id: null, totalPrice: { $sum: "$Total" } } }  // Tính tổng Total
                ])
            ]);

            const topProducts = await Cart.aggregate([
                {
                    $unwind: "$Items"  // Tách các phần tử trong mảng Items
                },
                {
                    $group: {
                        _id: "$Items.productId",  // Nhóm theo productId
                        totalAmount: { $sum: "$Items.amount" },  // Tính tổng amount của từng sản phẩm
                        name: { $first: "$Items.name" },  // Lấy tên của sản phẩm
                        price: { $first: "$Items.price" },  // Lấy giá của sản phẩm
                        priceSale: { $first: "$Items.priceSale" },  // Lấy giá giảm (nếu có)
                        productType: { $first: "$Items.productType" },  // Lấy loại sản phẩm
                        describe: { $first: "$Items.describe" },  // Lấy mô tả sản phẩm
                        image: { $first: "$Items.image" }  // Lấy ảnh sản phẩm
                    }
                },
                {
                    $sort: { totalAmount: -1 }  // Sắp xếp theo tổng amount giảm dần
                },
                {
                    $limit: 10  // Lấy 10 sản phẩm
                },
                {
                    $project: {  // Thêm cột sum vào kết quả
                        _id: 0,  // Bỏ qua _id mặc định
                        productId: "$_id",  // Đặt lại productId
                        name: 1,
                        productType: 1,
                        describe: 1,
                        image: 1,
                        price: 1,
                        priceSale: 1,
                        totalAmount: 1,  // Cột tổng amount
                        sum: { $multiply: ["$totalAmount", { $ifNull: ["$priceSale", "$price"] }] }  // Tính tổng tiền (tổng amount * giá giảm hoặc giá gốc)
                    }
                }
            ]);


            // Lấy tổng số lượng sản phẩm từ kết quả aggregate
            const totalAmount = totalAmountResult.length > 0 ? totalAmountResult[0].totalAmount : 0;

            // Lấy tổng số tiền từ kết quả aggregate
            const totalPrice = totalPriceResult.length > 0 ? totalPriceResult[0].totalPrice : 0;

            return {
                success: true,
                cartCount: cartCount,
                totalAmount: totalAmount,
                totalPrice: totalPrice,
                topProducts: topProducts
            }
        }

    } catch (error) {
        console.log(error)
        return {
            success: false,
            err: 3,
            msg: error.message || 'Lỗi không xác định',
        };
    }
};


export const done = async ({ _id }) => {
    try {
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
        if (donee) {
            return { success: true };
        }
        return { success: true, msg: 'Khong sua duoc' };

    }
    catch (error) {
        return { success: false, msg: error }
    }
}