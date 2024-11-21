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

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/actions'

const Shop = () => {

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    const dispatch = useDispatch()
    const [url, setUrl] = useState('')
    const [productlist, setProductlist] = useState([])
    
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
    

    const loadProduct = async (e) => {
        dispatch(actions.loadProduct())
            .then((response) => {
                if (response.data.success) {
                    setProductlist(response.data.list)
                }
                else {
                    console.log('Loi')
                }
            });
    }
    useEffect(() => {
        loadProduct()
    }, [])


    const sortOptions = [
        { name: 'Most Popular', href: '#', current: true },
        { name: 'Best Rating', href: '#', current: false },
        { name: 'Newest', href: '#', current: false },
        { name: 'Price: Low to High', href: '#', current: false },
        { name: 'Price: High to Low', href: '#', current: false },
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
                                        Sắp xếp
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
                                            <MenuItem key={option.name}>
                                                <a
                                                    href={option.href}
                                                    className={classNames(
                                                        option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                                        'block px-4 py-2 text-sm data-[focus]:bg-gray-100',
                                                    )}
                                                >
                                                    {option.name}
                                                </a>
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
                                            Hãng
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
                                                <MenuItem key={option.name}>
                                                    <a
                                                        href={option.href}
                                                        className={classNames(
                                                            option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                                            'block px-4 py-2 text-sm data-[focus]:bg-gray-100',
                                                        )}
                                                    >
                                                        {option.name}
                                                    </a>
                                                </MenuItem>
                                            ))}
                                        </div>
                                    </MenuItems>
                                </Menu>
                            </div>

                        </div>
                    </div>

                    <div className='ml-[25px]'>
                        <div className=' h-[50px] flex justify-center align-middle pt-1'>
                            <div className="flex items-center">
                                <Menu as="div" className="relative inline-block text-left">
                                    <div className=''>
                                        <MenuButton className="group inline-flex justify-center text-2xl font-medium text-gray-700 hover:text-gray-900">
                                            Loại
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
                                                <MenuItem key={option.name}>
                                                    <a
                                                        href={option.href}
                                                        className={classNames(
                                                            option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                                            'block px-4 py-2 text-sm data-[focus]:bg-gray-100',
                                                        )}
                                                    >
                                                        {option.name}
                                                    </a>
                                                </MenuItem>
                                            ))}
                                        </div>
                                    </MenuItems>
                                </Menu>
                            </div>

                        </div>
                    </div>

                </div>

                <div className='w-[1100px] h-[50px] bg-gray-300'></div>                

                <div className="bg-gray-50">
                    <div className="mx-auto max-w-2xl px-4 py-16 !pt-2 sm:px-6 sm:py-24 lg:max-w-[1100px] lg:px-8">
                        <h2 className="sr-only">Products</h2>

                        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                            {productlist.map((product) => (
                                <a key={product.id} href={"product.href"} className="group">
                                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                                        <img
                                            alt={product.Name}
                                            src={product.Image}
                                            className="h-full w-full object-cover object-center group-hover:opacity-75"
                                        />
                                    </div>
                                    <h3 className="mt-4 text-left text-sm text-gray-700">{product.Name}</h3>
                                    <div className="mt-1 w-full justify-center text-left text-lg font-medium text-gray-900">{product.PriceSale} đ</div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
                <Footer />
            </div >
        </div>
    )
}

export default Shop;