import Button from "./Button";
import React from "react";
import Divider from "./Divider";

const AboutUsIndivual = ({ members }) => {
  return (
    <>
      {members.map((member) => (
        <div key={member.name} className="flex py-4 justify-between">
          <img
            data-testid="member-image"
            className="max-h-28 max-w-28 rounded-full"
            src={member.picture}
          />
          <div className="flex-col content-end">
            <p data-testid="member-name" className="flex poppins py-2 font-semibold">{member.name}</p>
            <div className="flex justify-end grow">
              <Button onClick={() => window.open(member.link, "_")}>
                GitHub
              </Button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default AboutUsIndivual;
