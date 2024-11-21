import React, { useEffect, useRef, useState } from "react";
import Header from './THeader';
import BHeader from './BHeader';
import Footer from './Footer';
import test from '../../images/test.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/actions'

const Home = () => {
  const listRef = useRef(null);
  const dispatch = useDispatch()
  const [active, setActive] = useState(0);
  const refreshIntervalRef = useRef(null);
  const itemsRef = useRef([]);
  const dotsRef = useRef([]);
  const [productlist, setProductlist] = useState([])


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

  return (
    <div>
      <Header />
      <BHeader class="" />
      <div className="w-full h-auto flex items-center flex-col space-y-1">
        <div id="banner" className="relative overflow-hidden max-w-full w-[1100px] h-[620px] m-3">
          <div className="slider relative overflow-hidden w-full h-full">
            <div ref={listRef} className="list flex absolute transition-all duration-1000 w-full h-full">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="item min-h-max min-w-max">
                  <img src={test} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

            <div className="buttons absolute top-1/2 left-5 w-[96%] flex justify-between transform -translate-y-1/2">
              <button id="prev" className="flex justify-center items-center duration-500 transform transition-all text-center w-12 h-12 bg-white bg-opacity-50 rounded-full text-white font-bold text-xl hover:bg-gray-300 hover:text-3xl hover:text-gray-700 hover:translate-x-[-4px]">‹</button>
              <button id="next" className="flex justify-center items-center duration-500 transform transition-all text-center w-12 h-12 bg-white bg-opacity-50 rounded-full text-white font-bold text-xl hover:bg-gray-300 hover:text-3xl hover:text-gray-700 hover:translate-x-[4px]">›</button>
            </div>

            <ul className="dots flex justify-center absolute bottom-2 left-0 w-full">
              {Array.from({ length: 3 }).map((_, index) => (
                <li
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`w-4 h-4 bg-white rounded-full mx-2 transition-[width,height] duration-1000 cursor-pointer hover:bg-gray-400 ${active === index ? 'w-8 h-8' : ''}`}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
