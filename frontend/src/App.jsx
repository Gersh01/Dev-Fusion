import AuthPage from "./pages/AuthPage";
import DisocverPage from "./pages/DiscoverPage";
import {
  Route,
  Navigate,
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
import { getUserFromJwt } from "./pages/loaders/userLoader";
import ProfilePage from "./pages/ProfilePage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route>
        <Route
          path="/"
          element={<AuthPage />}
          loader={() => {
            return getUserFromJwt();
          }}
        >
          <Route path="/" element={<LanderPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          <Route
            path="/email-verification"
            element={<EmailVerificationPage />}
          />
        </Route>
        <Route
          path="/reset-password-email"
          element={<ResetPasswordEmailPage />}
        />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Route>

      {/* <Route element={<PrivateRoutes />}> */}
      <Route
        path="/"
        element={<ContentPageContainer />}
        loader={() => {
          return getUserFromJwt();
        }}
      >
        <Route path="/discover" element={<DisocverPage />} />
        <Route
          path="/projects"
          // * Redirect to /projects/my-project upon visit
          element={<Navigate to="/projects/my-projects" />}
        />
        <Route path="/projects/my-projects" element={<ProjectsPage />} />
        <Route path="/projects/joined-projects" element={<ProjectsPage />} />
        <Route path="/user-settings" element={<SettingsPage />} />
        <Route path="/my-profile" element={<ProfilePage />} />
      </Route>
      {/* </Route> */}
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
