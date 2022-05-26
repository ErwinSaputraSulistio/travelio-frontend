import axios from "axios"
import Swal from "sweetalert2"
import Button from "../diminutive/Button"
// REDUX

export default function userCreate({ switchCreate }) {
   const goCreate = (e) => {
      axios.post("https://ciwin-travelio.herokuapp.com/v1/create", { username: e.target[0].value })
      .then(() => { 
         Swal.fire("Created!", "Successfully create a new Username!", "success")
         .then(() => { switchCreate() })
      })
      .catch((error) => {
         const errRes = error.response.data
         Swal.fire(errRes.status, "This username is already exists!", "error")
      })
      e.preventDefault()
   }
   return(
      <form className="landingPageRight" onSubmit={ (e) => { goCreate(e) } }>
         {/* WELCOME IMAGE */}
         <img 
            alt="welcome" 
            className="landingPageWelcome" 
            src="https://www.freepnglogos.com/uploads/welcome-png/worthy-welcome-worthy-christian-forums-1.png"
         />
         {/* BEFORE CONTINUE, PLEASE ENTER USERNAME */}
         <span className="landingPageInfo">To create a new Username,</span>
         <span className="landingPageInfo">please enter a unique and unused one.</span>
         {/* INPUT & BUTTON */}
         <input className="landingPageInputUsername" name="inputUsername" placeholder="Input your new username here" required type="text"/>
         <Button 
            fontSize="0.8vw" 
            name="CREATE" 
            padding="0.8vw" 
            width="55%"
         />
         {/* OR */}
         <div className="orBorder">
            <div className="orText">OR</div>
         </div>
         {/* DON'T HAVE USERNAME YET */}
         <span className="dontHaveUsername">Already have one?
            <span className="createUsername" onClick={ () => { switchCreate() } }> Check in now!</span>
         </span>
      </form>
   )
}