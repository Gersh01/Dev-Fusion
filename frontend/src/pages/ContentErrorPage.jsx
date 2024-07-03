import { Navigate, useRouteError } from "react-router-dom";

const ContentErrorPage = () => {
    const routeError = useRouteError();

    console.log(routeError);

    if (routeError.response) {
        if (routeError.response.status === 403) {
            return <Navigate to="/" />;
        }

        if (routeError.response.status === 500) {
            return (
                <div className="min-w-screen min-h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-800">
                    <p className="text-4xl font-semibold">ERROR 500</p>
                </div>
            );
        }
    }

    return null;
};

export default ContentErrorPage;
