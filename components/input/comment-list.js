import classes from './comment-list.module.css';

function CommentList(props) {
	const { items } = props;

	console.log(items);

	return (
		<ul className={classes.comments}>
			{items &&
				items.map((item) => (
					<li key={item._id}>
						<div>
							<p>{item.text}</p>
						</div>
						<div>
							By <address>{item.name}</address>
						</div>
					</li>
				))}
		</ul>
	);
}

export default CommentList;
