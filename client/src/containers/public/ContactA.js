import AHeader from "./AHeader"
import { useDispatch } from 'react-redux'
import * as actions from '../../store/actions'
import { useEffect, useState } from "react"
import Swal from 'sweetalert2';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

const ContactA = () => {
    const dispatch = useDispatch()
    const [list, setList] = useState([])
    const [page, setPage] = useState(1)
    const [pagelist, setPagelist] = useState([]);
    const [pagecount, setPagecount] = useState(1);

    useEffect(() => {
        loadContact(page);


        const pd = document.getElementById('contact');
        if (pd) {
            pd.classList.add('!text-purple-600', '!bg-white');
        }
    }, [page])


    const loadContact = async (page) => {
        dispatch(actions.loadContact(page))
            .then((response) => {
                if (response && response.data.success) {
                    const newList = Array.from({ length: response.data.totalPages }, (_, i) => i + 1);
                    setPagelist(newList);
                    setPagecount(response.data.totalPages)
                    setList(response.data.list)
                }
                else {
                    console.log('Loi')

                }
            });
    }

    const handleClick = (_id, email, hoten, mess) => {
        console.log(pagelist)
        dispatch(actions.readContact(_id))
            .then((response) => {
                if (response && response.data.success) {
                    Swal.fire({
                        html: `
                        <div style="text-align: center;">
                          <h1 style="font-size: 36px; font-weight: bold;">${hoten} - ${email}</h1>
                          <p style="font-size: 30px;">Tin nhắn: </p>
                          <p style="font-size: 24px; text-align: left;">${mess}</p>
                        </div>
                      `,
                        showConfirmButton: true,
                        confirmButtonText: 'OK',
                        icon: '',
                        customClass: {
                            popup: 'custom-popup',
                        },
                    }).then(() => {
                        // Gọi hàm loadContact() sau khi nhấn OK
                        loadContact();
                    });
                } else {
                    console.log('Lỗi');
                }
            });
    };

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
                <div name='container' s className='pl-20 pt-20 w-full h-screen '>
                    <h1 className="p-4 text-2xl font-bold">Liên hệ từ khách hàng</h1>
                    <div name='task' className='m-3'>
                        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                            <div className="max-w-full overflow-x-auto">
                                <table className="w-full table-auto min-h-[710px]">
                                    <thead>
                                        <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                            <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">Họ tên</th>
                                            <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white">Email</th>
                                            <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Trạng thái   </th>
                                            <th className="py-4 px-4 font-medium text-black dark:text-white">Hành động</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {list.map((items, key) => (
                                            <tr key={key} style={{ verticalAlign: 'top' }}>
                                                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                                    <h5 className="font-medium text-black dark:text-white">{items.Name}</h5>
                                                </td>
                                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                    <p className="text-black dark:text-white">{items.Email}</p>
                                                </td>
                                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                    <p className={`inline-flex pl-0 rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${items.isRead ? 'bg-success text-success' : 'bg-warning text-blue-600'}`}
                                                    >
                                                        {items.isRead ? 'Đã đọc' : 'Chưa đọc'}
                                                    </p>

                                                </td>
                                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                    <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800">
                                                        <span onClick={() => handleClick(items._id, items.Email, items.Name, items.Thongtin)} className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                                            Đọc
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

export default ContactA