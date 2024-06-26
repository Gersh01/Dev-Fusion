import AuthPage from "./pages/AuthPage";
import LoginPanel from "./components/auth/LoginPanel";
import SignUpPanel from "./components/auth/SignUpPanel";
import ResetPasswordEmailPanel from "./components/auth/ResetPasswordEmailPanel";
import ResetPasswordPanel from "./components/auth/ResetPasswordPanel";
import EmailverificationPanel from "./components/auth/EmailVerificationPanel";
import LanderPanel from "./components/lander/LanderPanel";
import DisocverPage from "./pages/DiscoverPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ContentPage from "./pages/ContentPageContainer";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<AuthPage />}>
					<Route path="/" element={<LanderPanel />} />
					<Route path="/login" element={<LoginPanel />} />
					<Route path="/signup" element={<SignUpPanel />} />
					<Route
						path="/email-verification"
						element={<EmailverificationPanel />}
					/>
					<Route
						path="/reset-password-email"
						element={<ResetPasswordEmailPanel />}
					/>
					<Route
						path="/reset-password"
						element={<ResetPasswordPanel />}
					/>
				</Route>
				<Route path="/" element={<ContentPage />}>
					<Route path="/discover" element={<DisocverPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
