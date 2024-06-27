import AuthPage from "./pages/AuthPage";
import DisocverPage from "./pages/DiscoverPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ContentPageContainer from "./pages/ContentPageContainer";
import ProjectsPage from "./pages/ProjectsPage";
import { useSelector } from "react-redux";
import LanderPage from "./pages/LanderPage";
import LoginPage from "./pages/LoginPanel";
import SignUpPage from "./pages/SignUpPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import ResetPasswordEmailPage from "./pages/ResetPasswordEmailPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

function App() {
	const displayMode = useSelector((state) => state.system.displayMode);

	return (
		<div className={`${displayMode} text-black dark:text-white`}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<AuthPage />}>
						<Route path="/" element={<LanderPage />} />
						<Route path="/login" element={<LoginPage />} />
						<Route path="/signup" element={<SignUpPage />} />
						<Route
							path="/email-verification"
							element={<EmailVerificationPage />}
						/>
						<Route
							path="/reset-password-email"
							element={<ResetPasswordEmailPage />}
						/>
						<Route
							path="/reset-password"
							element={<ResetPasswordPage />}
						/>
					</Route>
					<Route path="/" element={<ContentPageContainer />}>
						<Route path="/discover" element={<DisocverPage />} />
						<Route
							path="/projects"
							// * Redirect to /projects/my-project upon visit
							element={<Navigate to="/projects/my-projects" />}
						/>
						<Route
							path="/projects/my-projects"
							element={<ProjectsPage />}
						/>
						<Route
							path="/projects/joined-projects"
							element={<ProjectsPage />}
						/>
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
