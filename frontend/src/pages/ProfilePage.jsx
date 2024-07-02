import Divider from "../components/reusable/Divider";
import { Fragment, useEffect, useRef, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getProjects } from "./loaders/projectLoader";
import logo from "../assets/DFLogoFinal.png";
import DiscoverProjectTile from "../components/discover/DiscoverProjectTile";
import BioProfileFields from "../components/profile/BioProfileFields";
import TechnologiesField from "../components/profile/TechnologiesField";
import Button from "../components/reusable/Button";
import { getUsersProfile } from "./loaders/userLoader";

const ProfilePage = () => {
    let res = useSelector((state) => state.user);
    let id = "66816e44edbab2c4d116387d";
    const tech = res.technologies;
    const navigate = useNavigate();
    const [projects, setProjects] = useState(useLoaderData());
    const [endOfSearch, setEndOfSearch] = useState(false);
    const [myProfile, SetMyProfile] = useState(true);

    const projectsContainerRef = useRef();

    // if (res.id !== profileId) {
    //     SetMyProfile(false);
    // }

    useEffect(() => {
        // if (res.id !== id) {
        //     SetMyProfile(false);
        // }
        // * Adding scroll listener to window
        window.addEventListener("scroll", handleScroll);
        console.log("Debug: Adding Event listner");
        // * Load
        if (projectsContainerRef.current.clientHeight <= window.innerHeight) {
            if (!endOfSearch) {
                retrieveMoreProjects();
            }
        }

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    });

    if (!projects) {
        return null;
    }

    const renderedProjectTiles = projects.map((project) => {
        return <DiscoverProjectTile key={project._id} project={project} />;
    });

    // * Lazy loading more projects
    const retrieveMoreProjects = async () => {
        if (projects.length === 0) {
            return;
        }
        const newProjects = await getProjects({
            searchBy: "title",
            sortBy: "recent",
            query: "",
            count: 4,
            initial: false,
            projectId: projects[projects.length - 1]._id,
        });

        setProjects([...projects, ...newProjects]);

        if (newProjects.length === 0) {
            setEndOfSearch(true);
        }
    };

    // * Only lazy load when reaching end of projects
    const handleScroll = () => {
        const bottom =
            window.innerHeight + window.scrollY >= document.body.scrollHeight;

        if (bottom) {
            retrieveMoreProjects();
        }
    };

    const displayError = () => {
        console.log("Returning error");
        return (
            <Fragment>
                <p className="text-xl text-center pb-4">
                    You are not apart of any projects
                </p>
                <div className="flex gap-5 flex-col items-center grow-0 sm:flex-row justify-center">
                    <Button onClick={() => navigate("/create")} large>
                        Create New Project
                    </Button>
                    <span className="league-spartan flex">Or</span>
                    <Button large onClick={() => navigate("/discover")}>
                        Discover Projects
                    </Button>
                </div>
            </Fragment>
        );
    };

    const testUsers = () => {
        let profile = getUsersProfile(id);
        console.log(profile);
    };

    return (
        <Fragment>
            <div
                className="flex justify-between items-end flex-wrap gap-y-2 min-w-[100px]
					poppins text-4xl font-bold gap-x-6"
            >
                <p>Profile</p>
                <button className="text-sm bg-gray-300" onClick={testUsers}>
                    Testing
                </button>
            </div>
            <Divider />
            <div className="flex min-w-[100px] gap-5">
                <img
                    className="max-h-20 max-w-20 md:max-h-28 md:max-w-28 rounded-full"
                    src={logo}
                ></img>
                <p className="flex items-center text-2xl md:text-4xl font-bold poppins text-wrap text-center ">
                    {res.username}
                </p>
            </div>
            <div className="flex flex-wrap gap-8 py-4">
                {/* Bio Field*/}
                <div className="flex flex-col w-full h-80 p-4 rounded-2xl dark:bg-gray-900 bg-gray-50 lg:w-3/5 text-xl poppins">
                    <BioProfileFields
                        title="Bio"
                        info={res.bio}
                        type={true}
                        privateView={myProfile}
                    />
                </div>
                {/*Technologies fields*/}
                <div className="flex flex-col p-4 rounded-2xl h-80 dark:bg-gray-900 bg-gray-50 w-full lg:w-1/5 lg:grow poppins text-xl">
                    <TechnologiesField
                        technologies={tech}
                        title="Technologies"
                        type={true}
                        privateView={myProfile}
                    />
                </div>
            </div>
            <p className="text-3xl poppins font-semibold">Projects</p>
            <div
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-8 pb-12"
                ref={projectsContainerRef}
            >
                {projects.length !== 0 ? renderedProjectTiles : null}
            </div>
            <div className="flex flex-col grow-0 poppins justify-center">
                {projects.length === 0 ? displayError() : null}
            </div>
            {endOfSearch && (
                <div className="self-center px-8 py-1 mb-12 rounded-full bg-gray-50 dark:bg-gray-900">
                    End of Search
                </div>
            )}
        </Fragment>
    );
};

export default ProfilePage;
