import Bubble from "./Bubble";
import SearchField from "./SearchField";

//* titleText: string
//* techType: boolean
//* roleType: boolean
//* commsType: boolean

const BubblePanel = ({ titleText, techType = false, roleType = false, commsType = false}) => {
    
    //* TODO:Technologies to be chosen by user from search bar, cannot operate the same way as the DiscoverProjectTile
    const mockBubbleContents = {
        technologies: [
            "React",
			"Express",
			"MongoDB",
			"NodeJs",
			"Passport",
			"NodeMailer",
			"JavaScript",
			"React Redux",
			"Flutter",
        ],
        roles: [
            "API",
            "Front End",
            "Database",
            "Project Manager",
        ],
        communication: [
            "Discord",
            "Github",
            "iMessage",
            "Trello",
        ],
    };

    //* Separate Renders for different versions (temporary)
    const renderedTechnologyBubbles = mockBubbleContents.technologies.map((technology) => {
        return <Bubble key={technology} text={technology} />
    });

    const renderedRoleBubbles = mockBubbleContents.roles.map((role) => {
        return <Bubble key={role} text={role} />
    });
    
    const renderedCommunicationBubbles = mockBubbleContents.communication.map((platform) => {
        return <Bubble key={platform} text={platform} />
    });

    return (
        <div>

            {/* Title and Searchbar */}
            {/* TODO: Search bar can must only search for the type of bubbles 
                currently displayed  */}
            <div
            className="flex flex-col bg-gray-200 dark:bg-gray-900 rounded-md text-black
            dark:text-white poppins min-w-0 min-h-0" >
                <p className="text-sm">{titleText}</p>
                <SearchField />
            </div>

            {/* Technology Bubbles */}
            {/* Current idea revolves around manually setting the type of bubble field,
                which would work with the search field to constrain the types than can
                be searched for (The techType can only search for technologies, etc.)*/}
            {techType && (
                <div className="flex flex-wrap gap-2">
                {renderedTechnologyBubbles}
            </div>
            )}

            {roleType && (
                <div className="flex flex-wrap gap-2">
                {renderedRoleBubbles}
            </div>
            )}

            {commsType && (
                <div className="flex flex-wrap gap-2">
                {renderedCommunicationBubbles}
            </div>
            )}
        </div>
    );
};

export default BubblePanel;