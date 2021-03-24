import { getFilteredEvents } from '../../helpers/api-util';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import { Fragment } from 'react';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/error-alert/error-alert';

function FilteredEventsPage(props) {
	if (props.hasError) {
		return (
			<Fragment>
				<ErrorAlert>
					<p>Invalid filter. Please adjust your values!</p>
				</ErrorAlert>
				<div className="center">
					<Button link="/events">Show All Events</Button>
				</div>
			</Fragment>
		);
	}

	const filterEvents = props.events;

	if (!filterEvents || filterEvents.length === 0) {
		return (
			<Fragment>
				<ErrorAlert>
					<p>No events found for the chosen filter</p>
				</ErrorAlert>

				<div className="center">
					<Button link="/events">Show All Events</Button>
				</div>
			</Fragment>
		);
	}

	const date = new Date(props.date.year, props.date.month - 1);

	return (
		<Fragment>
			<ResultsTitle date={date} />
			<EventList items={filterEvents} />
		</Fragment>
	);
}

export async function getServerSideProps(context) {
	const { params } = context;
	const filterData = params.slug;

	const filterYear = filterData[0];
	const filterMonth = filterData[1];

	const numYear = +filterYear;
	const numMonth = +filterMonth;

	if (isNaN(numYear) || isNaN(numMonth) || numYear > 2030 || numYear < 2021 || numMonth < 1 || numMonth > 12) {
		return {
			props: {
				hasError: true
			}
		};
	}

	const filterEvents = await getFilteredEvents({
		year: numYear,
		month: numMonth
	});

	return {
		props: {
			events: filterEvents,
			date: {
				year: numYear,
				month: numMonth
			}
		}
	};
}

export default FilteredEventsPage;
