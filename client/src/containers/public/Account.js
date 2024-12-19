import React, { useEffect, useState } from "react";
import Header from './THeader';
import BHeader from './BHeader';
import Footer from './Footer';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions'
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import { useCart } from '../system/cartContext'
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const Account = () => {
    const dispatch = useDispatch()
    const { isLoggedIn } = useSelector(state => state.auth)
    const [user, setUser] = useState('')
    const navigate = useNavigate()
    const { addToCart, addToCartp } = useCart();
    const MySwal = withReactContent(Swal);

    const [menuStates, setMenuStates] = useState({});
    const [activeTab, setActiveTab] = useState("favourites");
    const [list, setList] = useState([])
    const [productwish, setProductwish] = useState([])
    const [order, setOrder] = useState([])

    const handleShowPopup = (msg) => {
        if (msg !== 'Sản phẩm đã yêu thích rồi!' && msg !== 'Không tìm thấy sản phẩm trong danh sách yêu thích!') {
            MySwal.fire({
                icon: "success", // Icon của popup
                title: "Done!", // Tiêu đề
                text: msg || "Thêm vào giỏ hàng thành công!", // Nội dung
                timer: 1000, // Hiển thị trong 1 giây
                showConfirmButton: false, // Ẩn nút OK
                position: "top-start", // Vị trí góc trên bên trái
                toast: true, // Hiển thị dưới dạng thông báo nhỏ (toast)
            });
        }
        else {
            MySwal.fire({
                icon: "error", // Icon của popup
                title: "Lỗi", // Tiêu đề
                text: msg,
                timer: 1000, // Hiển thị trong 1 giây
                showConfirmButton: false, // Ẩn nút OK
                position: "top-start", // Vị trí góc trên bên trái
                toast: true, // Hiển thị dưới dạng thông báo nhỏ (toast)
            });
        }
    };

    const handleWish = (id, unwish = true) => {
        dispatch(actions.wish(user, id, unwish))
            .then((response) => {
                if (response && response.data.success) {
                    handleShowPopup(response.data.msg)
                    loadWishProduct()
                }
            })
    };


    useEffect(() => {
        const persistedAuth = JSON.parse(localStorage.getItem('persist:auth'));

        if (persistedAuth && persistedAuth.token) {
            const token = persistedAuth.token.replace(/^"|"$/g, '');

            try {
                const decoded = jwtDecode(token);
                setUser(decoded.account);
            } catch (error) {
                console.error("Token không hợp lệ:", error);
            }
        } else {
            console.log("Không có token trong localStorage.");
        }

    }, [isLoggedIn]);

    const loadWishProduct = () => {
        dispatch(actions.loadWish(user))
            .then((response) => {
                if (response && response.data.success) {
                    setList(response.data.list)
                }
            })
    }

    useEffect(() => {
        if (user) {
            loadWishProduct()
            loadOrder()
        }
    }, [user])

    const loadWishProductt = () => {
        dispatch(actions.loadProductByWish(list))
            .then((response) => {
                if (response && response.data.success) {
                    setProductwish(response.data.list)
                    console.log(response.data.list)
                }
            })
    }

    useEffect(() => {
        loadWishProductt()
    }, [list])

    const handleToggleMenu = (id) => {
        setMenuStates((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const buy = (product) => {
        const productAdd = { ...product, Amount: 1 };

        dispatch(actions.addToCart(productAdd))
            .then((response) => {
                if (response && response.data.success) {
                    addToCart(response.data.cart.length)
                    addToCartp(response.data.cart)
                    handleShowPopup()
                }

            })

    }

    const loadOrder = async (page = -1) => {
        dispatch(actions.loadOrder(page, user))
            .then((response) => {
                console.log(response)
                if (response && response.data.success) {
                    setOrder(response.data.list)
                }
                else {
                    console.log('Loi')

                }
            });
    }

    const handleClick = (User, Address, Account, Amount, Items, _id) => {
        const itemsArray = Array.isArray(Items) ? Items : [];

        // Tạo HTML hiển thị danh sách sản phẩm
        const itemsHtml = `
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <thead>
                    <tr>
                        <th style="border: 1px solid #ccc; padding: 8px; background-color: #f9f9f9; text-align: center;">Hình ảnh</th>
                        <th style="border: 1px solid #ccc; padding: 8px; background-color: #f9f9f9; text-align: center;">Tên sản phẩm</th>
                        <th style="border: 1px solid #ccc; padding: 8px; background-color: #f9f9f9; text-align: center;">Loại</th>
                        <th style="border: 1px solid #ccc; padding: 8px; background-color: #f9f9f9; text-align: center;">Mô tả</th>
                        <th style="border: 1px solid #ccc; padding: 8px; background-color: #f9f9f9; text-align: center;">Giá</th>
                        <th style="border: 1px solid #ccc; padding: 8px; background-color: #f9f9f9; text-align: center;">Số lượng</th>
                    </tr>
                </thead>
                <tbody>
                    ${itemsArray.map(item => `
                        <tr>
                            <td style="border: 1px solid #ccc; padding: 8px; text-align: center;">
                                <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 4px;" />
                            </td>
                            <td style="border: 1px solid #ccc; padding: 8px; text-align: center;">${item.name}</td>
                            <td style="border: 1px solid #ccc; padding: 8px; text-align: center;">${item.productType}</td>
                            <td style="border: 1px solid #ccc; padding: 8px; text-align: center;">${item.describe}</td>
                            <td style="border: 1px solid #ccc; padding: 8px; text-align: center;">${item.priceSale.toLocaleString()} đ</td>
                            <td style="border: 1px solid #ccc; padding: 8px; text-align: center;">${item.amount}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;


        // Hiển thị SweetAlert với thông tin User, Address, Amount, Account và danh sách sản phẩm
        Swal.fire({
            html: `
                <div style="text-align: center;">
                    <h1 style="font-size: 36px; font-weight: bold;">${User} - ${Address} - ${Amount.toLocaleString()} đ</h1>
                    <p style="font-size: 30px;">Tài khoản: ${Account} </p>
                    <hr style="margin: 20px 0;" />
                    <div style="text-align: left;">
                        <h2 style="font-size: 24px; font-weight: bold;">Danh sách sản phẩm:</h2>
                        ${itemsHtml}
                    </div>
                </div>
            `,
            showCancelButton: false,
            icon: '',
            customClass: {
                popup: 'custom-popup',
            },
        })
    }

    const styles = `
    .custom-popup {
      width: 1000px !important;  
      height: 700px !important;
    }
  `;

    document.head.insertAdjacentHTML('beforeend', `<style>${styles}</style>`);

    return (
        <div>
            <Header />
            <BHeader />
            <div className="mx-auto container px-4 py-12 flex justify-start items-center w-[1300px]">
                <div className="flex flex-col w-full">
                    {/* Tab Navigation */}
                    <div className="flex space-x-8 mb-8">
                        <button
                            className={`py-2 px-4 ${activeTab === "favourites" ? "bg-gray-800 text-white" : "bg-gray-200"}`}
                            onClick={() => handleTabClick("favourites")}
                        >
                            Yêu thích
                        </button>
                        <button
                            className={`py-2 px-4 ${activeTab === "anotherTab" ? "bg-gray-800 text-white" : "bg-gray-200"}`}
                            onClick={() => handleTabClick("anotherTab")}
                        >
                            Lịch sử đơn hàng
                        </button>
                    </div>

                    {/* Tab Content */}
                    {activeTab === "favourites" ? (
                        <div>
                            <h1 className="text-4xl font-semibold text-gray-800 dark:text-white">Yêu thích</h1>
                            <p className="mt-4 text-2xl text-gray-600 dark:text-white">{productwish.length} Sản phẩm</p>
                            <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {productwish.map((item) => {
                                    const isMenuOpen = menuStates[item._id] || false;
                                    return (
                                        <div key={item._id} className="flex flex-col">
                                            <div className="relative">
                                                <img className="hidden lg:block" src={item.Image} alt={item.Name} />
                                                <img className="hidden sm:block lg:hidden" src={item.Image} alt={item.Name} />
                                                <img className="sm:hidden" src={item.Image} alt={item.Name} />
                                                <button
                                                    aria-label="close"
                                                    onClick={() => handleWish(item._id)}
                                                    className="top-4 right-4 absolute p-1.5 bg-gray-800 dark:bg-white dark:text-gray-800 text-white hover:text-gray-400"
                                                >
                                                    <svg
                                                        className="fil-current"
                                                        width="14"
                                                        height="14"
                                                        viewBox="0 0 14 14"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M13 1L1 13"
                                                            stroke="currentColor"
                                                            strokeWidth="1.25"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M1 1L13 13"
                                                            stroke="currentColor"
                                                            strokeWidth="1.25"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                </button>
                                            </div>
                                            <div className="mt-6 flex justify-between items-center">
                                                <p className="text-2xl font-semibold text-gray-800 dark:text-white">{item.Name}</p>
                                                <button
                                                    aria-label="toggle menu"
                                                    onClick={() => handleToggleMenu(item._id)}
                                                    className="py-2.5 px-4 bg-gray-800 text-white hover:text-gray-400"
                                                >
                                                    {isMenuOpen ? "▲" : "▼"}
                                                </button>
                                            </div>
                                            {isMenuOpen && (
                                                <div className="mt-4">
                                                    <p className="text-base font-medium text-gray-800 dark:text-white">Giá sản phẩm : {item.PriceSale.toLocaleString()} đ</p>
                                                    <div className="flex mt-4 space-x-4">
                                                        <button onClick={() => navigate(`/productDetails?id=${item._id}`)} className="py-4 text-lg bg-white border border-gray-800 hover:bg-gray-300 flex-1">
                                                            Xem chi tiết
                                                        </button>
                                                        <button onClick={() => buy(item)} className="py-4 text-lg text-white bg-gray-800 hover:bg-black flex-1">
                                                            Thêm vào giỏ hàng
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                        <div className="max-h-[710px] overflow-auto">
                            <h1 className="text-4xl font-semibold text-gray-800 dark:text-white">Lịch sử đơn hàng</h1>
                            <table className="w-full table-auto min-h-[710px] ">
                                <thead>
                                    <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                        <th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">Họ tên</th>
                                        <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">Địa chỉ</th>
                                        <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Tài khoản</th>
                                        <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Thành tiền</th>
                                        <th className="max-w-[100px] py-4 px-4 font-medium text-black dark:text-white">Chuẩn bị</th>
                                        <th className="py-4 px-4 font-medium text-black dark:text-white">Actions</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {order.map((items, key) => (
                                        <tr key={key} style={{ verticalAlign: 'top' }}>
                                            <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                                <h5 className="font-medium text-black dark:text-white">{items.User}</h5>
                                            </td>
                                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                <p className="text-black dark:text-white">{items.Address}</p>
                                            </td>
                                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                <p className="text-black dark:text-white">{items.Account}</p>
                                            </td>
                                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                <p className="text-black dark:text-white">{items.Total.toLocaleString()} đ</p>
                                            </td>

                                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                <p className="text-black dark:text-white">{items.isDone ? '✔️' : '❌'}  </p>
                                            </td>

                                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                <button onClick={() => handleClick(items.User, items.Address, items.Account, items.Total, items.Items, items._id)} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
                                                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                                        Xem chi tiết
                                                    </span>
                                                </button>
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>

    );
};

export default Account;
