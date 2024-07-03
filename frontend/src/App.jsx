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
import {
    getJoinedProjects,
    getOwnedProjects,
    getProjectById,
    getProjects,
    getProfileProjects,
} from "./pages/loaders/projectLoader";
import ViewProjectPage from "./pages/ViewProjectPage";
import AboutUsPage from "./pages/AboutUsPage";
import {
    getUserFromJwt,
    validateJwt,
    getUsersProfile,
} from "./pages/loaders/userLoader";
import ContentErrorPage from "./pages/ContentErrorPage";
import ResetAuthPage from "./pages/ResetAuthPage";
import CreatePage from "./pages/CreatePage";
import VerifiedUsersWelcomePage from "./pages/VerifiedUsersWelcomePage";
import UrlNotFoundPage from "./pages/UrlNotFoundPage";
import ProjectsApplicationsPage from "./pages/ProjectsApplicationsPage";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            {/* AUTH ROUTES */}
            <Route
                path="/"
                element={<AuthPage />}
                loader={async () => {
                    return await validateJwt();
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
                    path="/verified-user"
                    element={<VerifiedUsersWelcomePage />}
                />
            </Route>
            <Route path="/" element={<ResetAuthPage />}>
                <Route path="/*" element={<UrlNotFoundPage />} />
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
                    loader={async () => {
                        return await getProjects({
                            searchBy: "title",
                            sortBy: "relevance",
                            query: "",
                            count: 4,
                            initial: true,
                            projectId: "000000000000000000000000",
                        });
                    }}
                />
                <Route
                    path="/my-projects"
                    loader={async () => {
                        return await getOwnedProjects({
                            searchBy: "title",
                            sortBy: "recent",
                            query: "",
                            count: 4,
                            initial: true,
                            projectId: "000000000000000000000000",
                        });
                    }}
                    element={<ProjectsPage />}
                />
                <Route
                    path="/joined-projects"
                    loader={async () => {
                        return await getJoinedProjects({
                            searchBy: "title",
                            sortBy: "recent",
                            query: "",
                            count: 4,
                            initial: true,
                            projectId: "000000000000000000000000",
                        });
                    }}
                    element={<ProjectsPage />}
                />
                <Route
                    path="/projects/:id"
                    loader={async ({ params }) => {
                        return await getProjectById(params.id);
                    }}
                    element={<ViewProjectPage />}
                />
                <Route
                    path="/profile"
                    loader={async () => {
                        return {
                            projects: await getProfileProjects({
                                userId: "",
                                searchBy: "title",
                                sortBy: "recent",
                                query: "",
                                count: 4,
                                initial: true,
                                projectId: "000000000000000000000000",
                            }),
                            user: null,
                        };
                    }}
                    element={<ProfilePage />}
                />
                <Route
                    path="/profile/:id"
                    loader={async ({ params }) => {
                        return {
                            user: await getUsersProfile(params.id),
                            projects: await getProfileProjects({
                                userId: params.id,
                                searchBy: "title",
                                sortBy: "recent",
                                query: "",
                                count: 4,
                                initial: true,
                                projectId: "000000000000000000000000",
                            }),
                            privateProfile: false,
                        };
                    }}
                    element={<ProfilePage />}
                />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/create" element={<CreatePage />} />
                <Route
                    path="/applications"
                    element={<ProjectsApplicationsPage />}
                />
                <Route path="/about" element={<AboutUsPage />} />
            </Route>
        </Route>
    )
);

function App() {
    const displayMode = useSelector((state) => state.system.displayMode);

    return (
        <div className={`${displayMode} text-black dark:text-white`}>
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
