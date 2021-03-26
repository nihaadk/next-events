import { connectionDatabase, insertDoucment } from '../../helpers/db-util';

async function handler(req, res) {
	if (req.method === 'POST') {
		const userEmail = req.body.email;

		if (!userEmail || !userEmail.includes('@')) {
			res.status(422).json({ message: 'Invalid email address.' });
			return;
		}

		let client;

		try {
			client = await connectionDatabase();
		} catch (error) {
			res.status(500).json({ message: 'Connect to the Dababase failed' });
			return;
		}

		try {
			const result = await insertDoucment(client, 'newsletter', { email: userEmail });
			client.close();
		} catch (error) {
			res.status(500).json({ message: 'Inserting data failed' });
			return;
		}

		res.status(201).json({ message: 'Signed Up' });
	}
}

export default handler;
