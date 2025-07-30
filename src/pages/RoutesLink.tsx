import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
} from "react-router-dom";
import RouterApp from "./RouterApp.tsx";
import PaymentPage from "./payment/page.tsx";
import SuccessPage from "./payment/pages/SuccessPage.tsx";

const rountesLink = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<RouterApp />}>
			<Route path="/payment" element={<PaymentPage />} />
			<Route path="/payment/success" element={<SuccessPage />} />
		</Route>
	)
);

export default rountesLink;
