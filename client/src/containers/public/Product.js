import React from 'react'
import AHeader from './AHeader'
import { faCheck, faL, faLadderWater } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useRef, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useDispatch } from 'react-redux'
import * as actions from '../../store/actions'

const Product = () => {

    const dispatch = useDispatch();
    const [addTypeHeigh, setAddTypeHeigh] = useState(false)
    const [alterTypeHeigh, setAlterTypeHeigh] = useState(false)
    const [noti, setNoti] = useState(false)
    const [name, setName] = useState('')
    const [describe, setDescribe] = useState('')
    const [price, setPrice] = useState('')
    const [imagep, setImagep] = useState(null)
    const [productType, setProductType] = useState('')
    const [priceSale, setPricesale] = useState('')
    const [quantity, setQuantity] = useState('')
    const fileInputRef = useRef(null);

    const [listProductType, setListProductType] = useState([])
    const [isErr, setIsErr] = useState(false)
    const [fname, setFname] = useState('')
    const [fdescribe, setFdescribe] = useState('')
    const [fproducttype, setFproducttype] = useState('')
    const [fprice, setFprice] = useState('')
    const [fpricesale, setFpricesale] = useState('')
    const [fquantity, setFquantity] = useState('')
    const [fimagep, setFimagep] = useState(null)


    const [id, setId] = useState('')
    const [finame, setFiname] = useState('')
    const [fiprice, setFiprice] = useState('')
    const [confirmDelete, setConfirmDelete] = useState('')
    const [isdelete, setIsdelete] = useState('')
    const [clickdelete, setClickdelete] = useState(false)
    const [clickOutside, setClickOutside] = useState(false);
    const divRefs = useRef([]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagep(file); // Lưu file ảnh vào state
        }
    };

    const handleFImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFimagep(file); // Lưu file ảnh vào state
        }
    };

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
        clearP()
        fileInputRef.current.value=""
    }

    const hideAll = () => {
        setAddTypeHeigh(false)
        setAlterTypeHeigh(false)
        setIsErr(false)
    }

    const loadProductType = async (e) => {
        dispatch(actions.loadProduct())
            .then((response) => {
                if (response.data.success) {
                    setListProductType(response.data.list)
                }
                else {
                    console.log('Loi')
                }
            });
    }


    useEffect(() => {
        loadProductType();

        const pd = document.getElementById('product');
        if (pd) {
            pd.classList.add('!text-purple-600', '!bg-white');
        }
    }, [])


    const deleteProductType = async () => {
        dispatch(actions.deleteProduct({ id: isdelete }))
            .then((response) => {
                if (response.data.success) {
                    showNoti()
                    loadProductType()
                }
            })
    }


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
                    if (elementecf) {
                        elementecf.classList.toggle('hidden');
                    }

                }, 310);
                setTimeout(() => {
                    if (elementdcf) {
                        elementdcf.innerHTML = 'Xóa'
                    }

                }, 100);

            }

            setConfirmDelete(isdelete);

        }
        else {
            if (confirmDelete) {
                const elementecf = document.getElementById(`e${confirmDelete}`);
                const elementdcf = document.getElementById(`d${confirmDelete}`);
                setTimeout(() => {
                    if (elementecf) {
                        elementecf.classList.toggle('hidden');
                    }
                }, 310);
                setTimeout(() => {
                    if (elementecf) {
                        elementdcf.innerHTML = 'Xóa'
                    }
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

    const clearP = async (e) => {
        setName('')
        setDescribe('')
        setProductType('')
        setPrice('')
        setPricesale('')
        setQuantity('')
        setImagep('')
    }

    const addProductType = async (e) => {
        e.preventDefault()

        const formData = new FormData();
        formData.append('name', name);
        formData.append('productType', productType);
        formData.append('describe', describe);
        formData.append('price', price);
        formData.append('priceSale', priceSale);
        formData.append('quantity', quantity);
        formData.append('file', imagep);

        dispatch(actions.addProduct({ formData }))
            .then((response) => {
                console.log(response);
                if (response && response.data.success) {
                    console.log(response)
                    hideAll()
                    showNoti()
                    loadProductType()
                    clearP()
                    fileInputRef.current.value=""
                    
                }
                else {
                    console.log(response.data)
                    setIsErr(response.data.msg)
                }

            })
            .catch((error) => {
                console.error("Error:", error);  // In ra lỗi nếu promise bị reject
            });

        //     const response = dispatch(actions.addProductType({ name, describe }))
        //     console.log(response)
        //     response.success ? console.log('done') : console.log('???')
    }


    const clearF = async (e) => {
        setFname('')
        setFproducttype('')
        setFdescribe('')
        setFprice('')
        setFpricesale('')
        setFquantity('')
        setFimagep('')
    }
    

    const alterProductType = async (e) => {
        e.preventDefault()

        const formData = new FormData();
        formData.append('id', id);
        formData.append('fname', fname);
        formData.append('fproductType', fproducttype);
        formData.append('fdescribe', fdescribe);
        formData.append('fprice', fprice);
        formData.append('fpriceSale', fpricesale);
        formData.append('fquantity', fquantity)
        formData.append('file', fimagep);

        dispatch(actions.alterProduct({ formData }))
            .then((response) => {
                console.log(response)
                if (response && response.data.success) {
                    hideAll()
                    showNoti()
                    loadProductType()
                    clearF()
                }
                else {
                    setIsErr(response.data.msg)
                }
            })
    }
    return (

        <div className='bg-[#F3F4F6]'>
            <AHeader />
            <div name='container' s className='pl-20 pt-20 w-full h-screen '>
                <div name='task' className='m-3'>
                    <div className="">
                        <div className="text-[28px] font-medium pl-7 pt-2 bg-gray-300 border border-gray-400 rounded-t-xl flex justify-between">
                            <p className=' relative'  >SẢN PHẨM
                                <div className={`bg-green-400 w-52 ${noti ? 'max-h-10' : 'max-h-0'} z-20 overflow-hidden flex h-10 absolute text-white ease-in-out font-semibold pl-2 rounded-b-lg transition-all duration-500`}>
                                    <div className="pr-3"><FontAwesomeIcon icon={faCheck} /></div>
                                    Thành công
                                </div>
                            </p>
                            <button onClick={() => showAdd(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-semibold text-xl px-4 rounded text-center h-9 mr-3">
                                Thêm
                            </button>
                        </div>

                        <div name='tablecontainer' className="max-h-[700px] w-full overflow-y-auto relative">
                            <table className="w-full border-separate border-spacing-0">
                                <thead className='bg-gray-200 sticky -top-1 z-10 '>
                                    <tr className="w-full">
                                        <th className="border border-b-blue-900 text-[20px] w-[15%]">Tên sản phẩm</th>
                                        <th className="border border-b-blue-900 text-[20px] w-[15%]">Loại sản phẩm</th>
                                        <th className="border border-b-blue-900 text-[20px] w-[20%]">Mô tả</th>
                                        <th className="border border-b-blue-900 text-[20px] w-[10%]">Giá</th>
                                        <th className="border border-b-blue-900 text-[20px] w-[10%]">Giá sale</th>
                                        <th className="border border-b-blue-900 text-[20px] w-[5%]">Số lượng</th>
                                        <th className="border border-b-blue-900 text-[20px] w-[15%]">Ảnh</th>
                                        <th className="border border-b-blue-900 text-[20px] w-[10%]">Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listProductType.map((item, index) => (
                                        <tr key={item._id} className=" py-auto h-16">
                                            <th className="border border-b-slate-300 font-normal text-[18px]">{item.Name}</th>
                                            <th className="border border-b-slate-300 font-normal text-[18px]">{item.ProductType}</th>
                                            <th className="border border-b-slate-300 font-normal text-[18px]">{item.Describe}</th>
                                            <th className="border border-b-slate-300 font-normal text-[18px]">{item.Price.toLocaleString()}</th>
                                            <th className="border border-b-slate-300 font-normal text-[18px]">{item.PriceSale.toLocaleString()}</th>
                                            <th className="border border-b-slate-300 font-normal text-[18px]">{item.Quantity}</th>
                                            <th className="border border-b-slate-300 font-normal text-[18px] p-2 flex justify-center items-center"><img src={item.Image} className='h-[120px]'></img></th>
                                            <th className="border border-b-slate-300 items-center justify-center px-6 py-4">
                                                <div className="font-normal text-[18px] gap-3 flex items-center justify-end mx-auto w-[120px]">
                                                    <div id={`e${item._id}`} onClick={() => { setId(item._id); setFiname(item.Name); setFiprice(item.Price); setFname(item.Name); setFdescribe(item.Describe); setFproducttype(item.ProductType); setFprice(item.Price); setFpricesale(item.PriceSale); setFimagep(item.Image); setFquantity(item.Quantity); showAlter(true) }} href="#" className="cursor-pointer select-none font-medium border-[3px] px-3 py-1 rounded-2xl border-blue-600 text-blue-600 dark:text-blue-500 hover:text-white hover:bg-blue-500">Sửa</div>
                                                    <div
                                                        key={index}
                                                        ref={(el) => (divRefs.current[index] = el)}
                                                        onClick={() => {
                                                            setIsdelete(item._id);
                                                            sClickdelete();
                                                        }} id={`d${item._id}`} href="#" className={`cursor-pointer select-none font-medium border-[3px] ${isdelete == item._id ? "w-36" : "w-16"} h-10 flex text-center justify-center items-center transition-all duration-300 rounded-2xl border-red-600 text-red-600 dark:text-red-500 hover:text-white hover:bg-red-500`}>Xóa</div>
                                                </div>
                                            </th>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div name='popup_add' className={` ${addTypeHeigh ? "h-screen" : "h-0"} bg-slate-600 z-30 bg-blur-100 transition-all duration-100 flex justify-center items-center flex-col top-0 left-0 bg-opacity-45 fixed w-full`}>
                            <div className={`${addTypeHeigh ? "visable" : "hidden"} pb-8 w-[850px] bg-white rounded-lg flex flex-col items-center`}>
                                <div className="w-full h-[70px] bg-slate-300 relative rounded-t-lg flex justify-center items-center text-[28px] font-semibold">
                                    THÊM SẢN PHẨM
                                    <button
                                        type="button"
                                        onClick={() => showAdd(false)}
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
                                                Tên sản phẩm
                                            </label>
                                            <input
                                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                id="grid-name"
                                                type="text"
                                                placeholder="Nhập loại sản phẩm"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap -mx-3 mb-2 w-full">
                                        <div className="w-full px-3">
                                            <label
                                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 pt-2"
                                                htmlFor="grid-name"
                                            >
                                                Loại sản phẩm
                                            </label>
                                            <input
                                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                id="grid-name"
                                                type="text"
                                                placeholder="Nhập loại sản phẩm"
                                                value={productType}
                                                onChange={(e) => setProductType(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap -mx-3 mb-6 w-full">
                                        <div className="w-full px-3">
                                            <label
                                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                htmlFor="grid-name"
                                            >
                                                Mô tả
                                            </label>
                                            <input
                                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                id="grid-name"
                                                type="text"
                                                placeholder="Nhập mô tả"
                                                value={describe}
                                                onChange={(e) => setDescribe(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap -mx-3 mb-3 -mt-2 w-full">
                                        <div className="w-full px-3">
                                            <label
                                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                htmlFor="grid-name"
                                            >
                                                Giá
                                            </label>
                                            <input
                                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                id="grid-name"
                                                type="text"
                                                placeholder="Nhập mô tả"
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap -mx-3 mb-2 w-full">
                                        <div className="w-full px-3">
                                            <label
                                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 pt-2"
                                                htmlFor="grid-name"
                                            >
                                                Giá sale
                                            </label>
                                            <input
                                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                id="grid-name"
                                                type="text"
                                                placeholder="Nhập loại sản phẩm"
                                                value={priceSale}
                                                onChange={(e) => setPricesale(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap -mx-3 mb-2 w-full">
                                        <div className="w-full px-3">
                                            <label
                                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 pt-2"
                                                htmlFor="grid-name"
                                            >
                                                Số lượng
                                            </label>
                                            <input
                                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                id="grid-name"
                                                type="text"
                                                placeholder="Nhập loại sản phẩm"
                                                value={quantity}
                                                onChange={(e) => setQuantity(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap -mx-3 mb-6 w-full">
                                        <div className="w-full px-3">
                                            <label
                                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                htmlFor="grid-name"
                                            >
                                                Ảnh
                                            </label>
                                            <input
                                                type="file"
                                                id="image"
                                                accept="image/*"
                                                ref={fileInputRef}
                                                onChange={handleImageChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="text-red-600 w-full">{isErr}</div>

                                    <button type="submit" className="border-2 uppercase font-medium w-[50%] flex items-center justify-center border-blue-600 rounded-lg px-3 py-2 text-gray-600 cursor-pointer hover:bg-blue-600 hover:text-blue-200">
                                        Thêm
                                    </button>
                                </form>
                            </div>
                        </div>

                        <div name='popup_alter' className={` ${alterTypeHeigh ? "h-screen" : "h-0"} bg-slate-600 z-30 transition-all duration-100 flex justify-center items-center flex-col top-0 left-0 bg-opacity-45 fixed w-full`}>
                            <div className={`${alterTypeHeigh ? "visable" : "hidden"} pb-8 w-[850px] bg-white rounded-lg flex flex-col items-center`}>
                                <div className="w-full h-[15%] bg-slate-300 relative rounded-t-lg flex justify-center items-center text-[28px] font-semibold">
                                    SỬA SẢN PHẨM
                                    <button
                                        type="button"
                                        onClick={() => {showAlter(false); clearF()}}
                                        className="absolute right-4 text-gray-400 hover:text-gray-500"
                                    >
                                        <span className="absolute -inset-0.5" />
                                        <span className="sr-only">Close panel</span>
                                        <XMarkIcon aria-hidden="true" className="h-9 w-9" />
                                    </button>
                                </div>

                                <div className="font-semibold pt-2 text-xl">{finame} - {fiprice}</div>
                                <div style={{ fontWeight: '550' }} className=""></div>

                                <form onSubmit={alterProductType} className="p-2 w-[80%] flex flex-col items-center">
                                    <div className="flex flex-wrap -mx-3 mb-2 w-full">
                                        <div className="w-full px-3">
                                            <label
                                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 pt-2"
                                                htmlFor="grid-name"
                                            >
                                                Sản phẩm
                                            </label>
                                            <input
                                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                id="grid-name"
                                                type="text"
                                                value={fname}
                                                placeholder="Nhập loại sản phẩm"
                                                onChange={(e) => setFname(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap -mx-3 mb-2 w-full">
                                        <div className="w-full px-3">
                                            <label
                                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 pt-2"
                                                htmlFor="grid-name"
                                            >
                                                Loại sản phẩm
                                            </label>
                                            <input
                                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                id="grid-name"
                                                type="text"
                                                value={fproducttype}
                                                placeholder="Nhập loại sản phẩm"
                                                onChange={(e) => setFproducttype(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap -mx-3 mb-6 w-full">
                                        <div className="w-full px-3">
                                            <label
                                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                htmlFor="grid-name"
                                            >
                                                Mô tả
                                            </label>
                                            <input
                                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                id="grid-name"
                                                type="text"
                                                value={fdescribe}
                                                placeholder="Nhập mô tả"
                                                onChange={(e) => setFdescribe(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap -mx-3 mb-2 w-full">
                                        <div className="w-full px-3">
                                            <label
                                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 pt-2"
                                                htmlFor="grid-name"
                                            >
                                                Giá
                                            </label>
                                            <input
                                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                id="grid-name"
                                                type="text"
                                                value={fprice}
                                                placeholder="Nhập loại sản phẩm"
                                                onChange={(e) => setFprice(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap -mx-3 mb-2 w-full">
                                        <div className="w-full px-3">
                                            <label
                                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 pt-2"
                                                htmlFor="grid-name"
                                            >
                                                Giá sale
                                            </label>
                                            <input
                                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                id="grid-name"
                                                type="text"
                                                value={fpricesale}
                                                placeholder="Nhập loại sản phẩm"
                                                onChange={(e) => setFpricesale(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap -mx-3 mb-2 w-full">
                                        <div className="w-full px-3">
                                            <label
                                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 pt-2"
                                                htmlFor="grid-name"
                                            >
                                                Số lượng
                                            </label>
                                            <input
                                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                id="grid-name"
                                                type="text"
                                                value={fquantity}
                                                placeholder="Nhập loại sản phẩm"
                                                onChange={(e) => setFquantity(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap -mx-3 mb-2 w-full">
                                        <div className="w-full px-3">
                                            <label
                                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 pt-2"
                                                htmlFor="grid-name"
                                            >
                                                Ảnh
                                            </label>
                                            <input
                                                type="file"
                                                id="image"
                                                accept="image/*"
                                                onChange={handleFImageChange}
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

                        {/* <div name='popup_delete' className={` ${deleteTypeHeigh ? "h-screen" : "h-0"} bg-slate-600 transition-all duration-100 flex justify-center items-center flex-col top-0 left-0 bg-opacity-45 fixed w-full`}>
                <div className={`${deleteTypeHeigh ? "visable" : "hidden"} h-[500px] w-[850px] bg-white rounded-lg`}>
                    <div className="w-full h-[15%] bg-slate-300 relative rounded-t-lg flex justify-center items-center text-[28px] font-semibold">
                        XOÁ SẢN PHẨM
                        <button
                            type="button"
                            onClick={() => showDelete(false)}
                            className="absolute right-4 text-gray-400 hover:text-gray-500"
                        >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon aria-hidden="true" className="h-9 w-9" />
                        </button>
                    </div>
                </div>
            </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product