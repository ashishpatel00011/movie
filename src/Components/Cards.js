import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'; // Make sure to import skeleton CSS

const Card = ({ data, trending, index, media_type }) => {
  const imageURL = useSelector((state) => state.MovieData.imageURL);
  const [isLoading, setIsLoading] = useState(true);
  const mediaType = data.media_type ?? media_type;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    isLoading ? (
      <div className="w-full min-w-[230px] max-w-[230px] h-80">
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
          <Skeleton height="100%" />
        </SkeletonTheme>
      </div>
    ) : (
      <Link
        to={`/${mediaType}/${data.id}`}
        className="w-full min-w-[230px] max-w-[230px] h-80 overflow-hidden block rounded relative hover:scale-105 transition-all"
      >
        {data?.poster_path ? (
          <img src={`${imageURL}${data.poster_path}`} alt={data?.title || data?.name} className="w-full h-full object-cover" />
        ) : (
          <div className="bg-neutral-800 h-full w-full flex justify-center items-center text-white">
            No image found
          </div>
        )}

        <div className="absolute top-4 left-0">
          {trending && (
            <div className="py-1 px-4 backdrop-blur-xl rounded-r-full bg-black/60 overflow-hidden text-white">
              #{index} Trending
            </div>
          )}
        </div>

        <div className="absolute bottom-0 h-16 backdrop-blur-xl w-full bg-black/60 p-2 text-white">
          <h2 className="text-ellipsis line-clamp-1 text-lg font-semibold">
            {data?.title || data?.name}
          </h2>
          <div className="text-sm text-neutral-400 flex justify-between items-center">
            <p>{moment(data.release_date).format("MMMM Do YYYY")}</p>
            <p className="bg-black px-1 rounded-full text-xs text-white">
              Rating: {Number(data.vote_average).toFixed(1)}
            </p>
          </div>
        </div>
      </Link>
    )
  );
};

export default Card;
