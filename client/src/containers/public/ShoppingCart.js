import React, { useEffect, useState } from 'react';
import Header from './THeader';
import BHeader from './BHeader';
import Footer from './Footer';
import { XMarkIcon } from '@heroicons/react/24/outline'

const ShoppingCart = () => {
    const [isFullHeight, setIsFullHeight] = useState(false);

    const toggleHeight = (value) => {
        setIsFullHeight(value);
    };

    return (
        <div name='wrap' className='w-full flex flex-col place-items-center' >
            <Header />
            <BHeader />
            <div className='w-[1280px] shadow-xl  pt-10'>
                <div className='text-3xl font-bold pl-7 pt-3 pb-3 bg-[#F7F7F7] border border-b-0 border-gray-300 ' >
                    Giỏ hàng
                </div>
                <div name='bottomside' className='border border-gray-300 p-6'>
                    <table className="w-full border-collapse">
                        <thead>
                            <tr>
                                <th className="text-center py-3 px-4 border border-gray-300" style={{ minWidth: "350px" }}>Sản phẩm</th>
                                <th className="text-center py-3 px-4 border border-gray-300" style={{ width: "100px" }}>Đơn giá</th>
                                <th className="text-center py-3 px-4 border border-gray-300" style={{ width: "165px" }}>Số lượng</th>
                                <th className="text-center place-items-center py-3 px-4 border border-gray-300" style={{ width: "200px" }}>Giá</th>
                                <th className="text-center align-middle place-items-center py-3 px-0 border border-gray-300" style={{ width: "40px" }}>
                                    <a href="#" className="shop-tooltip float-none text-gray-500 hover:text-red-500" title="Clear cart">
                                        <i className="ion ion-md-trash"></i>
                                    </a>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Ví dụ 1 hàng sản phẩm, có thể thay thế bằng map() */}
                            <tr>
                                <td className="text-center py-3 px-4 border border-t-0 border-gray-300">Tên sản phẩm</td>
                                <td className="text-center py-3 px-4 border border-t-0 border-gray-300">100.000₫</td>
                                <td className="text-center py-3 px-4 border border-t-0 border-gray-300">2</td>
                                <td className="text-center py-3 px-4 border border-t-0 border-gray-300">200.000₫</td>
                                <td className="text-center py-3 px-0 border border-t-0 border-gray-300">
                                    <a href="#" className="text-gray-500 hover:text-red-500" title="Xóa sản phẩm">
                                        <i className="ion ion-md-trash"></i>
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className='flex justify-between mt-7'>
                        <div className='flex flex-col '>
                            Mã giảm giá :
                            <div className='flex  mt-2'>
                                <input className='border-gray-400 rounded-lg h-[45px]' placeholder='MA GIAM GIA'></input>
                                <button class="relative ml-4 inline-flex items-center justify-center w-full p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                                    <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                        Áp dụng
                                    </span>
                                </button>

                            </div>
                        </div>

                        <div className='flex'>
                            <div className=''>
                                <div className="font-bold text-xl pr-10 w-full flex justify-center">Giá gốc</div>
                                <div className='mt-2'>17.000.000.000 đ</div>
                            </div>

                            <div className='w-10'></div>

                            <div className=''>
                                <div className="font-bold text-xl pr-10 w-full flex justify-center">Thành tiền</div>
                                <div className='mt-2'>17.000.000.000 đ</div>
                            </div>
                        </div>

                    </div>

                    <button type="button" onClick={() => toggleHeight(true)} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 me-2 mb-2 mt-5 dark:bg-blue-600 h-[45px] dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ">Thanh toán</button>

                </div>
            </div>
            <div name='popup' className={`fixed w-full ${isFullHeight ? "h-screen" : "h-0"} bg-gray-300 bg-opacity-85 top-0 z-50 overflow-hidden transition-all duration-500 w-full flex flex-col place-items-center`}>
                <div name='bottompup' className='border bg-white mt-40 border-gray-300 shadow-xl w-[1280px]'>
                    <div className='text-3xl font-bold pl-7 pt-3 pb-3 bg-[#F7F7F7] border border-b-0 border-gray-300 flex justify-between ' >
                        Thanh toán
                        <button
                            type="button"
                            onClick={() => toggleHeight(false)}
                            className="relative -m-2 p-2 pr-6 text-gray-400 hover:text-gray-500"
                        >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon aria-hidden="true" className="h-9 w-9" />
                        </button>
                    </div>
                    <div className='w-full p-6'>

                        <table className="w-full border-collapse">
                            <thead>
                                <tr>
                                    <th className="text-center py-3 px-4 border border-gray-300" style={{ minWidth: "350px" }}>Sản phẩm</th>
                                    <th className="text-center py-3 px-4 border border-gray-300" style={{ width: "100px" }}>Đơn giá</th>
                                    <th className="text-center py-3 px-4 border border-gray-300" style={{ width: "165px" }}>Số lượng</th>
                                    <th className="text-center place-items-center py-3 px-4 border border-gray-300" style={{ width: "200px" }}>Giá</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Ví dụ 1 hàng sản phẩm, có thể thay thế bằng map() */}
                                <tr>
                                    <td className="text-center py-3 px-4 border border-t-0 border-gray-300">Tên sản phẩm</td>
                                    <td className="text-center py-3 px-4 border border-t-0 border-gray-300">100.000₫</td>
                                    <td className="text-center py-3 px-4 border border-t-0 border-gray-300">2</td>
                                    <td className="text-center py-3 px-4 border border-t-0 border-gray-300">200.000₫</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className='flex justify-between mt-7'>
                            <div className='flex flex-col '>
                                Mã giảm giá :
                                <div className='flex  mt-2'>
                                    <input className='border-gray-400 rounded-lg h-[45px] pointer-events-none bg-slate-200' placeholder='MA GIAM GIA' readOnly></input>

                                </div>
                            </div>

                            <div className='flex'>
                                <div className=''>
                                    <div className="font-bold text-xl pr-10 w-full flex justify-center">Giá gốc</div>
                                    <div className='mt-2'>17.000.000.000 đ</div>
                                </div>

                                <div className='w-10'></div>

                                <div className=''>
                                    <div className="font-bold text-xl pr-10 w-full flex justify-center">Thành tiền</div>
                                    <div className='mt-2'>17.000.000.000 đ</div>
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

export default ShoppingCart;
