import AuthPage from "./pages/AuthPage";
import LandingPage from "./pages/LandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import ResetPasswordEmailPage from "./pages/ResetPasswordEmailPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/login" element={<AuthPage />} />
				<Route path="/signup" element={<AuthPage />} />
				<Route
					path="/email-verification"
					element={<EmailVerificationPage />}
				/>
				<Route
					path="/reset-password-email"
					element={<ResetPasswordEmailPage />}
				/>
				<Route path="/reset-password" element={<ResetPasswordPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
