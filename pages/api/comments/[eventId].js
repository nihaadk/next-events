import { connectionDatabase, insertDoucment, getAllDocuments } from '../../../helpers/db-util';

async function hander(req, res) {
	const eventId = req.query.eventId;
	let client;

	if (req.method === 'POST') {
		const { email, name, text } = req.body;

		if (!email.includes('@') || !name || name.trim() === '' || !text || text.trim() === '') {
			res.status(322).json({ message: 'Invalid input' });
			return;
		}

		const newComment = {
			email,
			name,
			text,
			eventId
		};

		try {
			client = await connectionDatabase();
		} catch (error) {
			res.status(500).json({ message: 'Connect to the Dababase failed' });
			return;
		}

		try {
			const result = await insertDoucment(client, 'comments', newComment);
			newComment._id = result.insertedId;
			res.status(201).json({ message: 'Added comment', comment: newComment });
		} catch (error) {
			res.status(500).json({ message: 'Inserting data failed' });
		}
	}

	if (req.method === 'GET') {
		try {
			client = await connectionDatabase();
		} catch (error) {
			res.status(500).json({ message: 'Connect to the Dababase failed' });
			return;
		}

		try {
			const documents = await getAllDocuments(client, 'comments', { _id: -1 });
			res.status(200).json({ comments: documents });
		} catch (error) {
			res.status(500).json({ message: 'Load all data failed' });
		}
	}

	client.close();
}

export default hander;
