import { useEffect, useState } from "react";
import CommentList from "./CommentList";
import AddComment from "./AddComment";
import Loading from "./Loading";
import Error from "./Error";
import { token } from "../data/token";
const CommentArea = (props) => {
	const [comments, setComments] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	const fetchingData = async () => {
		setIsLoading(true);
		try {
			let response = await fetch(
				"https://striveschool-api.herokuapp.com/api/comments/" +
					props.asin,
				{
					headers: {
						Authorization: token,
					},
				}
			);
			console.log(response);
			if (response.ok) {
				let comments = await response.json();
				console.log(comments);
				setIsLoading(false);
				setIsError(false);
				setComments(comments);
			} else {
				setIsLoading(false);
				setIsError(true);
			}
		} catch (error) {
			console.log(error);
			setIsLoading(false);
			setIsError(true);
		}
	};

	useEffect(() => {
		if (props.asin) {
			fetchingData();
		}
	}, [props.asin]);

	return (
		<div className="text-center">
			{isLoading && <Loading />}
			{isError && <Error />}
			<AddComment asin={props.asin} />
			<CommentList commentsToShow={comments} />
		</div>
	);
};

export default CommentArea;
