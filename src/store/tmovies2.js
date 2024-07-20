import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    bannerData : [],
    imageURL : ""
}

export const Tmovies2Slice = createSlice({
    name : 'Tmovies2',
    initialState,
    reducers : {
        setBannerData : (state,action)=>{
            state.bannerData = action.payload
        },
        setImageURL : (state,action) =>{
            state.imageURL = action.payload
        }
    }
})

export const { setBannerData, setImageURL } = Tmovies2Slice.actions
export default Tmovies2Slice.reducer


