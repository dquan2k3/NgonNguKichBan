import React, { useEffect, useRef, useState } from 'react';
import Header from './THeader';
import BHeader from './BHeader';
import Footer from './Footer';
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useCart } from '../system/cartContext';
import * as actions from '../../store/actions';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content'
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


const ShoppingCart = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isFullHeight, setIsFullHeight] = useState(false);
    const [sum, setSum] = useState(0)
    const { cartp, addToCartp, addToCart } = useCart()
    const popupref = useRef(null)
    const [user, setUser] = useState('')
    const [address, setAddress] = useState('')
    const [err, setErr] = useState('')
    const MySwal = withReactContent(Swal);
    const [voucher, setVoucher] = useState('')
    const [giamgia, setGiamGia] = useState(100)
    const [tb, setTb] = useState('')


    const toggleHeight = (value) => {
        setIsFullHeight(value);
    };


    const remove = (id) => {
        dispatch(actions.removeCart(id))
            .then((response) => {
                if (response && response.data.success) {
                    addToCart(response.data.cart.length)
                    addToCartp(response.data.cart)
                }
            })
    }

    useEffect(() => {
        const total = cartp.reduce((sum, item) => sum + (item.product.PriceSale * item.product.Amount || 0), 0);
        setSum(total);
    }, [cartp])

    useEffect(() => {
        if (isFullHeight) {
            document.body.style.overflow = "hidden"; // Ngăn cuộn trang
        } else {
            document.body.style.overflow = "auto"; // Khôi phục cuộn trang
        }

        return () => {
            // Khôi phục trạng thái cuộn khi component unmount
            document.body.style.overflow = "auto";
        };
    }, [isFullHeight]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupref.current && !popupref.current.contains(event.target)) {
                setIsFullHeight(false); // Đóng popup nếu click bên ngoài
            }
        };

        if (isFullHeight) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isFullHeight]);


    const handleShowPopup = () => {
        MySwal.fire({
            title: "Done!",
            text: "Your action has been successfully completed.",
            icon: "success",
            confirmButtonText: "Okay"
        }).then((result) => {
            if (result.isConfirmed) {
                // Sau khi nhấn "Okay", điều hướng đến '/home'
                navigate('/home');
            }
        });
    };

    const SubmitVoucher = async () => {
        if (voucher === '') {
            setTb('Bạn chưa nhập mã giảm giá!')
            return
        }
        const page = -1;
        dispatch(actions.loadvoucher(page, voucher))
            .then((response) => {
                if (response && response.data.success) {
                    const sp = response.data.list;
                    if (sp) {
                        const currentDate = new Date();  // Lấy ngày giờ hiện tại
                        const voucherDate = new Date(sp.Date);  // Chuyển đổi ngày hết hạn voucher thành đối tượng Date

                        // Kiểm tra xem voucher đã hết hạn chưa
                        if (voucherDate < currentDate) {
                            setTb('Mã giảm giá đã hết hạn!');
                            setGiamGia(100);
                            return;
                        }

                        setTb(`Bạn được giảm ${sp.Phantram} %`);
                        setGiamGia(sp.Phantram);
                    } else {
                        alert('Mã giảm giá không hợp lệ!');
                        setGiamGia(100);
                    }
                } else {
                    console.log('Lỗi khi lấy voucher');
                }
            })
            .catch((error) => {
                console.log('Lỗi khi gọi API:', error);
            });
    };



    const cod = () => {
        if (!user || !address) {
            setErr('Vui lòng nhập đầy đủ thông tin!')
            return
        }
        let key = ''
        const persistedAuth = JSON.parse(localStorage.getItem('persist:auth'));
        if (persistedAuth && persistedAuth.token) {
            const token = persistedAuth.token.replace(/^"|"$/g, '');

            try {
                const decoded = jwtDecode(token);
                key = decoded.account
            } catch (error) {
                console.error("Token không hợp lệ:", error);
            }
        }
        console.log(giamgia)
        dispatch(actions.cod(user, address, key, giamgia))
            .then((response) => {
                if (response && response.data.success) {
                    addToCartp(response.data.cart)
                    handleShowPopup()
                }
            })
    }

    return (
        <div name='wrap' className={`${isFullHeight ? 'static' : ''} w-full flex flex-col place-items-center`} >
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
                                <th className="text-center align-middle place-items-center py-3 px-0 border border-gray-300" style={{ width: "55px" }}>
                                    <a href="#" className="shop-tooltip float-none text-gray-500 hover:text-red-500" title="Clear cart">
                                        <i className="ion ion-md-trash"></i>
                                    </a>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartp.map((product) => (
                                <tr key={product.product._id}>
                                    <td className="text-center items-center border border-t-0 border-r-0 border-gray-300 align-middle">
                                        <div className='text-center flex items-center gap-4 py-3 px-4 align-middle'>
                                            <img src={product.product.Image} className="w-16 h-16" />
                                            {product.product.Name}
                                        </div>

                                    </td>
                                    <td className="text-center py-3 px-4 border border-t-0 border-gray-300 align-middle">
                                        {product.product.PriceSale ? product.product.PriceSale.toLocaleString() : product.product.Price.toLocaleString()}
                                    </td>
                                    <td className="text-center py-3 px-4 border border-t-0 border-gray-300 align-middle">
                                        {product.product.Amount}
                                    </td>
                                    <td className="text-center py-3 px-4 border border-t-0 border-gray-300 align-middle">
                                        {product.product.PriceSale ? (product.product.PriceSale * product.product.Amount).toLocaleString() : (product.product.Price * product.product.Amount).toLocaleString()}
                                    </td>
                                    <td className="text-center py-3 px-0 border border-t-0 border-gray-300 align-middle">
                                        <button type="button" onClick={() => remove(product.product._id)} className="text-gray-500 hover:text-red-500 p-4 cursor-pointer" title="Xóa sản phẩm">
                                            <FontAwesomeIcon icon={faX} />
                                        </button>
                                    </td>
                                </tr>

                            ))}
                        </tbody>
                    </table>
                    <div className='flex justify-between mt-7'>
                        <div className='flex flex-col '>
                            Mã giảm giá :
                            <div className={`${tb == 'Mã giảm giá đã hết hạn!' || tb == 'Bạn chưa nhập mã giảm giá!' ? 'text-red-600' : ''}`}>{tb}</div>
                            <div className='flex  mt-2'>
                                <input onChange={(e) => setVoucher(e.currentTarget.value)} value={voucher} className='border-gray-400 rounded-lg h-[45px]' placeholder='MA GIAM GIA'></input>
                                <button onClick={SubmitVoucher} class="relative ml-4 inline-flex items-center justify-center w-full p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                                    <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                        Áp dụng
                                    </span>
                                </button>

                            </div>
                        </div>

                        <div className='flex'>
                            <div className=''>
                                <div className="font-bold text-xl pr-10 w-full flex justify-center">Giá gốc</div>
                                <div className='mt-2'>{sum.toLocaleString()} đ</div>
                            </div>

                            <div className='w-10'></div>

                            <div className=''>
                                <div className="font-bold text-xl pr-10 w-full flex justify-center">Thành tiền</div>
                                <div className='mt-2'>{(sum * giamgia / 100).toLocaleString()} đ</div>
                            </div>
                        </div>

                    </div>

                    <button type="button" onClick={() => toggleHeight(true)} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 me-2 mb-2 mt-5 dark:bg-blue-600 h-[45px] dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ">Thanh toán</button>

                </div>
            </div>
            <div name='popup' className={`fixed w-full ${isFullHeight ? "h-screen" : "h-0"} bg-gray-300 bg-opacity-85 top-0 z-50 overflow-hidden transition-all duration-500 w-full flex flex-col place-items-center`}>
                <div ref={popupref} name='bottompup' className='border bg-white mt-40 border-gray-300 shadow-xl w-[1280px]'>
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
                        <div className='overflow-auto max-h-[420px]'>
                            <table className="w-full border-collapse ">
                                <thead>
                                    <tr>
                                        <th className="text-center py-3 px-4 border border-gray-300" style={{ minWidth: "350px" }}>Sản phẩm</th>
                                        <th className="text-center py-3 px-4 border border-gray-300" style={{ width: "100px" }}>Đơn giá</th>
                                        <th className="text-center py-3 px-4 border border-gray-300" style={{ width: "165px" }}>Số lượng</th>
                                        <th className="text-center place-items-center py-3 px-4 border border-gray-300" style={{ width: "200px" }}>Giá</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartp.map((product) => (
                                        <tr key={product.product._id}>
                                            <td className="text-center items-center border border-t-0 border-r-0 border-gray-300 align-middle">
                                                <div className='text-center flex items-center gap-4 py-3 px-4 align-middle'>
                                                    <img src={product.product.Image} className="w-16 h-16" />
                                                    {product.product.Name}
                                                </div>

                                            </td>
                                            <td className="text-center py-3 px-4 border border-t-0 border-gray-300">{product.product.PriceSale ? product.product.PriceSale.toLocaleString() : product.product.Price.toLocaleString()}</td>
                                            <td className="text-center py-3 px-4 border border-t-0 border-gray-300">{product.product.Amount}</td>
                                            <td className="text-center py-3 px-4 border border-t-0 border-gray-300">{product.product.PriceSale ? (product.product.PriceSale * product.product.Amount).toLocaleString() : (product.product.Price * product.product.Amount).toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className='flex justify-between mt-3 pb-4'>
                            <div className='flex flex-col '>
                                Mã giảm giá: {giamgia !== 100 ? ` ${giamgia} %` : ''}
                                <div className='flex  mt-2'>
                                    <input className='border-gray-400 rounded-lg h-[45px] pointer-events-none bg-slate-200' value={voucher} placeholder='MA GIAM GIA' readOnly></input>

                                </div>
                            </div>

                            <div className='flex'>
                                <div className=''>
                                    <div className="font-bold text-xl pr-10 w-full flex justify-center">Giá gốc</div>
                                    <div className='mt-2'>{sum.toLocaleString()} đ</div>
                                </div>

                                <div className='w-10'></div>

                                <div className=''>
                                    <div className="font-bold text-xl pr-10 w-full flex justify-center">Thành tiền</div>
                                    <div className='mt-2'>{(sum * giamgia / 100).toLocaleString()} đ</div>
                                </div>
                            </div>

                        </div>

                        <div className='pt-5'>
                            <div class="w-full max-w-sm flex gap-10 min-w-[600px]">
                                <div class="relative w-[250px]">
                                    <input
                                        onChange={(e) => { setUser(e.target.value) }}
                                        value={user}
                                        class="peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                    />
                                    <label class={`absolute cursor-text pointer-events-none bg-white px-1 left-2.5 top-2.5 text-slate-400 text-sm transition-all transform origin-left peer-focus:-top-7 peer-focus:-left-1 peer-focus:text-xl peer-focus:text-black peer-focus:font-semibold peer-focus:scale-90 ${user ? '!-top-7 !-left-1 !text-xl !text-black !scale-90 !font-semibold' : ''}`}>
                                        Tên của bạn
                                    </label>
                                </div>
                                <div class="relative w-[250px]">
                                    <input
                                        onChange={(e) => { setAddress(e.target.value) }}
                                        value={address}
                                        class="peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                    />
                                    <label class={`absolute cursor-text pointer-events-none bg-white px-1 left-2.5 top-2.5 text-slate-400 text-sm transition-all transform origin-left peer-focus:-top-7 peer-focus:-left-1 peer-focus:text-xl peer-focus:text-black peer-focus:font-semibold peer-focus:scale-90 ${address ? '!-top-7 !-left-1 !text-xl !text-black !scale-90 !font-semibold' : ''}`}>
                                        Địa chỉ
                                    </label>
                                </div>
                            </div>
                            <div className='flex gap-4 items-center pt-5'>
                                <h1 className='text-2xl text-center font-semibold uppercase'>Chọn phương thức thanh toán</h1>
                                <div className='text-red-600 text-center'>{err}</div>
                            </div>

                            <div className='flex gap-3 pl-1 '>
                                <button onClick={cod} class="relative inline-flex items-center justify-center p-0.5 mt-3 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                                    <span class="relative px-5 py-2.5 text-[16px] transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                        Thanh toán khi nhận hàng
                                    </span>
                                </button>

                                <button class="relative inline-flex items-center justify-center p-0.5 mt-3 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                                    <span class="relative px-5 py-2.5 text-[16px] transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                        Thanh toán bằng Momo
                                    </span>
                                </button>

                                <button class="relative inline-flex items-center justify-center p-0.5 mt-3 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                                    <span class="relative px-5 py-2.5 text-[16px] transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                        Thanh toán bằng Vnpay
                                    </span>
                                </button>

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
