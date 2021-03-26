import classes from './comment-list.module.css';

function CommentList() {
	return (
		<ul className={classes.comments}>
			{/* Render list of comments - fetched from API */}
			<li>
				<div>
					<p>My comment is amazing!</p>
				</div>
				<div>
					By <address>Maximilian</address>
				</div>
			</li>
			<li>
				<div>
					<p>My comment is amazing!</p>
				</div>
				<div>
					By <address>Maximilian</address>
				</div>
			</li>
		</ul>
	);
}

export default CommentList;
