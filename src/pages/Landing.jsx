import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserCheck, UserCreate } from "../components/substantial"

export default function Landing() {
   // REACT HOOKS
   const navigate = useNavigate()
   const [isCreate, changeIsCreateState] = useState(false)
   useEffect(() => {
      if(localStorage.getItem("reader") !== null) { navigate("/home") }
   }, [])
   // FUNCTIONS
   const switchTrigger = () => {
      changeIsCreateState(!isCreate)
   }
   return(
      <div className="container">
         <div className="landingPageLeft">
            <div className="landingPageLeftLayer">
               <i className="landingPageQuote">"A room without books,</i>
               <i className="landingPageQuote">is like a body without a soul."</i>
               <span className="landingPageQuoteOwner">- Marcus Tullius Cicero</span>
            </div>
         </div>
         {
            isCreate === false ?
            <UserCheck switchCreate={ switchTrigger }/>
            :
            <UserCreate switchCreate={ switchTrigger }/>
         }
      </div>
   )
}