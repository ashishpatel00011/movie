import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const Banner = () => {
  const bannerData = useSelector((state) => state.MovieData.bannerData);
  const imageURL = useSelector((state) => state.MovieData.imageURL);
  const [currentImage, setCurrentImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const handlePrevious = () => {
    setCurrentImage((prev) => (prev === 0 ? bannerData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentImage((prev) => (prev === bannerData.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentImage < bannerData.length - 1) {
        handleNext();
      } else {
        setCurrentImage(0);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [bannerData, imageURL, currentImage]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const bannerHeight = "650px"; 

  return (
    <section className="w-full h-full">
      <div className="flex min-h-full max-h-[95vh] overflow-hidden">
        {isLoading ? (
          <div className="min-w-full" style={{ height: bannerHeight }}>
            <SkeletonTheme baseColor="#202020" highlightColor="#444">
              <Skeleton height="100%" />
            </SkeletonTheme>
          </div>
        ) : (
          bannerData.map((data, index) => (
            <div
              key={data.id + "bannerHome" + index}
              className="min-w-full min-h-[450px] lg:min-h-full overflow-hidden relative group transition-all"
              style={{ transform: `translateX(-${currentImage * 100}%)` }}
            >
              <div className="w-full h-full">
                <img
                  src={imageURL + data.poster_path}
                  alt={data.title || data.name}
                  className="h-full w-full object-cover"
                  style={{ height: bannerHeight }}
                />
              </div>
              <div className="absolute top-0 w-full h-full hidden items-center justify-between py-4 group-hover:lg:flex">
                <button
                  onClick={handlePrevious}
                  className="bg-white p-1 rounded-full text-xl z-10 text-black transition-all"
                >
                  <FaAngleLeft />
                </button>
                <button
                  onClick={handleNext}
                  className="bg-white p-1 rounded-full text-xl z-10 text-black transition-all"
                >
                  <FaAngleRight />
                </button>
              </div>
              <div className="absolute top-0 bg-gradient-to-t from-neutral-900 to-transparent w-full h-full"></div>
              <div className="container mx-auto">
                <div className="w-full absolute bottom-0 max-w-md px-3">
                  <h2 className="font-bold text-2xl lg:text-4xl text-white drop-shadow-2xl">
                    {data?.title || data?.name}
                  </h2>
                  <p className="text-ellipsis line-clamp-3 my-2 text-white">
                    {data.overview}
                  </p>
                  <div className="flex items-center gap-4">
                    <p className="text-white">
                      Rating: {Number(data.vote_average).toFixed(1)}+
                    </p>
                    <span className="text-white">|</span>
                    <p className="text-white">
                      View: {Number(data.popularity).toFixed(0)}
                    </p>
                  </div>
                  <Link to={`/${data?.media_type}/${data.id}`}>
                    <button className="bg-white px-4 py-2 text-black font-bold rounded mt-4 mb-5 hover:bg-gradient-to-l from-red-700 to-orange-500 shadow-md transition-all hover:scale-105">
                      Play Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Banner;
