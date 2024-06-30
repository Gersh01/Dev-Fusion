import Bubble from "../components/reusable/Bubble";
import Input from "../components/reusable/Input";
import Button from "../components/reusable/Button";
import NavBar from "../components/nav/NavBar"
import BubblePanel from "../components/reusable/BubblePanel";


const CreatePage = () =>
    {
        
        //TODO: Finish Creation Function
        const doCreate = async (e) => {

        }

        return(
            <div>
                <NavBar />
                <div className="">
                    
                    {/* Project Title */}
                    <Input
                    titleText="Project Title"
                    placeHolder="Enter Project Title">
                    </Input>

                    {/* TODO: Look into different format for date input */}
                    <div className="flex gap-2">

                        {/* Start Date */}
                        <Input
                        titleText="Start Date"
                        placeHolder="Enter the start date">
                        </Input>
                    
                        {/* Deadline */}
                        <Input
                        titleText="Deadline"
                        placeHolder="Enter the deadline">
                        </Input>
                    </div>

                    {/* Description */}
                    <Input
                    titleText="Description"
                    placeHolder="Tell us all about your project">
                    </Input>

                    {/* TODO: Technologies */}
                    <BubblePanel
                    titleText="Technologies"
                    techType>
                    </BubblePanel>
                    
                    {/* Expectations */}
                    <Input
                    titleText="Expectations"
                    placeHolder="What do you need from your roles?">
                    </Input>

                    {/* TODO: Roles */}
                    <BubblePanel
                    titleText="Roles"
                    roleType>
                    </BubblePanel>

                    {/* TODO: Communication */}
                    <BubblePanel
                    titleText="Communication"
                    commsType>
                    </BubblePanel>

                    {/* Publish */}
                    <Button onClick={doCreate} large>
                        Publish
                    </Button>
                </div>
            </div>
        );
    };