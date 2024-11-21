import React from "react";
import Header from './THeader';
import BHeader from './BHeader';
import Footer from './Footer';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import * as actions from '../../store/actions'

const ProductDetails = () => {
    const dispatch = useDispatch()
    const [value, setValue] = useState(1)
    const [product, setProduct] = useState(null);
    const [errvalue, setErrvalue] = useState('')


    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get("id") || "673b6d8322b599b3178b3a26"

    const loadProduct = async (e) => {

        const formData = new FormData();
        formData.append('id', id);
        dispatch(actions.loadProductDetail(formData))
            .then((response) => {
                console.log(response)
                if (response.data.success) {
                    console.log(response.data.product)
                    setProduct(response.data.product)
                }
                else {
                    console.log('Loi')
                }
            });
    }

    const changeValue = async (change) => {
        const toChange = value + change
        if (toChange < 1) {
            setErrvalue('Số lượng sản phẩm không được nhỏ hơn 1')
            return
        }
        setErrvalue('')
        setValue(value + change)
    }

    const handleChange = async (e) => {
        const newValue = parseInt(e.currentTarget.value, 10);
        if (newValue < 1) {
            setErrvalue("Số lượng sản phẩm không được nhỏ hơn 1");
        } else {
            setErrvalue("");
            setValue(newValue);
        }
    }
    const handleLeavemouse = (e) => {
        const newValue = parseInt(e.currentTarget.value, 10);
        console.log('aaa')
        if (isNaN(newValue)) {

            setValue(1)
        }
    }

    useEffect(() => {
        loadProduct()
    }, [])
    return (
        <div>
            <Header />
            <BHeader />
            <div className="w-full h-auto flex items-center flex-col mt-[23px] space-y-1">
                <div className="w-[1100px] flex flex-col justify-center">
                    <div className="w-full flex justify-between">
                        <div className="flex-2">
                            <img className=" w-[625px] h-[475px]" src="https://th.bing.com/th/id/OIP.0xL1eyVKlVpbmwohqlW7gQHaE7?rs=1&pid=ImgDetMain"></img>
                        </div>
                        <div className="pl-0 lg:pl-6 flex-1">
                            {/* Title */}
                            <h4 className="text-2xl font-semibold text-gray-800 mb-4">
                                {product ? product.Name : ''}
                            </h4>

                            {/* Rating */}
                            <div className="flex items-center space-x-2 my-3">
                                <div className="text-yellow-500 flex">
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star-half-alt"></i>
                                    <i className="far fa-star"></i>
                                </div>
                                <span className="text-sm font-medium text-gray-600">(4.5)</span>
                                <span className="text-sm text-gray-500 ml-4">
                                    <i className="fas fa-shopping-basket"></i> {product ? product.Quantity : ''} sản phẩm còn lại
                                </span>
                            </div>

                            {/* Price */}
                            <div className="mb-4">
                                <span className="text-xl font-bold text-red-500">
                                    <span className="text-base">{product ? product.PriceSale : ''} đ</span>
                                </span>
                                <span className="text-sm text-gray-500 line-through ml-4">
                                    <span className="text-base">{product ? product.Price : ''} đ</span>
                                </span>
                                <span className="text-sm text-green-500 ml-2">(-16.67%)</span>
                            </div>

                            {/* Product Type */}
                            <div className="flex mb-4">
                                <p className="font-semibold">Loại sản phẩm:</p>
                                <p className="text-gray-700 pl-3">{product ? product.ProductType : ''}</p>
                            </div>

                            <hr className="my-4" />

                            {/* Add to Cart */}
                            <form className="space-y-5">
                                {/* Quantity Input */}
                                <div className="flex items-center space-x-2">
                                    <button
                                        type="button"
                                        onClick={() => changeValue(-1)}
                                        className="px-3 py-2 w-12 border rounded bg-gray-100 hover:bg-gray-200"
                                    >
                                        -
                                    </button>
                                    <input
                                        type='number'
                                        className="w-16 text-center border rounded"
                                        onChange={handleChange}
                                        onBlur={handleLeavemouse}
                                        value={value}
                                        max="20"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => changeValue(1)}
                                        className="px-3 py-2 w-12 border rounded bg-gray-100 hover:bg-gray-200"
                                    >
                                        +
                                    </button>
                                </div>

                                <p className="text-red-600">{errvalue}</p>

                                {/* Action Buttons */}
                                <div className="space-x-4">
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                    >
                                        Mua ngay
                                    </button>
                                    <button
                                        type="button"
                                        className="px-6 py-2 border rounded text-gray-700 hover:bg-gray-100"
                                    >
                                        <i className="fas fa-heart mr-2"></i> Save
                                    </button>
                                </div>
                            </form>

                            {/* Login Message */}
                            <div id="tbdangnhap" className="mt-4"></div>
                        </div>
                    </div>
                    <div className="w-full flex justify-between mt-10 gap-10">
                        <div className="border flex-1 rounded-2 px-3 bg-white shadow-md">
                            {/* Tabs Header */}
                            <div className="flex items-center border-b">
                                <div className="tab-item active px-4 py-2 border-b-2 border-blue-500 text-blue-500 cursor-pointer">
                                    Mô tả chi tiết
                                </div>
                                <div className="tab-item px-4 py-2 text-gray-500 cursor-pointer">
                                    Đánh giá của khách hàng
                                </div>
                            </div>

                            {/* Tabs Content */}
                            <div className="tab-content mt-4">
                                {/* Tab 1: Mô tả chi tiết */}
                                <div className="tab-pane active">
                                    <h2 className="text-xl font-semibold mb-2">Mô tả chi tiết</h2>
                                    <p className="text-gray-700">
                                        {product ? product.Describe : ''}
                                    </p>
                                </div>

                                {/* Tab 2: Đánh giá của khách hàng */}
                                <div className="tab-pane hidden">
                                    <form className="space-y-4">
                                        <h5 className="text-lg font-semibold mb-2">Đánh giá của bạn</h5>

                                        {/* Star Rating */}
                                        <div className="flex space-x-1">
                                            <input type="checkbox" id="star1" className="hidden" />
                                            <label htmlFor="star1" className="text-yellow-400 text-2xl cursor-pointer">
                                                ★
                                            </label>

                                            <input type="checkbox" id="star2" className="hidden" />
                                            <label htmlFor="star2" className="text-yellow-400 text-2xl cursor-pointer">
                                                ★
                                            </label>

                                            <input type="checkbox" id="star3" className="hidden" />
                                            <label htmlFor="star3" className="text-yellow-400 text-2xl cursor-pointer">
                                                ★
                                            </label>

                                            <input type="checkbox" id="star4" className="hidden" />
                                            <label htmlFor="star4" className="text-yellow-400 text-2xl cursor-pointer">
                                                ★
                                            </label>

                                            <input type="checkbox" id="star5" className="hidden" />
                                            <label htmlFor="star5" className="text-yellow-400 text-2xl cursor-pointer">
                                                ★
                                            </label>
                                        </div>

                                        {/* Review Input */}
                                        <textarea
                                            className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-200"
                                            placeholder="Nhập đánh giá"
                                            rows="4"
                                        ></textarea>

                                        {/* Submit Button */}
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                        >
                                            Gửi đánh giá
                                        </button>
                                    </form>

                                    <div className="mt-6">
                                        <h5 className="font-semibold text-gray-700">Đánh giá của người dùng</h5>
                                        <div className="mt-2">
                                            <div className="border-b pb-2 mb-2">
                                                <h6 className="font-semibold text-gray-800">Người dùng A</h6>
                                                <div className="flex text-yellow-400 text-xl mb-1">★★★★☆</div>
                                                <p className="text-gray-600">
                                                    Sản phẩm rất tốt, tôi sẽ giới thiệu cho bạn bè.
                                                </p>
                                            </div>
                                            <div className="border-b pb-2 mb-2">
                                                <h6 className="font-semibold text-gray-800">Người dùng B</h6>
                                                <div className="flex text-yellow-400 text-xl mb-1">★★★☆☆</div>
                                                <p className="text-gray-600">Sản phẩm ổn, nhưng giao hàng hơi chậm.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/3 ">
                            <div className="border rounded-2 shadow-md bg-white">
                                <div className="p-4">
                                    <h5 className="text-lg font-semibold mb-4">Sản phẩm tương tự</h5>

                                    {/* List of products */}
                                    <a href="#" className="flex items-center mb-4">
                                        <div className="mr-4">
                                            <img
                                                src="https://via.placeholder.com/96"
                                                alt="Product 1"
                                                className="w-24 h-24 object-cover rounded-md border"
                                            />
                                        </div>
                                        <div className="info">
                                            <div className="text-sm font-medium text-gray-700 mb-1">
                                                Tên sản phẩm 1
                                            </div>
                                            <strong className="text-dark">120,000 đ</strong>
                                        </div>
                                    </a>

                                    <a href="#" className="flex items-center mb-4">
                                        <div className="mr-4">
                                            <img
                                                src="https://via.placeholder.com/96"
                                                alt="Product 2"
                                                className="w-24 h-24 object-cover rounded-md border"
                                            />
                                        </div>
                                        <div className="info">
                                            <div className="text-sm font-medium text-gray-700 mb-1">
                                                Tên sản phẩm 2
                                            </div>
                                            <strong className="text-dark">150,000 đ</strong>
                                        </div>
                                    </a>

                                    <a href="#" className="flex items-center mb-4">
                                        <div className="mr-4">
                                            <img
                                                src="https://via.placeholder.com/96"
                                                alt="Product 3"
                                                className="w-24 h-24 object-cover rounded-md border"
                                            />
                                        </div>
                                        <div className="info">
                                            <div className="text-sm font-medium text-gray-700 mb-1">
                                                Tên sản phẩm 3
                                            </div>
                                            <strong className="text-dark">200,000 đ</strong>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>

    );
};

export default ProductDetails;
