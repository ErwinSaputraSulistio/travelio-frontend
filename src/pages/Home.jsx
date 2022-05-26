import { useState } from "react"
import { useSelector } from "react-redux"
import { BookInfo, Navbar } from "../components/substantial"

export default function Home() {
   const bookResult = useSelector((state) => state.user.bookSearchResult)
   const [bookIndex, selectBook] = useState(null)
   const selectBookInfo = (row, i) => {
      if(row === 1) { selectBook(i) }
      else if(row === 2) { selectBook(5 + i) }
   }
   return(
      <div>
         <Navbar/>
         <div className="container">
            {
               !bookResult ?
               <div>Not Found</div>
               :
               bookResult.length === 0 ?
               <div>Book Explorer</div>
               :
               <div className="homeInMobile" style={{ width: "100%" }}>
                  <div className="bookResultRow">
                     {
                        bookResult.slice(0, 5).map((item, i) => {
                           return(
                              <div 
                                 className="bookResultBorder" 
                                 key={ i } 
                                 onClick={ () => selectBookInfo(1, i) }
                              >
                                 <img 
                                    alt={ i }
                                    className="bookResultCover" 
                                    src={ 
                                       item.volumeInfo.imageLinks?.thumbnail
                                       || 
                                       "https://cdn-d8.nypl.org/s3fs-public/blogs/J5LVHEL.jpg" 
                                    }
                                 />
                              </div>
                           )
                        }) 
                     }
                  </div>
                  <div className="bookResultRow">
                     {
                        bookResult.slice(5, 10).map((item, i) => {
                           return(
                              <div 
                                 className="bookResultBorder" 
                                 key={ i } 
                                 onClick={ () => selectBookInfo(2, i) }
                              >
                                 <img 
                                    alt={ i }
                                    className="bookResultCover" 
                                    src={ 
                                       item.volumeInfo.imageLinks?.thumbnail
                                       || 
                                       "https://cdn-d8.nypl.org/s3fs-public/blogs/J5LVHEL.jpg" 
                                    }
                                 />
                              </div>
                           )
                        }) 
                     }
                  </div>
               </div>
            }
            { 
               bookIndex !== null
               && 
               <BookInfo 
                  author={ bookResult[bookIndex].volumeInfo.authors }
                  close={ () => { selectBook(null) } }
                  id={ bookResult[bookIndex].id }
                  img={ bookResult[bookIndex].volumeInfo.imageLinks?.thumbnail }
                  publisher={ bookResult[bookIndex].volumeInfo.publisher }
                  rating={ bookResult[bookIndex].volumeInfo.averageRating }
                  title={ bookResult[bookIndex].volumeInfo.title }
               /> 
            }
         </div>
      </div>
   )
}