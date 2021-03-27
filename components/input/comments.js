import { useEffect, useState, useContext } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import NotificationContext from '../../store/notification-context';

function Comments(props) {
	const { eventId } = props;

	const [ showComments, setShowComments ] = useState(false);
	const [ comments, setComments ] = useState([]);
	const [ showFetching, setShowFetching ] = useState(false);
	const notificationCtx = useContext(NotificationContext);

	useEffect(
		() => {
			if (showComments) {
				fetchComments();
			}
		},
		[ showComments ]
	);

	function fetchComments() {
		setShowFetching(true);
		fetch(`/api/comments/${eventId}`).then((response) => response.json()).then((data) => {
			setComments(data.comments);
			setShowFetching(false);
		});
	}

	function toggleCommentsHandler() {
		setShowComments((prevStatus) => !prevStatus);
	}

	function addCommentHandler(commentData) {
		notificationCtx.showNotification({
			title: 'Signing Up...',
			message: 'Registerin for newsletter',
			status: 'pending'
		});

		fetch(`/api/comments/${eventId}`, {
			method: 'POST',
			body: JSON.stringify(commentData),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((response) => {
				if (response.ok) {
					return response.json();
				}

				return response.json().then((data) => {
					throw new Error(data.message || 'Something went wrong!');
				});
			})
			.then((data) => {
				fetchComments();
				notificationCtx.showNotification({
					title: 'Success',
					message: 'Successfully added new Comment!',
					status: 'success'
				});
			})
			.catch((error) => {
				notificationCtx.showNotification({
					title: 'Error',
					message: error.message || 'Something went wrong!',
					status: 'error'
				});
			});
	}

	return (
		<section className={classes.comments}>
			<button onClick={toggleCommentsHandler}>{showComments ? 'Hide' : 'Show'} Comments</button>
			{showComments && <NewComment onAddComment={addCommentHandler} />}
			{showComments && !showFetching && <CommentList items={comments} />}
			{showComments && showFetching && <p>Loading ...</p>}
		</section>
	);
}

export default Comments;
