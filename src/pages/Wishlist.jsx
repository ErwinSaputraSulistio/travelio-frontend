import { useEffect, useState } from "react"
import axios from "axios"
import Swal from "sweetalert2"
import { Navbar } from "../components/substantial"
import { Favorite } from "../components/diminutive"
// REDUX
import { useDispatch, useSelector } from "react-redux"
import { replaceWish } from "../features/userSlice"

export default function Bookmark() {
   const dispatch = useDispatch()
   const myWishList = useSelector((state) => state.user.wishList)
   const [pagination, setPagination] = useState(1)
   const [wishListData, getWishListData] = useState([])
   const paginationMultiply = pagination * 5
   const removeFromWishList = (id) => {
      const newArray = myWishList.filter((data) => { return data !== id })
      dispatch(replaceWish(newArray))
      Swal.fire("Success!", "This book has been removed from your wishlist!", "success")
   }
   const switchPagination = (arrow) => {
      if(arrow === "<" && pagination > 1) { setPagination(pagination - 1) }
      else if(arrow === ">" && (paginationMultiply < myWishList?.length)) { 
         setPagination(pagination + 1) 
      }
   }
   useEffect(() => {
      axios.post("https://ciwin-travelio.herokuapp.com/v1/check", { username: localStorage.getItem("reader") })
      .then((result) => { 
         const wishList = result.data.data.wishlist || []
         dispatch(replaceWish(wishList)) 
      })
      .catch((error) => { console.log(error.response.data) })
   }, [])
   return(
      <div>
         <Navbar/>
         <div className="container">
            <div className="wishList">
               <span className="myWishList">My Wishlist</span>
               <div style={{ "height": "100%", "width": "100%" }}>
               {
                  myWishList.slice(paginationMultiply - 5, paginationMultiply).map((item, i) => {
                     return(
                        <Favorite data={ item } func={ () => { removeFromWishList(item) } } key={ i }/>
                     )
                  })
               }
               </div>
               <div className="pagination">
                  <span 
                     className="paginationButton paginationArrow" 
                     onClick={ () => { switchPagination("<") } }
                     style={ pagination <= 1 ? { "opacity": "0.5" } : null }
                  >
                     { "<" }
                  </span>
                  <span className="paginationButton">{ pagination }</span>
                  <span 
                     className="paginationButton paginationArrow" 
                     onClick={ () => { switchPagination(">") } }
                     style={ paginationMultiply >= myWishList?.length ? { "opacity": "0.5" } : null }
                  >
                     { ">" }
                  </span>
               </div>
            </div>
         </div>
      </div>
   )
}