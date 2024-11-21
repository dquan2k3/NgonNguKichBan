import React from 'react'
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { } from '@fortawesome/free-solid-svg-icons';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { faFacebookF, faInstagram, faTwitter, faYoutube, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from 'react-router-dom';
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions';


export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false)
  const { isLoggedIn } = useSelector(state => state.auth)

  const Logout = async (e) => {
    dispatch(actions.logout())
  }

  useEffect(() => {
    if (open) {
      setOpen(true);
    }
  }, [open]);

  const products = [
    {
      id: 1,
      name: 'Throwback Hip Bag',
      href: '#',
      color: 'Salmon',
      price: '$90.00',
      quantity: 1,
      imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
      imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
    },
    {
      id: 2,
      name: 'Medium Stuff Satchel',
      href: '#',
      color: 'Blue',
      price: '$32.00',
      quantity: 1,
      imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
      imageAlt:
        'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
    },
    // More products...
  ]

  return (
    <div className="w-full h-[30px] bg-[#222222] flex items-center justify-center z-50">
      <div className="w-[1100px] mx-auto my-auto flex justify-between">
        <div className="h-[30px] w-max flex item-center">
          <FontAwesomeIcon className="size-6 text-white hover:text-blue-500 cursor-pointer my-auto mx-[10px]" icon={faFacebookF} />
          <FontAwesomeIcon className="size-6 text-white hover:text-pink-600 cursor-pointer my-auto mx-[10px]" icon={faInstagram} />
          <FontAwesomeIcon className="size-6 text-white hover:text-blue-700 cursor-pointer my-auto mx-[10px]" icon={faTwitter} />
          <FontAwesomeIcon className="size-6 text-white hover:text-red-600 cursor-pointer my-auto mx-[10px]" icon={faYoutube} />
          <FontAwesomeIcon className="size-6 text-white hover:text-black cursor-pointer my-auto mx-[10px]" icon={faTiktok} />

          <h3 className="my-auto cursor-pointer text-white mx-[10px]">Hotline: 0986711162</h3>
        </div>

        <div onClick={() => setOpen(true)} className='text-white ml-auto my-auto cursor-pointer mx-[10px]'>
          <FontAwesomeIcon className='mr-2' icon={faCartShopping} />
          Giỏ hàng
        </div>
        <div name='cart' className="relative z-51" >

          <Dialog open={open} onClose={setOpen} className="relative z-40">
            <DialogBackdrop
              transition

              className="fixed z-51 inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
            />

            <div className="fixed inset-0 overflow-hidden">
              <div className="absolute inset-0 overflow-hidden z-51">
                <div className="pointer-events-none fixed inset-x-0 top-0 flex max-h-full">
                  <DialogPanel
                    transition
                    className="ml-[60%] pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:-translate-y-full"
                  >
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between">

                          <DialogTitle className="left-8 text-lg font-medium text-gray-900">Giỏ hàng</DialogTitle>
                          <div className="ml-5 flex h-7 items-center">
                            {/* <button
                              type="button"
                              onClick={() => setOpen(false)}
                              className="relative mt-0 inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-xs font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                            >
                              <span className="relative px-10 py-1 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                Đóng
                              </span>
                            </button> */}
                            <button
                              type="button"
                              onClick={() => setOpen(false)}
                              className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            >
                              <span className="absolute -inset-0.5" />
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                            </button>
                          </div>
                        </div>

                        <div className="mt-8">
                          <div className="flow-root">
                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                              {products.map((product) => (
                                <li key={product.id} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                      alt={product.imageAlt}
                                      src={product.imageSrc}
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          <a href={product.href}>{product.name}</a>
                                        </h3>
                                        <p className="ml-4">{product.price}</p>
                                      </div>
                                      <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <p className="text-gray-500">Qty {product.quantity}</p>

                                      <div className="flex">
                                        <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Ước tính</p>
                          <p>$262.00</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">Chưa tính phí ship và mã giảm giá.</p>
                        <div className="mt-6">
                          <a
                            onClick={() => navigate('/shoppingcart')}
                            className="flex items-center cursor-pointer justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                          >
                            Checkout
                          </a>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                          <p>
                            hoặc{' '}
                            <button
                              type="button"
                              onClick={() => setOpen(false)}
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                              Tiếp tục mua hàng
                              <span aria-hidden="true"> &rarr;</span>
                            </button>
                          </p>
                        </div>
                      </div>
                    </div>
                  </DialogPanel>
                </div>
              </div>
            </div>
          </Dialog>

        </div>

        {isLoggedIn ? <div className="h-[30px] w-max flex item-center">
          <h5 onClick={() => Logout()} className="my-auto cursor-pointer text-white mx-[10px]">Đăng xuất</h5>
        </div> : <div className="h-[30px] w-max flex item-center">
          <h5 onClick={() => navigate('/login')} className="my-auto cursor-pointer text-white mx-[10px]">Đăng nhập</h5>
          <h5 className="my-auto cursor-pointer text-white mx-[10px]">/</h5>
          <h5 onClick={() => navigate('/register')} className="my-auto cursor-pointer text-white mx-[10px]">Đăng ký</h5>
        </div>
        }


      </div>
    </div>
  )
}


export default Header
