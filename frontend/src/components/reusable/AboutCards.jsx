import AboutUsIndivual from "./AboutUsIndivual";

const AboutCards = ({ role, members }) => {
    return (
        <div className="flex flex-col gap-8">
            <div className="flex-col w-full p-4 rounded-2xl dark:bg-gray-700 bg-gray-200 text-xl poppins">
                <span
                    data-testid="role-card"
                    className="text-2xl font-semibold"
                >
                    {role}
                </span>
                <AboutUsIndivual members={members} />
            </div>
        </div>
    );
};

export default AboutCards;
