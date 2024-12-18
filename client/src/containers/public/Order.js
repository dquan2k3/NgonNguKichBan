import { useEffect, useState } from "react";
import AHeader from "./AHeader"
import { useDispatch } from 'react-redux'
import * as actions from '../../store/actions'
import Swal from 'sweetalert2';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

const Order = () => {
    const dispatch = useDispatch()
    const [list, setList] = useState([])
    const [page, setPage] = useState(1)
    const [pagelist, setPagelist] = useState([]);
    const [pagecount, setPagecount] = useState(1);

    useEffect(() => {
        loadOrder(page)
        console.log('page', page)

        const pd = document.getElementById('order');
        if (pd) {
            pd.classList.add('!text-purple-600', '!bg-white');
        }
    }, [page])

    const loadOrder = async () => {
        dispatch(actions.loadOrder(page))
            .then((response) => {
                console.log(response)
                if (response && response.data.success) {
                    const newList = Array.from({ length: response.data.totalPages }, (_, i) => i + 1);
                    setPagelist(newList);
                    console.log(response.data.list)
                    setPagecount(response.data.totalPages)
                    setList(response.data.list)
                }
                else {
                    console.log('Loi')

                }
            });
    }

    const done = async (_id) => {
        dispatch(actions.done(_id))
            .then((response) => {
                console.log(response)
                if (response && response.data.success) {
                    loadOrder()
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
                        <td style="border: 1px solid #ccc; padding: 8px; text-align: center;">${item.priceSale.toLocaleString()} VNĐ</td>
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
            showConfirmButton: true,
            confirmButtonText: 'Hoàn thành',
            showCancelButton: true,
            cancelButtonText: 'OK',
            icon: '',
            customClass: {
                popup: 'custom-popup',
            },
        }).then((result) => {
            if (result.isConfirmed) {
                done(_id);
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                // loadOrder()
            }
        });
    }

    // Bạn cũng có thể thêm CSS tùy chỉnh vào bên ngoài mã JavaScript, ví dụ:
    // Ví dụ CSS (có thể thêm vào tệp CSS của bạn hoặc sử dụng styled-components)
    const styles = `
            .custom-popup {
              width: 1000px !important;  
              height: 700px !important;
            }
          `;

    document.head.insertAdjacentHTML('beforeend', `<style>${styles}</style>`);

    return (
        <div>
            <div className='bg-[#F3F4F6]'>
                <AHeader />
                <div name='container' className='pl-20 pt-20 w-full h-screen '>
                    <h1 className="p-4 text-2xl font-bold">Order</h1>
                    <div name='task' className='m-3'>
                        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                            <div className="max-w-full overflow-x-auto">
                                <table className="w-full table-auto min-h-[710px]">
                                    <thead>
                                        <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                            <th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">Họ tên</th>
                                            <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">Địa chỉ</th>
                                            <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Tài khoản</th>
                                            <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Thành tiền</th>
                                            <th className="max-w-[100px] py-4 px-4 font-medium text-black dark:text-white">Hoàn thành</th>
                                            <th className="py-4 px-4 font-medium text-black dark:text-white">Actions</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {list.map((items, key) => (
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

                                <div className="py-2.5 w-full flex justify-center items-center">
                                    <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                                        {/* Nút Previous */}
                                        <a
                                            onClick={() => { setPage(1) }}
                                            href="#"
                                            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-200 focus:z-20"
                                        >
                                            <span className="sr-only">Previous</span>
                                            <ChevronLeftIcon aria-hidden="true" className="size-5" />
                                        </a>

                                        {/* Các trang */}
                                        {pagelist.length > 6
                                            ? (() => {
                                                const startPages = pagelist.slice(0, 3); // 3 trang đầu
                                                const endPages = pagelist.slice(-3); // 3 trang cuối

                                                return (
                                                    <>
                                                        {/* Hiển thị 3 trang đầu */}
                                                        {startPages.map((pagex, index) => (
                                                            <a
                                                                key={index}
                                                                onClick={() => setPage(pagex)}
                                                                href="#"
                                                                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 ${pagex === page
                                                                    ? 'z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600'
                                                                    : 'text-gray-900 hover:bg-gray-200'
                                                                    }`}
                                                            >
                                                                {pagex}
                                                            </a>
                                                        ))}

                                                        {/* Hiển thị dấu ... */}
                                                        <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300">
                                                            ...
                                                        </span>

                                                        {/* Hiển thị 3 trang cuối */}
                                                        {endPages.map((pagex, index) => (
                                                            <a
                                                                key={pagelist.length + index} // Đảm bảo key là duy nhất
                                                                onClick={() => setPage(pagex)}
                                                                href="#"
                                                                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 ${pagex === page
                                                                    ? 'z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600'
                                                                    : 'text-gray-900 hover:bg-gray-200'
                                                                    }`}
                                                            >
                                                                {pagex}
                                                            </a>
                                                        ))}
                                                    </>
                                                );
                                            })()
                                            : pagelist.map((pagex, index) => (
                                                <a
                                                    key={index}
                                                    onClick={() => setPage(pagex)}
                                                    href="#"
                                                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 ${pagex === page
                                                        ? 'z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600'
                                                        : 'text-gray-900 hover:bg-gray-200'
                                                        }`}
                                                >
                                                    {pagex}
                                                </a>
                                            ))
                                        }

                                        {/* Nút Next */}
                                        <a
                                            onClick={() => { setPage(pagecount) }}
                                            href="#"
                                            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-200 focus:z-20"
                                        >
                                            <span className="sr-only">Next</span>
                                            <ChevronRightIcon aria-hidden="true" className="size-5" />
                                        </a>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Order