import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
} from "react-router-dom";
import SeatReservationPage from "./reservation/Page.tsx";
import RouterApp from "./RouterApp.tsx";

const rountesLink = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<RouterApp />}>
			<Route path="/:performanceId/:scheduleId" element={<SeatReservationPage />} />
		</Route>
	)
);

export default rountesLink;
