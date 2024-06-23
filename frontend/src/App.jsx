import LandingPage from "./pages/LandingPage";
import SignInPage from "./pages/SignInPage";
import RegisteringPage from "./pages/RegisteringPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/login" element={<SignInPage />} />
				<Route path="/register" element={<RegisteringPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
