import { useNavigate } from "react-router-dom"
import axios from "axios"
import Swal from "sweetalert2"
import Button from "../diminutive/Button"

export default function UserCheck({ switchCreate }) {
   const navigate = useNavigate()
   const goCheckIn = (e) => {
      axios.post("https://ciwin-travelio.herokuapp.com/v1/check", { username: e.target[0].value })
      .then((result) => { 
         const userInfo = result.data.data
         localStorage.setItem("reader", userInfo.username)
         Swal.fire("Verified!", "Welcome, " + userInfo.username + "!", "success")
         .then(() => { navigate("/home") })
      })
      .catch((error) => {
         const errRes = error.response.data
         Swal.fire(errRes.status, errRes.error, "error")
      })
      e.preventDefault()
   }
   return(
      <form className="landingPageRight" onSubmit={ (e) => { goCheckIn(e) } }>
         {/* WELCOME IMAGE */}
         <img 
            alt="welcome" 
            className="landingPageWelcome" 
            src="https://www.freepnglogos.com/uploads/welcome-png/worthy-welcome-worthy-christian-forums-1.png"
         />
         {/* BEFORE CONTINUE, PLEASE ENTER USERNAME */}
         <span className="landingPageInfo">Before continue to Homepage,</span>
         <span className="landingPageInfo">please enter your Username first.</span>
         {/* INPUT & BUTTON */}
         <input className="landingPageInputUsername" name="inputUsername" placeholder="Input your username here" required type="text"/>
         <Button
            customClass="authBtnMobile"
            fontSize="0.8vw" 
            name="CHECK IN"
            padding="0.8vw" 
            width="55%"
         />
         {/* OR */}
         <div className="orBorder">
            <div className="orText">OR</div>
         </div>
         {/* DON'T HAVE USERNAME YET */}
         <span className="dontHaveUsername">Don't have username yet?
            <span className="createUsername" onClick={ () => { switchCreate() } }> Create one now!</span>
         </span>
      </form>
   )
}