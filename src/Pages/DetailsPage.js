import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserFatch from "../Hooks/UserFatch";
import useFetchDetails from "../Hooks/useFetchDetails";
import { useSelector } from "react-redux";
import moment from "moment";
import Divider from "../Components/Divider";
import VideoPlay from "../Components/VideoPlay";
import HorizontalScrollCard from "../Components/HorizontalScollCard";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Import skeleton CSS
import { IoAlarmSharp } from "react-icons/io5";
const DetailsPage = () => {
  const params = useParams();
  const imageURL = useSelector((state) => state.MovieData.imageURL);
  const [IsLoading, setIsLoading] = useState(true);
  const { data, loading: detailsLoading } = useFetchDetails(`/${params?.explore}/${params?.id}`);
  const { data: castData, loading: castLoading } = useFetchDetails(`/${params?.explore}/${params?.id}/credits`);
  const { data: similarData, loading: similarLoading } = UserFatch(`/${params?.explore}/${params?.id}/similar`);
  const { data: recommendationData, loading: recommendationLoading } =UserFatch(`/${params?.explore}/${params?.id}/recommendations`);
  const [playVideo, setPlayVideo] = useState(false);
  const [playVideoId, setPlayVideoId] = useState("");

  const handlePlayVideo = (data) => {
    setPlayVideoId(data);
    setPlayVideo(true);
  };

  const duration = (data?.runtime / 60)?.toFixed(1)?.split(".");
  const writer = castData?.crew
    ?.filter((el) => el?.job === "Writer")
    ?.map((el) => el?.name)
    ?.join(", ");
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);
  const bannerHeight = "280px";

  return (
    <div>
      <div className="w-full h-[280px] relative hidden lg:block">
        {IsLoading ? (
          <div className="min-w-full" style={{ height: bannerHeight }}>
            <SkeletonTheme baseColor="#202020" highlightColor="#444">
              <Skeleton height="100%" />
            </SkeletonTheme>
          </div>
        ) : (
          <div className="w-full h-full">
            <img
              src={imageURL + data?.backdrop_path}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
        )}
        <div className="absolute w-full h-full top-0 bg-gradient-to-t from-neutral-900/90 to-transparent"></div>
      </div>

      <div className="container mx-auto px-3 py-16 lg:py-0 flex flex-col lg:flex-row gap-5 lg:gap-10 ">
        <div className="relative mx-auto lg:-mt-28 lg:mx-0 w-fit min-w-60">
          {IsLoading ? (
            <div className="w-full min-w-[230px] max-w-[230px] h-80">
              <SkeletonTheme baseColor="#202020" highlightColor="#444">
                <Skeleton height="100%" />
              </SkeletonTheme>
            </div>
          ) : (
            <img
              src={imageURL + data?.poster_path}
              alt=""
              className="h-80 w-60 object-cover rounded"
            />
          )}
          <button
            onClick={() => handlePlayVideo(data)}
            className="mt-3 w-full py-2 px-4 text-center bg-white text-black rounded font-bold text-lg hover:bg-gradient-to-l from-red-500 to-orange-500 hover:scale-105 transition-all"
          >
            Play Now
          </button>
        </div>

        <div>
          <h2 className="text-2xl lg:text-4xl font-bold text-white ">
            {(
              data?.title || data?.name
            )}
          </h2>
          <p className="text-neutral-400">{data?.tagline}</p>
          <Divider />

          <div className="flex items-center gap-3">
            {
              <>
                <p>Rating : {Number(data?.vote_average).toFixed(1)}+</p>
                <span>|</span>
                <p>View : {Number(data?.vote_count)}</p>
                <span>|</span>
                <p>
                  Duration : {duration[0]}h {duration[1]}m
                </p>
              </>
            }
          </div>

          <Divider />

          <div>
            <h3 className="text-xl font-bold text-white mb-1">{"Overview"}</h3>
            <p>{data?.overview}</p>

            <Divider />
            <div className="flex items-center gap-3 my-3 text-center">
              {
                <>
                  <p>Status : {data?.status}</p>
                  <span>|</span>
                  <p>
                    Release Date :{" "}
                    {moment(data?.release_date).format("MMMM Do YYYY")}
                  </p>
                  <span>|</span>
                  <p>Revenue : {Number(data?.revenue)}</p>
                </>
              }
            </div>

            <Divider />
          </div>

          <div>
            <p>
              <span className="text-white">Director</span> :{" "}
              {castData?.crew[0]?.name}
            </p>

            <Divider />

            <p>
              <span className="text-white">Writer</span> :{" "}
              {writer}
            </p>
          </div>

          <Divider />

          <h2 className="font-bold text-lg">Cast :</h2>
          <div className="grid grid-cols-[repeat(auto-fit,96px)] gap-5 my-4 lg:ml-0 ml-4">
            {IsLoading
              ? Array.from({ length: 5 }).map((_, index) => (
                <SkeletonTheme baseColor="#202020" highlightColor="#444">
                  <Skeleton  key={index} height={96} width={96} circle={true}/>
                </SkeletonTheme>
                ))
              : castData?.cast
                  ?.filter((el) => el?.profile_path)
                  .map((starCast, index) => {
                    return (
                      <div key={index}>
                        <div>
                          <img
                            src={imageURL + starCast?.profile_path}
                            alt=""
                            className="w-24 h-24 object-cover rounded-full"
                          />
                        </div>
                        <p className="font-bold text-center text-sm text-neutral-400">
                          {starCast?.name}
                        </p>
                      </div>
                    );
                  })}
          </div>
        </div>
      </div>
      <div>
        <HorizontalScrollCard
          data={similarData}
          heading={"Similar " + params?.explore}
          media_type={params?.explore}
          loading={similarLoading}
        />
        <HorizontalScrollCard
          data={recommendationData}
          heading={"Recommendation " + params?.explore}
          media_type={params?.explore}
          loading={recommendationLoading}
        />
      </div>

      {playVideo && (
        <VideoPlay
          data={playVideoId}
          close={() => setPlayVideo(false)}
          media_type={params?.explore}
        />
      )}
    </div>
  );
};

export default DetailsPage;
