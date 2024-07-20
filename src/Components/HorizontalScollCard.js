import React, { useRef, useState, useEffect } from "react";
import Card from "./Cards";
import "./Header.css";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const HorizontalScrollCard = ({ data = [], heading, trending, media_type }) => {
  const containerRef = useRef();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleNext = () => {
    containerRef.current.scrollLeft += 300;
  };

  const handlePrevious = () => {
    containerRef.current.scrollLeft -= 300;
  };

  return (
    <div className="container px-3 my-10 mx-auto relative">
      <h2 className="text-xl lg:text-2xl font-bold mb-3 text-white">
        {heading}
      </h2>

      <div className="relative">
        <div
          ref={containerRef}
          className="grid grid-cols-[repeat(auto-fit,230px)] grid-flow-col gap-6 overflow-hidden overflow-x-scroll relative z-10 scroll-smooth transition-all scrollbar-hide"
        >
          {isLoading
            ? Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="w-full min-w-[230px] max-w-[230px] h-80"
                >
                  <SkeletonTheme baseColor="#202020" highlightColor="#444">
                    <Skeleton height="100%" />
                  </SkeletonTheme>
                </div>
              ))
            : data.map((item, index) => (
                <Card
                  key={item.id + "heading" + index}
                  data={item}
                  index={index + 1}
                  trending={trending}
                  media_type={media_type}
                />
              ))}
        </div>
        <div className="absolute top-0 w-full h-full hidden lg:flex items-center justify-between py-4">
          <button
            onClick={handlePrevious}
            className="bg-white p-1 text-black rounded-full -mr-1 z-10"
          >
            <FaAngleLeft />
          </button>
          <button
            onClick={handleNext}
            className="bg-white p-1 text-black rounded-full -ml-1 z-10"
          >
            <FaAngleRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HorizontalScrollCard;
