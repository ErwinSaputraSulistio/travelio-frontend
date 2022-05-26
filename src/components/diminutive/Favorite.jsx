export default function Favorite({ data, func }) {
   return(
      <div className="favorite">
         <span>{ data }</span>
         <span className="favoriteRemove" onClick={ () => { func() } }>Remove</span>
      </div>
   )
}