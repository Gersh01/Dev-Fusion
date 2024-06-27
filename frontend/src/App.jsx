import AuthPage from "./pages/AuthPage";
import LoginPanel from "./components/auth/LoginPanel";
import SignUpPanel from "./components/auth/SignUpPanel";
import ResetPasswordEmailPanel from "./components/auth/ResetPasswordEmailPanel";
import ResetPasswordPanel from "./components/auth/ResetPasswordPanel";
import EmailverificationPanel from "./components/auth/EmailVerificationPanel";
import LanderPanel from "./components/lander/LanderPanel";
import DisocverPage from "./pages/DiscoverPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ContentPageContainer from "./pages/ContentPageContainer";
import ProjectsPage from "./pages/ProjectsPage";
import { useSelector } from "react-redux";

function App() {
	const displayMode = useSelector((state) => state.system.displayMode);

	return (
		<div className={`${displayMode} text-black dark:text-white`}>
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
