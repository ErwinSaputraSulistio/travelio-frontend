import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Swal from "sweetalert2"
import Button from "../diminutive/Button"
// REDUX
import { useDispatch } from "react-redux"
import { searchBook } from "../../features/userSlice"

export default function Navbar() {
   // REACT HOOKS
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const [showSearch, switchSearch] = useState(false)
   useEffect(() => {
      if(localStorage.getItem("reader") === null) { navigate("/") }
   }, [])
   // CUSTOM FUNCTIONS
   const logout = () => {
      Swal.fire("Check-out!", "You've successfully logout from this account!", "success")
      .then(() => { 
         localStorage.clear()
         navigate("/")
      })
   }
   const searchBookTitle = (e) => {
      axios.get("https://www.googleapis.com/books/v1/volumes?q=" + e.target[0].value)
      .then((result) => { dispatch(searchBook(result.data.items)) })
      .catch((error) => { console.log(error) })
      e.preventDefault()
      navigate("/home")
   }
   const triggerSwitch = () => { switchSearch(!showSearch) }
   
   return(
      <div className="navbar">
         <div className="navbarLeftSide">
            <Button
               customClass="navBtnMobile hideThisInMobile"
               func={ () => { navigate("/home") } }
               margin="1.5vw 1.5vw 1.5vw 3vw"
               name="Home"
            />
            <Button
               customClass="navBtnMobile"
               func={ () => { navigate("/wishlist") } }
               margin="1.5vw" 
               name="Wishlist"
            />
         </div>
         <form className="searchArea" onSubmit={ (e) => { searchBookTitle(e) } }>
            <input 
               className="searchInput" 
               name="search" 
               placeholder="Search a book title"
               required 
               style={ showSearch === true ? { "width": "25vw" } : { "visibility": "hidden", "opacity": "0", "width": "0" } } 
               type="text"
            />
            <img 
               alt="search" 
               className="searchLogo" 
               onClick={ () => { triggerSwitch() } } 
               src="https://www.pngmart.com/files/8/Search-Button-PNG-HD-Quality.png"
            />
         </form>
         <Button
            customClass="hideThisInMobile"
            color="darkblue"
            func={ () => { logout() } }
            margin="1.5vw"
            name="LOGOUT"
         />
      </div>
   )
}