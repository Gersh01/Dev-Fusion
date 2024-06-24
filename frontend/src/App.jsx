import AuthPage from "./pages/AuthPage";
import LandingPage from "./pages/LandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
	// let theme = "";

	// if (
	// 	localStorage.theme === "dark" ||
	// 	(!("theme" in localStorage) &&
	// 		window.matchMedia("(prefers-color-scheme: dark)").matches)
	// ) {
	// 	document.documentElement.classList.add("dark");
	// 	theme = "dark";
	// } else {
	// 	document.documentElement.classList.remove("dark");
	// }

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/login" element={<AuthPage />} />
				<Route path="/signup" element={<AuthPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
