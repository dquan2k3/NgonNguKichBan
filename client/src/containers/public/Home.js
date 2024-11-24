import React, { act, useEffect, useRef, useState } from "react";
import Header from './THeader';
import BHeader from './BHeader';
import Footer from './Footer';
import test from '../../images/test.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const listRef = useRef(null);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [active, setActive] = useState(0);
  const refreshIntervalRef = useRef(null);
  const itemsRef = useRef([]);
  const dotsRef = useRef([]);
  const [productlist, setProductlist] = useState([])
  const [saleproducts, setSaleproducts] = useState([])
  const [hotproducts, setHotproducts] = useState([])
  const saleref = useRef(null);
  const [banner, setBanner] = useState([])


  const loadProduct = async (e) => {
    dispatch(actions.loadProduct())
      .then((response) => {
        if (response && response.data.success) {
          setProductlist(response.data.list)
        }
        else {
          console.log('Loi')
        }
      });
  }


  const loadBanner = async (e) => {
    dispatch(actions.loadBannerhome())
      .then((response) => {
        if (response && response.data.success) {
          setBanner(response.data.list)
        }
      })
  }

  const loadSaleProduct = async (e) => {
    dispatch(actions.renderSaleProduct())
      .then((response) => {
        if (response && response.data.success) {
          console.log(response.data.saleproducts)
          setSaleproducts(response.data.saleproducts)
        }
        else {
          console.log('Loi')
        }
      })
  }

  const loadHotProduct = async (e) => {
    dispatch(actions.renderHotProduct())
      .then((response) => {
        if (response && response.data.success) {
          setHotproducts(response.data.hotproducts)
        }
        else {
          console.log('Loi')
        }
      })
  }

  useEffect(() => {
    loadBanner()
    loadProduct()
    loadSaleProduct()
    loadHotProduct()
  }, [])




  const carouselRef = useRef(null);

  const scrollLeft = () => {
    const wid = saleref.current.getBoundingClientRect().width;
    carouselRef.current.scrollBy({ left: -wid - 30, behavior: "smooth" });
  };

  const scrollRight = () => {
    const wid = saleref.current.getBoundingClientRect().width;
    carouselRef.current.scrollBy({ left: wid - 30, behavior: "smooth" });
  };

  const formatNumberWithComma = (number) => {
    return number.toLocaleString("en-US");
  };



  useEffect(() => {
    const list = listRef.current;
    const items = list.querySelectorAll(".item");
    const dots = list.querySelectorAll(".dots li");

    itemsRef.current = items;
    dotsRef.current = dots;

    const nextButton = document.getElementById("next");
    const prevButton = document.getElementById("prev");

    const handleNext = () => {
      setActive((prev) => (prev + 1 < items.length ? prev + 1 : 0));
    };

    const handlePrev = () => {
      setActive((prev) => (prev - 1 >= 0 ? prev - 1 : items.length - 1));
    };

    nextButton.addEventListener("click", handleNext);
    prevButton.addEventListener("click", handlePrev);

    refreshIntervalRef.current = setInterval(() => {
      handleNext();
    }, 3000);

    return () => {
      nextButton.removeEventListener("click", handleNext);
      prevButton.removeEventListener("click", handlePrev);
      clearInterval(refreshIntervalRef.current);
    };
  }, []);

  useEffect(() => {
    const list = listRef.current;
    const items = itemsRef.current;
    const dots = dotsRef.current;

    if (items[active]) {
      const offsetLeft = items[active].offsetLeft;
      list.style.left = -offsetLeft + "px";

      dots.forEach((dot, index) => {
        if (index === active) {
          dot.classList.add("active");
        } else {
          dot.classList.remove("active");
        }
      });

      clearInterval(refreshIntervalRef.current);
      refreshIntervalRef.current = setInterval(() => {
        document.getElementById("next").click();
      }, 5000);
    }
  }, [active]);

  const handleDotClick = (index) => {
    setActive(index);
  };


  const testimonials = [
    {
      name: "Kenzie Edgar",
      image: "https://i.pravatar.cc/100?img=1",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos sunt ratione dolor exercitationem minima quas itaque saepe quasi architecto vel! Accusantium, vero sint recusandae cum tempora nemo commodi soluta deleniti."
    },
    {
      name: "Stevie Tifft",
      image: "https://i.pravatar.cc/100?img=2",
      text: "Lorem ipsum, dolor sit amet, consectetur adipisicing elit. Dolore quod necessitatibus, labore sapiente, est, dignissimos ullam error ipsam sint quam tempora vel."
    },
    {
      name: "Tommie Ewart",
      image: "https://i.pravatar.cc/100?img=3",
      text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae, obcaecati ullam excepturi dicta error deleniti sequi."
    },
    {
      name: "Charlie Howse",
      image: "https://i.pravatar.cc/100?img=4",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto inventore voluptatum nostrum atque, corrupti, vitae esse id accusamus dignissimos neque reprehenderit natus, hic sequi itaque dicta nisi voluptatem! Culpa, iusto."
    },
    {
      name: "Nevada Herbertson",
      image: "https://i.pravatar.cc/100?img=5",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, voluptatem porro obcaecati dicta, quibusdam sunt ipsum, laboriosam nostrum facere exercitationem pariatur deserunt tempora molestiae assumenda nesciunt alias eius? Illo, autem!"
    },
    {
      name: "Kris Stanton",
      image: "https://i.pravatar.cc/100?img=6",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem iusto, explicabo, cupiditate quas totam!"
    }
  ];

  return (
    <div>
      <Header />
      <BHeader class="" />
      <div className="w-full h-auto flex items-center flex-col space-y-1">
        <div id="banner" className="relative overflow-hidden max-w-full w-[1100px] h-[620px] m-3">
          <div className="slider relative overflow-hidden w-full h-full">
            <div ref={listRef} className="list flex absolute transition-all duration-1000 w-full h-full">
              {banner.map((banner, index) => (
                <div key={banner._id} className="item min-h-max min-w-max">
                  <img src={banner.Url} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

            <div className="buttons absolute top-1/2 left-5 w-[96%] flex justify-between transform -translate-y-1/2">
              <button id="prev" className="flex justify-center items-center duration-500 transform transition-all text-center w-12 h-12 bg-white bg-opacity-50 rounded-full text-white font-bold text-xl hover:bg-gray-300 hover:text-3xl hover:text-gray-700 hover:translate-x-[-4px]">‹</button>
              <button id="next" className="flex justify-center items-center duration-500 transform transition-all text-center w-12 h-12 bg-white bg-opacity-50 rounded-full text-white font-bold text-xl hover:bg-gray-300 hover:text-3xl hover:text-gray-700 hover:translate-x-[4px]">›</button>
            </div>

            <ul className="dots flex justify-center absolute bottom-2 left-0 w-full">
              {banner.map((banner, index) => (
                <li
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`w-4 h-4 bg-white rounded-full mx-2 transition-[width,height] duration-1000 cursor-pointer hover:bg-gray-400 ${active === index ? 'w-8 h-8' : ''}`}
                />
              ))}
            </ul>
          </div>
        </div>

        <div id="trending" className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <h2 className="text-2xl font-bold text-center mb-6">SẢN PHẨM MỚI CỦA CHÚNG TÔI</h2>

            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {hotproducts.map((product) => (
                <div key={product._id} onClick={() => { navigate(`/productDetails?id=${product._id}`) }} className="group cursor-pointer">
                  <img
                    alt={product.Name}
                    src={product.Image}
                    className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-[7/8]"
                  />
                  <h3 className="mt-4 text-sm text-gray-700">{product.Name}</h3>
                  <div className="flex">
                    <p className="mt-1 text-lg font-medium text-gray-900">{product.PriceSale ? product.PriceSale.toLocaleString() : product.price.toLocaleString()} đ</p>
                    <p className="mt-1 text-sm text-gray-500 line-through pl-4">{product.PriceSale ? product.Price.toLocaleString() : ''} đ</p>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>
        <div class="flex flex-wrap justify-between items-start gap-6 p-14 w-[1100px] h-[200px] mx-auto bg-gray-100 rounded-lg shadow-lg">

          <div class="flex flex-col items-center text-center space-y-2">
            <div class="relative w-12 h-12">
              <img
                class="w-full h-full"
                src="//theme.hstatic.net/200000065946/1001264503/14/vice_item_1_thumb.png?v=546"
                alt="Giao Hàng &amp; Lắp Đặt"
              />
            </div>
            <div class="text">
              <div class="text-lg font-semibold">Giao Hàng &amp; Lắp Đặt</div>
              <div class="text-sm text-gray-500">Miễn Phí</div>
            </div>
          </div>


          <div class="flex flex-col items-center text-center space-y-2">
            <div class="relative w-12 h-12">
              <img
                class="w-full h-full"
                src="//theme.hstatic.net/200000065946/1001264503/14/vice_item_2_thumb.png?v=546"
                alt="Đổi Trả 1 - 1"
              />
            </div>
            <div class="text">
              <div class="text-lg font-semibold">Đổi Trả 1 - 1</div>
              <div class="text-sm text-gray-500">Miễn Phí</div>
            </div>
          </div>


          <div class="flex flex-col items-center text-center space-y-2">
            <div class="relative w-12 h-12">
              <img
                class="w-full h-full"
                src="//theme.hstatic.net/200000065946/1001264503/14/vice_item_3_thumb.png?v=546"
                alt="Bảo Hành 2 Năm"
              />
            </div>
            <div class="text">
              <div class="text-lg font-semibold">Bảo Hành 2 Năm</div>
              <div class="text-sm text-gray-500">Miễn Phí</div>
            </div>
          </div>


          <div class="flex flex-col items-center text-center space-y-2">
            <div class="relative w-12 h-12">
              <img
                class="w-full h-full"
                src="//theme.hstatic.net/200000065946/1001264503/14/vice_item_4_thumb.png?v=546"
                alt="Tư Vấn Thiết Kế"
              />
            </div>
            <div class="text">
              <div class="text-lg font-semibold">Tư Vấn Thiết Kế</div>
              <div class="text-sm text-gray-500">Miễn Phí</div>
            </div>
          </div>
        </div>


        <div id="Sale" ref={saleref} className="relative w-[73%] pt-10">
          <h2 className="text-2xl font-bold text-center mb-6">SẢN PHẨM ĐANG GIẢM GIÁ</h2>
          <div className="relative flex items-center px-10">
            {/* Nút mũi tên trái */}
            <button
              onClick={scrollLeft}
              className="absolute left-0 z-10 bg-gray-300 text-[50px] text-white w-20 h-20 rounded-full hover:bg-gray-600 opacity-50"
            >
              <FontAwesomeIcon icon={faAngleLeft} />
            </button>

            {/* Danh sách sản phẩm */}
            <div
              ref={carouselRef}
              className="flex overflow-x-auto scroll-smooth gap-4"
              style={{ scrollbarWidth: "none" }}
            >
              {saleproducts.map((product) => {
                const { Price, PriceSale } = product;
                const percent = ((Price - PriceSale) / Price) * 100;

                return (
                  <div
                    key={product._id}
                    className="flex-shrink-0 w-64 bg-white border rounded-lg shadow-lg"
                  >
                    <div className="relative">
                      <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        -{percent.toFixed(0)}%
                      </span>
                      <img src={product.Image} alt={product.Name} className="w-full h-48 object-cover" />
                      <button
                        onClick={() => navigate(`/productDetails?id=${product._id}`)}
                        className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                      >
                        Xem chi tiết
                      </button>
                    </div>
                    <div className="p-4">
                      <h2 className="text-lg font-bold">{product.Name}</h2>
                      <div className="flex justify-between items-center">
                        <span className="text-red-500 font-bold">
                          {formatNumberWithComma(product.PriceSale)}đ
                        </span>
                        <span className="line-through text-gray-400">
                          {formatNumberWithComma(Price)}đ
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Nút mũi tên phải */}
            <button
              onClick={scrollRight}
              className="absolute right-0 z-10 bg-gray-300 text-[50px] text-white w-20 h-20 rounded-full hover:bg-gray-600 opacity-50"
            >
              <FontAwesomeIcon icon={faAngleRight} />
            </button>
          </div>
        </div>

        <div className="min-w-screen min-h-screen bg-gray-50 flex items-center justify-center py-5">
          <div className="w-full bg-white border-t border-b border-gray-200 px-5 py-16 md:py-24 text-gray-800">
            <div className="w-full max-w-6xl mx-auto">
              <div className="text-center max-w-xl mx-auto">
                <h1 className="text-6xl md:text-7xl font-bold mb-5 text-gray-600">
                  What people <br /> are saying.
                </h1>
                <h3 className="text-xl mb-5 font-light">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </h3>
                <div className="text-center mb-10">
                  <span className="inline-block w-1 h-1 rounded-full bg-indigo-500 ml-1"></span>
                  <span className="inline-block w-3 h-1 rounded-full bg-indigo-500 ml-1"></span>
                  <span className="inline-block w-40 h-1 rounded-full bg-indigo-500"></span>
                  <span className="inline-block w-3 h-1 rounded-full bg-indigo-500 ml-1"></span>
                  <span className="inline-block w-1 h-1 rounded-full bg-indigo-500 ml-1"></span>
                </div>
              </div>
              <div className="-mx-3 md:flex items-start">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="px-3 md:w-1/3">
                    <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
                      <div className="w-full flex mb-4 items-center">
                        <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                          <img src={testimonial.image} alt={testimonial.name} />
                        </div>
                        <div className="flex-grow pl-3">
                          <h6 className="font-bold text-sm uppercase text-gray-600">
                            {testimonial.name}
                          </h6>
                        </div>
                      </div>
                      <div className="w-full">
                        <p className="text-sm leading-tight">
                          <span className="text-lg leading-none italic font-bold text-gray-400 mr-1">
                            "
                          </span>
                          {testimonial.text}
                          <span className="text-lg leading-none italic font-bold text-gray-400 ml-1">
                            "
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
