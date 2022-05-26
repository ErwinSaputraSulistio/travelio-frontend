import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const updateWishlistToDB = (wishlist) => {
  const data = {
    username: localStorage.getItem("reader"),
    wishlist
  }
  axios.post("https://ciwin-travelio.herokuapp.com/v1/wishlist", data)
  .then(() => { console.log("This user wishlist is successfully updated to DB!") })
  .catch((error) => { console.log(error.response.data) })
}

export const userSlice = createSlice({
  name: "user",
  initialState: {
	  bookSearchResult: [],
    wishList: [],
  },
  reducers: {
    searchBook: (state = [], action) => {
      state.bookSearchResult = action.payload
    },
    wishList: (state = [], action) => {
      state.wishList = [...state.wishList, action.payload]
      updateWishlistToDB(state.wishList)
    },
    replaceWish: (state = [], action) => {
      state.wishList = action.payload
      updateWishlistToDB(state.wishList)
    }
  },
})

export const { searchBook, wishList, replaceWish } = userSlice.actions

export default userSlice.reducer
