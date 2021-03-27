import { Fragment, useContext } from 'react';
import MainHeader from './main-header';
import Notification from '../../components/ui/notification';
import NotificationContex from '../../store/notification-context';

function Layout(props) {
	const notificationCtx = useContext(NotificationContex);
	const activeNotificaion = notificationCtx.notification;

	return (
		<Fragment>
			<MainHeader />
			<main>{props.children}</main>
			{activeNotificaion && (
				<Notification
					title={activeNotificaion.title}
					message={activeNotificaion.message}
					status={activeNotificaion.status}
				/>
			)}
		</Fragment>
	);
}

export default Layout;
