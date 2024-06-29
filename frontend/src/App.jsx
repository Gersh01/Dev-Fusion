import AuthPage from "./pages/AuthPage";
import DisocverPage from "./pages/DiscoverPage";
import {
	Route,
	createRoutesFromElements,
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";
import ContentPageContainer from "./pages/ContentPageContainer";
import ProjectsPage from "./pages/ProjectsPage";
import { useSelector } from "react-redux";
import LanderPage from "./pages/LanderPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import ResetPasswordEmailPage from "./pages/ResetPasswordEmailPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import { getProjectById, getProjects } from "./pages/loaders/projectLoader";
import ViewProjectPage from "./pages/ViewProjectPage";
import AboutUsPage from "./pages/AboutUsPage";
import { getUserFromJwt, validateJwt } from "./pages/loaders/userLoader";
import ContentErrorPage from "./pages/ContentErrorPage";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route>
			{/* AUTH ROUTES */}
			<Route
				path="/"
				element={<AuthPage />}
				loader={() => {
					return validateJwt();
				}}
			>
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
				<Route path="/reset-password" element={<ResetPasswordPage />} />
			</Route>
			{/* CONTENT ROUTES */}
			<Route
				path="/"
				element={<ContentPageContainer />}
				loader={() => {
					return getUserFromJwt();
				}}
				errorElement={<ContentErrorPage />}
			>
				<Route
					path="/discover"
					element={<DisocverPage />}
					loader={() => {
						return getProjects({
							searchBy: "title",
							sortBy: "relevance",
							query: "",
							count: 4,
							initial: true,
							projectId: "000000000000000000000000",
						});
					}}
				/>
				<Route path="/my-projects" element={<ProjectsPage />} />
				<Route path="/joined-projects" element={<ProjectsPage />} />
				<Route
					path="/projects/:id"
					element={<ViewProjectPage />}
					loader={({ params }) => {
						return getProjectById(params.id);
					}}
				/>
				<Route path="/my-profile" element={<ProfilePage />} />
				<Route path="/user-settings" element={<SettingsPage />} />
				<Route path="about" element={<AboutUsPage />} />
			</Route>
		</Route>
	)
);

function App() {
	const displayMode = useSelector((state) => state.system.displayMode);

	return (
		<div
			className={`${displayMode} text-black dark:text-white overflow-hidden`}
		>
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
