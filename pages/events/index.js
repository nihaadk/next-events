import { getAllEvents } from '../../dummy-data';
import EventList from '../../components/events/event-list';
import EventSearch from '../../components/events/event-search';
import { useRouter } from 'next/router';

function AllEventsPage() {
	const allEvents = getAllEvents();
	const router = useRouter();

	function findEventHandler(year, month) {
		const fullPath = `/events/${year}/${month}`;
		router.push(fullPath);
	}

	return (
		<div>
			<EventSearch onSearch={findEventHandler} />
			<EventList items={allEvents} />
		</div>
	);
}

export default AllEventsPage;
