import React from 'react'
import AHeader from './AHeader'
import { faCheck, faL, faLadderWater } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useRef, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useDispatch } from 'react-redux'
import * as actions from '../../store/actions'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';



const Voucher = () => {

    const dispatch = useDispatch();
    const [addTypeHeigh, setAddTypeHeigh] = useState(false)
    const [alterTypeHeigh, setAlterTypeHeigh] = useState(false)
    const [noti, setNoti] = useState(false)
    const [name, setName] = useState('')
    const [describe, setDescribe] = useState('')
    const [date, setDate] = useState('')
    const [listProductType, setListProductType] = useState([])
    const [isErr, setIsErr] = useState(false)
    const [fname, setFname] = useState('')
    const [fdescribe, setFdescribe] = useState('')
    const [id, setId] = useState('')
    const [finame, setFiname] = useState('')
    const [fidescribe, setFidescribe] = useState('')
    const [confirmDelete, setConfirmDelete] = useState('')
    const [isdelete, setIsdelete] = useState('')
    const [clickdelete, setClickdelete] = useState(false)
    const [clickOutside, setClickOutside] = useState(false);
    const divRefs = useRef([]);
    const [page, setPage] = useState(1)
    const [pagelist, setPagelist] = useState([]);
    const [pagecount, setPagecount] = useState(1);
    const [fdate, setFdate] = useState('')
    const [fidate, setFidate] = useState('')

    const showNoti = () => {
        setNoti(true)
        setTimeout(() => {
            setNoti(false)
        }, 2000)
    }

    const showAlter = (value) => {
        setAlterTypeHeigh(value)
        setAddTypeHeigh(false)
        setIsErr(false)
    }

    const showAdd = (value) => {
        setAddTypeHeigh(value)
        setAlterTypeHeigh(false)
        setIsErr(false)
    }

    const hideAll = () => {
        setAddTypeHeigh(false)
        setAlterTypeHeigh(false)
        setIsErr(false)
    }

    const loadProductType = async (e) => {
        dispatch(actions.loadvoucher(page))
            .then((response) => {
                if (response && response.data.success) {
                    const newList = Array.from({ length: response.data.totalPages }, (_, i) => i + 1);
                    setPagelist(newList);
                    setPagecount(response.data.totalPages)
                    setListProductType(response.data.list)
                    console.log(response.data.list)
                }
                else {
                    console.log('Loi')
                }
            });
    }


    useEffect(() => {
        loadProductType();

        const pd = document.getElementById('voucher');
        if (pd) {
            pd.classList.add('!text-purple-600', '!bg-white');
        }
    }, [page])


    const addProductType = async (e) => {
        e.preventDefault()

        dispatch(actions.addvoucher({ name, describe, date }))
            .then((response) => {
                console.log(response);
                if (response.success) {
                    hideAll()
                    showNoti()
                    setDescribe('')
                    setName('')
                    setDate('')
                    loadProductType()
                }
                else {
                    setIsErr(response.message)
                }

            })
            .catch((error) => {
                console.error("Error:", error);  // In ra lỗi nếu promise bị reject
            });

        //     const response = dispatch(actions.addProductType({ name, describe }))
        //     console.log(response)
        //     response.success ? console.log('done') : console.log('???')
    }

    const deleteProductType = async () => {
        dispatch(actions.deletevoucher({ id: isdelete }))
            .then((response) => {
                if (response.data.success) {
                    showNoti()
                    loadProductType()
                }
            })
    }

    const handleOutsideClick = () => {
        setClickOutside(true);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            // Kiểm tra nếu tất cả các div không chứa target của sự kiện
            const clickedOutsideAllDivs = divRefs.current.every(
                (ref) => ref && !ref.contains(event.target)
            );

            if (clickedOutsideAllDivs) {
                setIsdelete(null) // Click nằm ngoài tất cả các div
            } else {
                setClickOutside(false); // Click nằm bên trong một div nào đó
            }
        };

        // Thêm sự kiện click vào document
        document.addEventListener("click", handleClickOutside);

        // Xóa sự kiện khi component bị unmounted
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (isdelete) {
            const element = document.getElementById(`e${isdelete}`);
            const target = document.getElementById(`d${isdelete}`);
            setTimeout(() => {
                if (target) {
                    target.innerHTML = 'Xác nhận'
                }
            }, 150);


            if (element) {
                element.classList.toggle('hidden');
            }


            if (isdelete === confirmDelete) {
                deleteProductType()
            }

            if (confirmDelete && isdelete && isdelete != confirmDelete) {
                const elementecf = document.getElementById(`e${confirmDelete}`);
                const elementdcf = document.getElementById(`d${confirmDelete}`);
                setTimeout(() => {
                    if (elementecf) { elementecf.classList.toggle('hidden'); }

                }, 310);
                setTimeout(() => {
                    if (elementdcf) { elementdcf.innerHTML = 'Xóa' }

                }, 100);

            }

            setConfirmDelete(isdelete);

        }
        else {
            if (confirmDelete) {
                const elementecf = document.getElementById(`e${confirmDelete}`);
                const elementdcf = document.getElementById(`d${confirmDelete}`);
                setTimeout(() => {
                    elementecf.classList.toggle('hidden');
                }, 310);
                setTimeout(() => {
                    elementdcf.innerHTML = 'Xóa'
                }, 100);
                setConfirmDelete(isdelete);
            }
            else {
                console.log('firstLoad')
            }

        }

    }, [isdelete, clickdelete])

    const sClickdelete = async (e) => {
        setClickdelete(!clickdelete);
    }


    const alterProductType = async (e) => {
        e.preventDefault()
        console.log(id, ',', fname, ',', fdescribe, ',', finame, ',', fidescribe)
        dispatch(actions.altervoucher({ id, fname, fdescribe , fdate}))
            .then((response) => {
                console.log(response.data.response)
                if (response.data.response.success) {
                    hideAll()
                    showNoti()
                    loadProductType()
                }
                else {
                    setIsErr(response.msg)
                }
            })
    }

    return (

        <div className='bg-[#F3F4F6]'>
            <AHeader />
            <div name='container' className='pl-20 pt-20 w-full h-screen '>
                <div name='task' className='m-3'>
                    <div className="">
                        <div className="text-[28px] font-medium pl-7 pt-2 bg-gray-300 border border-gray-400 rounded-t-xl flex justify-between">
                            <div className=' relative'>MÃ GIẢM GIÁ
                                <div className={`bg-green-400 w-52 ${noti ? 'max-h-10' : 'max-h-0'} z-20 overflow-hidden flex h-10 absolute text-white ease-in-out font-semibold pl-2 rounded-b-lg transition-all duration-500`}>
                                    <div className="pr-3"><FontAwesomeIcon icon={faCheck} /></div>
                                    Thành công
                                </div>
                            </div>
                            <button onClick={() => showAdd("true")} className="bg-blue-500 hover:bg-blue-700 text-white font-semibold text-xl px-4 rounded text-center h-9 mr-3">
                                Thêm
                            </button>
                        </div>

                        <div name='tablecontainer' className="max-h-[730px] min-h-[730px] w-full overflow-y-auto relative">
                            <table className="w-full border-separate border-spacing-0">
                                <thead className='bg-gray-200 sticky -top-1 z-10 '>
                                    <tr className="w-full">
                                        <th className="border border-b-blue-900 text-[20px] w-[25%]">Mã giảm giá</th>
                                        <th className="border border-b-blue-900 text-[20px] w-[25%]">Phần trăm</th>
                                        <th className="border border-b-blue-900 text-[20px] w-[25%]">Hạn sử dụng</th>
                                        <th className="border border-b-blue-900 text-[20px] w-[25%]">Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listProductType.map((item, index) => (
                                        <tr key={item._id} className=" py-auto h-16">
                                            <th className="border border-b-slate-300 font-normal text-[18px]">{item.Name}</th>
                                            <th className="border border-b-slate-300 font-normal text-[18px]">{item.Phantram}</th>
                                            <th className="border border-b-slate-300 font-normal text-[18px]">{item.Date}</th>
                                            <th className="border border-b-slate-300 flex items-center justify-center px-6 py-4">
                                                <div className="font-normal text-[18px] gap-3 flex items-center justify-end mx-auto w-[135px]">
                                                    <div id={`e${item._id}`} onClick={() => { setId(item._id); setFiname(item.Name); setFidescribe(item.Phantram); setFdate(item.Date); setFidate(item.Date); setFname(item.Name); setFdescribe(item.Phantram); showAlter("true") }} href="#" className="cursor-pointer select-none font-medium border-[3px] px-3 py-1 rounded-2xl border-blue-600 text-blue-600 dark:text-blue-500 hover:text-white hover:bg-blue-500">Sửa</div>
                                                    <div
                                                        key={index}
                                                        ref={(el) => (divRefs.current[index] = el)}
                                                        onClick={() => {
                                                            setIsdelete(item._id);
                                                            sClickdelete();
                                                        }} id={`d${item._id}`} href="#" className={`cursor-pointer select-none font-medium border-[3px] ${isdelete === item._id ? "w-36" : "w-16"} h-10 flex text-center justify-center items-center transition-all duration-300 rounded-2xl border-red-600 text-red-600 dark:text-red-500 hover:text-white hover:bg-red-500`}>Xóa</div>
                                                </div>
                                            </th>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>


                        </div>

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

                        <div name='popup_add' className={` ${addTypeHeigh ? "h-screen" : "h-0"} bg-slate-600 z-30 bg-blur-100 transition-all duration-100 flex justify-center items-center flex-col top-0 left-0 bg-opacity-45 fixed w-full`}>
                            <div className={`${addTypeHeigh ? "visable" : "hidden"} pb-8 w-[850px] bg-white rounded-lg flex flex-col items-center`}>
                                <div className="w-full h-[70px] bg-slate-300 relative rounded-t-lg flex justify-center items-center text-[28px] font-semibold">
                                    THÊM MÃ GIẢM GIÁ
                                    <button
                                        type="button"
                                        onClick={() => showAlter(false)}
                                        className="absolute right-4 text-gray-400 hover:text-gray-500"
                                    >
                                        <span className="absolute -inset-0.5" />
                                        <span className="sr-only">Close panel</span>
                                        <XMarkIcon aria-hidden="true" className="h-9 w-9" />
                                    </button>
                                </div>
                                <form onSubmit={addProductType} className="p-2 w-[80%] flex flex-col items-center">
                                    <div className="flex flex-wrap -mx-3 mb-2 w-full">
                                        <div className="w-full px-3">
                                            <label
                                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 pt-2"
                                                htmlFor="grid-name"
                                            >
                                                Mã giảm giá
                                            </label>
                                            <input
                                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                id="grid-name"
                                                value={name}
                                                type="text"
                                                placeholder="Nhập mã giảm giá"
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap -mx-3 mb-6 w-full">
                                        <div className="w-full px-3">
                                            <label
                                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                htmlFor="grid-name"
                                            >
                                                Phần trăm
                                            </label>
                                            <input
                                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                id="grid-name"
                                                value={describe}
                                                type="text"
                                                placeholder="Nhập phần trăm"
                                                onChange={(e) => setDescribe(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap -mx-3 mb-6 w-full">
                                        <div className="w-full px-3">
                                            <label
                                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                htmlFor="grid-name"
                                            >
                                                Hạn sử dụng
                                            </label>
                                            <input
                                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                id="grid-name"
                                                type="date"
                                                placeholder="Nhập phần trăm"
                                                value={date}
                                                onChange={(e) => setDate(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="text-red-600 w-full">{isErr ? isErr : ''}</div>

                                    <button type="submit" className="border-2 uppercase font-medium w-[50%] flex items-center justify-center border-blue-600 rounded-lg px-3 py-2 text-gray-600 cursor-pointer hover:bg-blue-600 hover:text-blue-200">
                                        Thêm
                                    </button>
                                </form>
                            </div>
                        </div>

                        <div name='popup_alter' className={` ${alterTypeHeigh ? "h-screen" : "h-0"} bg-slate-600 z-30 transition-all duration-100 flex justify-center items-center flex-col top-0 left-0 bg-opacity-45 fixed w-full`}>
                            <div className={`${alterTypeHeigh ? "visable" : "hidden"} pb-8 w-[850px] bg-white rounded-lg flex flex-col items-center`}>
                                <div className="w-full h-[15%] bg-slate-300 relative rounded-t-lg flex justify-center items-center text-[28px] font-semibold">
                                    SỬA MÃ GIẢM GIÁ
                                    <button
                                        type="button"
                                        onClick={() => showAlter(false)}
                                        className="absolute right-4 text-gray-400 hover:text-gray-500"
                                    >
                                        <span className="absolute -inset-0.5" />
                                        <span className="sr-only">Close panel</span>
                                        <XMarkIcon aria-hidden="true" className="h-9 w-9" />
                                    </button>
                                </div>

                                <div className="font-semibold pt-2 text-xl">{finame} - {fidescribe}</div>
                                <div style={{ fontWeight: '550' }} className=""></div>

                                <form onSubmit={alterProductType} className="p-2 w-[80%] flex flex-col items-center">
                                    <div className="flex flex-wrap -mx-3 mb-2 w-full">
                                        <div className="w-full px-3">
                                            <label
                                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 pt-2"
                                                htmlFor="grid-name"
                                            >
                                                Mã giảm giá
                                            </label>
                                            <input
                                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                id="grid-name"
                                                type="text"
                                                value={fname}
                                                placeholder="Nhập mã giảm giá"
                                                onChange={(e) => setFname(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap -mx-3 mb-6 w-full">
                                        <div className="w-full px-3">
                                            <label
                                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                htmlFor="grid-name"
                                            >
                                                Phần trăm
                                            </label>
                                            <input
                                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                id="grid-name"
                                                type="text"
                                                value={fdescribe}
                                                placeholder="Nhập phần trăm"
                                                onChange={(e) => setFdescribe(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap -mx-3 mb-6 w-full">
                                        <div className="w-full px-3">
                                            <label
                                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                htmlFor="grid-name"
                                            >
                                                Hạn sử dụng
                                            </label>
                                            <input
                                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                id="grid-name"
                                                type="date"
                                                placeholder="Nhập phần trăm"
                                                value={fdate}
                                                onChange={(e) => setFdate(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="text-red-600 w-full">{isErr ? isErr : ''}</div>

                                    <button type="submit" className="border-2 uppercase font-medium w-[50%] flex items-center justify-center border-blue-600 rounded-lg px-3 py-2 text-gray-600 cursor-pointer hover:bg-blue-600 hover:text-blue-200">
                                        Sửa
                                    </button>
                                </form>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}

export default Voucher