import StarsRating from "stars-rating"
import Swal from "sweetalert2"
import { Button } from "../diminutive"
// REDUX
import { useDispatch, useSelector } from "react-redux"
import { wishList } from "../../features/userSlice"

export default function BookInfo({ author, close, id, img, publisher, rating, title }) {
	const dispatch = useDispatch()
	const myWishList = useSelector((state) => state.user.wishList)
	const addToMyWishList = () => {
		if(myWishList.includes(title) === true) {
			Swal.fire(
				"Failed!", 
				"This book is already in your wishlist ~", 
				"error"
			)
		}
		else {
			dispatch(wishList(title))
			Swal.fire(
				"Success!", 
				"This book has been added to your wishlist!", 
				"success"
			)
		}
	}
   return(
		<div className="bookInfoWindow">
			<div className="bookInfo">
				<div className="bookInfoTop">
					<div className="bookInfoTopRight">
						<Button
							background="#3CB371"
							func={ () => { addToMyWishList() } }
							margin="0 1vw"
							name="+ Add Wishlist"
							padding="0.5vw"
						/>
						<img 
							alt="close" 
							className="bookCloseButton" 
							onClick={ () => { close() } }
							src="https://icon-library.com/images/close-icon-png/close-icon-png-19.jpg"
						/>
					</div>
				</div>
				<div className="bookInfoBottom">
					<img 
						alt="bookInfoImage" 
						className="bookInfoImage" 
						src={ img || "https://cdn-d8.nypl.org/s3fs-public/blogs/J5LVHEL.jpg" }
					/>
					<div className="bookInfoDetail">
						<span><b className="bookInfoDetailLeft">Title : </b>{ title || "-" }</span>
						<span><b className="bookInfoDetailLeft">Author : </b>{ author || "-" }</span>
						<span><b className="bookInfoDetailLeft">Publisher : </b>{ publisher || "-" }</span>
						<span className="bookRating">
							<b className="bookInfoDetailLeft">Rating : </b>
							{ 
							rating === undefined ?
							"-"
							:
							<StarsRating
								className={ "ratingStarSize" }
								count={ 5 }
								edit={ false }
								value={ rating }
							/> 
							}
						</span>
					</div>
				</div>
			</div>
		</div>
	)
}