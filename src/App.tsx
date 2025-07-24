import { RouterProvider } from "react-router-dom";
import "./App.css";
import RoutesLink from "./pages/RoutesLink.tsx";

function App() {
	return <RouterProvider router={RoutesLink} />;
}

export default App;
