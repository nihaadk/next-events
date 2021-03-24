import { getAllEvents } from '../../helpers/api-util';
import EventList from '../../components/events/event-list';
import EventSearch from '../../components/events/event-search';
import { useRouter } from 'next/router';

function AllEventsPage(props) {
	const { events } = props;
	const router = useRouter();

	function findEventHandler(year, month) {
		const fullPath = `/events/${year}/${month}`;
		router.push(fullPath);
	}

	return (
		<div>
			<EventSearch onSearch={findEventHandler} />
			<EventList items={events} />
		</div>
	);
}

export async function getStaticProps() {
	const events = await getAllEvents();

	return {
		props: {
			events: events
		},
		revalidate: 60
	};
}

export default AllEventsPage;
