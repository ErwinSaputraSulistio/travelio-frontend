export default function Button({ background, color, fontSize, func, margin, name, padding, width }) {
   return(
      <button
         onClick={ () => { func === undefined ? console.log(name) : func() } } 
         style={{ 
            background: background || "#6379F4", 
            borderRadius: "0.25vw", 
            color: color || "white", 
            fontSize: fontSize || "0.8vw", 
            fontWeight: "bold", 
            margin,
            padding, 
            width 
         }}
      >
         { name || "Button" }
      </button>
   )
}