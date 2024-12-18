import Header from './THeader';
import BHeader from './BHeader';
import Footer from './Footer';
import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
} from '@headlessui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/actions'
import { useNavigate } from 'react-router-dom';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const Shop = () => {
    const navigate = useNavigate()

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    const dispatch = useDispatch()
    const [url, setUrl] = useState('')
    const [productlist, setProductlist] = useState([])
    const [page, setPage] = useState(1)
    const [pagelist, setPagelist] = useState([]);
    const [pagecount, setPagecount] = useState(1);
    const [listProductTypeee, setListProductTypeee] = useState([])
    const [typeselect, setTypeselect] = useState('Loại')
    const [sapxep, setSapxep] = useState('Sắp xếp')
    const [minPrice, setMinPrice] = useState(-1);
    const [maxPrice, setMaxPrice] = useState(-1);
    const [minPricee, setMinPricee] = useState(0);
    const [maxPricee, setMaxPricee] = useState(0);

    // useEffect(() => {
    //     if (productlist.length > 0) {
    //         const prices = productlist.map(product => product.PriceSale);
    //         console.log('aaaa', prices)
    //         setMaxPricee(Math.max(...prices));
    //         setMinPricee(Math.min(...prices));
    //     }
    // }, [productlist]);

    // useEffect(() => {
    //     if (productlist.length > 0) {
    //         setMinPrice(minPricee)
    //         setMaxPrice(maxPricee)
    //     }
    // }, [minPricee, maxPricee]);

    useEffect(() => {
        dispatch(actions.loadBanner())
            .then((response) => {
                if (response.data.success) {
                    setUrl(response.data.Url)
                }
                else {
                    setUrl(response.data.msg);
                }
            })
    }, [])


    const loadProduct = async (limit = 20) => {
        dispatch(actions.loadProduct(page, limit, typeselect, sapxep, minPrice, maxPrice))
            .then((response) => {
                if (response.data.success) {
                    const newList = Array.from({ length: response.data.totalPages }, (_, i) => i + 1);
                    setPagelist(newList);
                    console.log(newList)
                    setMinPricee(response.data.minPrice)
                    setMaxPricee(response.data.maxPrice)
                    setPagecount(response.data.totalPages)
                    setProductlist(response.data.list)
                }
                else {
                    console.log('Loi')
                }
            });
    }


    // useEffect(() => {
    //     if(typeselect === 'Loại' && sapxep === 'Sắp xếp'){return}
    //     loadProductfilter()
    // }, [typeselect, sapxep])

    const loadProductTypeee = async (e) => {
        dispatch(actions.loadProductType())
            .then((response) => {
                if (response.data.success) {
                    setListProductTypeee(response.data.list)
                }
                else {
                    console.log('Loi')
                }
            });
    }

    const loc = async () => {
        setMinPrice(minPricee)
        setMaxPrice(maxPricee)
    }


    useEffect(() => {
        loadProduct()
    }, [page, typeselect, sapxep, minPrice, maxPrice])

    useEffect(() => {
        loadProductTypeee()
    }, [])

    useEffect(() => {
        console.log(listProductTypeee)
    }, [listProductTypeee])


    const sortOptions = [
        { Name: 'Mới nhất' },
        { Name: 'Giá thấp đến cao' },
        { Name: 'Giá cao đến thấp' },
    ]

    return (
        <div>
            <Header />
            <BHeader />
            <div className="w-full h-auto flex items-center flex-col mt-[13px] space-y-1">
                <div className='w-full'>
                    <img src={url} alt="Image" className="w-full h-[450px] object-cover" />
                </div>
                <div className='w-[1100px] flex justify-between pt-10'>
                    <div className='text-4xl font-bold text-gray-900'>TẤT CẢ SẢN PHẨM</div>

                    <div>
                        <div className="flex items-center">
                            <Menu as="div" className="relative inline-block text-left">
                                <div className='border border-gray-500 pl-2 rounded-3xl hover:bg-gray-100'>
                                    <MenuButton className="group inline-flex justify-center text-2xl font-medium text-gray-700 hover:text-gray-900">
                                        {sapxep}
                                        <ChevronDownIcon
                                            aria-hidden="true"
                                            className="-mr-1 ml-1 h-9 w-9 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                        />
                                    </MenuButton>
                                </div>

                                <MenuItems
                                    transition
                                    className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                >
                                    <div className="py-1">
                                        {sortOptions.map((option) => (
                                            <MenuItem key={option.Name}>
                                                <div onClick={() => setSapxep(option.Name)}
                                                    className={classNames(
                                                        option.Name == sapxep ? 'font-medium text-gray-900 bg-gray-200' : 'text-gray-500',
                                                        'block px-4 py-2 text-sm data-[focus]:bg-gray-100 cursor-pointer',
                                                    )}
                                                >
                                                    {option.Name}
                                                </div>
                                            </MenuItem>
                                        ))}
                                    </div>
                                </MenuItems>
                            </Menu>
                        </div>

                    </div>

                </div>

                <div className='w-[1100px] pt-5 pb-0 flex items-center '>
                    <FontAwesomeIcon className='h-7 text-2xl font-bold text-gray-600' icon={faFilter} />
                    <div className='text-2xl font-bold text-gray-600'>Filter</div>

                    <div className='ml-[25px]'>
                        <div className=' h-[50px] flex justify-center align-middle pt-1'>
                            <div className="flex items-center">
                                <Menu as="div" className="relative inline-block text-left">
                                    <div className=''>
                                        <MenuButton className="group inline-flex justify-center text-2xl font-medium text-gray-700 hover:text-gray-900">
                                            {typeselect}
                                            <ChevronDownIcon
                                                aria-hidden="true"
                                                className="-mr-1 ml-1 h-9 w-9 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                            />
                                        </MenuButton>
                                    </div>

                                    <MenuItems
                                        transition
                                        className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                    >
                                        <div className="py-1">
                                            {listProductTypeee.map((option) => (
                                                <MenuItem key={option.Name}>
                                                    <div onClick={() => setTypeselect(option.Name)} className={`${option.Name == typeselect ? 'font-medium text-gray-900 !bg-gray-200' : 'text-gray-700'} block px-4 py-2 text-sm font-semibold data-[focus]:bg-gray-100 cursor-pointer`}>
                                                        {option.Name ? option.Name : 'Loại'}
                                                    </div>
                                                </MenuItem>
                                            ))}
                                        </div>
                                    </MenuItems>
                                </Menu>
                            </div>

                        </div>
                    </div>
                    <div className="price-input flex items-center space-x-4 ml-3">
                        {/* Min Price Input */}
                        <div className="field flex-1">
                            <label htmlFor="min-price" className="block text-sm font-medium text-gray-700">
                                Giá thấp nhất
                            </label>
                            <input
                                id="max-price"
                                type="text" /* Sử dụng "text" để cho phép nhập liệu có dấu phẩy */
                                className="w-full h-7 text-gray-700 p-2 rounded focus:outline-none focus:bg-white focus:border-blue-500 border"
                                placeholder="Nhập giá cao nhất"
                                value={minPricee.toLocaleString("en-US")}
                                onChange={(e) => {
                                    const rawValue = e.target.value.replace(/,/g, ""); // Loại bỏ dấu phẩy
                                    if (!isNaN(rawValue)) {
                                        setMinPricee(Number(rawValue)); // Cập nhật giá trị số thực
                                    }
                                }}
                            />
                        </div>

                        {/* Max Price Input */}
                        <div className="field flex-1">
                            <label htmlFor="max-price" className="block text-sm font-medium text-gray-700">
                                Giá cao nhất
                            </label>
                            <input
                                id="max-price"
                                type="text" /* Sử dụng "text" để cho phép nhập liệu có dấu phẩy */
                                className="w-full h-7 text-gray-700 p-2 rounded focus:outline-none focus:bg-white focus:border-blue-500 border"
                                placeholder="Nhập giá cao nhất"
                                value={`${maxPricee.toLocaleString("en-US")}`}
                                onChange={(e) => {
                                    const rawValue = e.target.value.replace(/,/g, ""); // Loại bỏ dấu phẩy
                                    if (!isNaN(rawValue)) {
                                        setMaxPricee(Number(rawValue)); // Cập nhật giá trị số thực
                                    }
                                }}
                            />

                        </div>

                        <div onClick={() => loc()} className='w-10 h-7 bg-gray-400 rounded-sm border border-slate-700 flex items-center justify-center cursor-pointer mt-5'>
                            Lọc
                        </div>
                    </div>
                </div>

                <div className='w-[1100px] h-[50px] bg-gray-300 flex pl-4 gap-2'>
                    {typeselect != 'Loại' ?
                        <div className='my-auto font-semibold bg-gray-300 h-8 min-w-14 rounded-2xl flex justify-center items-center p-2 border-2 border-slate-700 gap-2'>
                            {typeselect}
                            <div onClick={() => setTypeselect('Loại')} className='w-5 h-5 rounded-2xl bg-slate-700 flex items-center justify-center cursor-pointer'>
                                <FontAwesomeIcon className='text-white' icon={faXmark} />
                            </div>
                        </div> : <div></div>}
                    {sapxep != 'Sắp xếp' ?
                        <div className='my-auto font-semibold bg-gray-300 h-8 min-w-14 rounded-2xl flex justify-center items-center p-2 border-2 border-slate-700 gap-2'>
                            {sapxep}
                            <div onClick={() => setSapxep('Sắp xếp')} className='w-5 h-5 rounded-2xl bg-slate-700 flex items-center justify-center cursor-pointer'>
                                <FontAwesomeIcon className='text-white' icon={faXmark} />
                            </div>
                        </div> : <div></div>}
                    {minPrice !== -1 && maxPrice !== -1 ?
                        <div className='my-auto font-semibold bg-gray-300 h-8 min-w-14 rounded-2xl flex justify-center items-center p-2 border-2 border-slate-700 gap-2'>
                            Từ {minPrice.toLocaleString()} đ đến {maxPrice.toLocaleString()} đ
                            <div onClick={() => {setMinPrice(-1); setMaxPrice(-1)}} className='w-5 h-5 rounded-2xl bg-slate-700 flex items-center justify-center cursor-pointer'>
                                <FontAwesomeIcon className='text-white' icon={faXmark} />
                            </div>
                        </div> : <div></div>}
                </div>

                <div className="bg-gray-50">
                    <div className="mx-auto max-w-2xl px-4 py-16 !pt-2 sm:px-6 sm:py-24 lg:max-w-[1100px] lg:px-8">
                        <h2 className="sr-only">Products</h2>

                        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                            {productlist.map((product) => (
                                <div key={product._id} onClick={() => navigate(`/productDetails?id=${product._id}`)} className="group cursor-pointer">
                                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                                        <img
                                            alt={product.Name}
                                            src={product.Image}
                                            className="h-full w-full object-cover object-center group-hover:opacity-75"
                                        />
                                    </div>
                                    <h3 className="mt-4 text-left text-sm text-gray-700">{product.Name}</h3>
                                    <div className='flex '>
                                        <div className="mt-1 text-left text-lg font-medium text-gray-900">{product.PriceSale ? product.PriceSale.toLocaleString() : product.price.toLocaleString()} đ</div>
                                        <div className="mt-1 text-sm text-gray-500 line-through pl-4">{product.PriceSale ? product.Price.toLocaleString() : ''} đ</div>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
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


                <Footer />
            </div >
        </div>
    )
}

export default Shop;