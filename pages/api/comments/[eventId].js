import { MongoClient } from 'mongodb';

async function hander(req, res) {
	const eventId = req.query.eventId;

	const client = await MongoClient.connect(
		'mongodb+srv://nihadk:PASSWORD@cluster0.fwqsr.mongodb.net/events?retryWrites=true&w=majority'
	);
	const db = client.db();

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

		const result = await db.collection('comments').insertOne(newComment);
		newComment.id = result.insertedId;
		res.status(201).json({ message: 'Added comment', comment: newComment });
	}

	if (req.method === 'GET') {
		const documents = await db.collection('comments').find().sort({ _id: -1 }).toArray();
		res.status(200).json({ comments: documents });
	}

	client.close();
}

export default hander;
