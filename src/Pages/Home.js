import React from "react";
import Banner from "../Components/Banner";
import { useSelector } from "react-redux";
import HorizontalScollCard from "../Components/HorizontalScollCard";
import UserFatch from "../Hooks/UserFatch";
function Home() {
  const trending_data = useSelector((state) => state.MovieData.bannerData);
  const { data : nowPlayingData } = UserFatch('/movie/now_playing')
  const { data : topRatedData } = UserFatch('/movie/top_rated')
  const { data : popularTvShowData } = UserFatch('/tv/popular')
  const { data : onTheAirShowData } = UserFatch('/tv/on_the_air')
  
  return (
    <div>
      <Banner />
      <HorizontalScollCard data={trending_data} heading={"Trending"} trending={true}/>
      <HorizontalScollCard data={nowPlayingData} heading={"Now playing"} media_type={'movie'}/>
      <HorizontalScollCard data={topRatedData} heading={"Top Rated Movies"} media_type={'movie'}/>
      <HorizontalScollCard data={popularTvShowData} heading={"Popular Tv Show"} media_type={'tv'}/>
      <HorizontalScollCard data={onTheAirShowData} heading={"On The Air"} media_type={'tv'}/>

    </div>
  );
}

export default Home;
