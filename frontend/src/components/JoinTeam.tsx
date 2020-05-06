import React from "react";
import { IWavelengthData } from "../store/store";

interface IJoinTeamProps {
  teams: string[];
  wavelengthData: IWavelengthData;
}

export const JoinTeam = ({ teams, wavelengthData }: IJoinTeamProps) => {
  return (
    <div>
      <div className="text-center w-100 h3">Select your Team!</div>
      <div className="w-100 d-flex justify-content-center">
        {teams.map((teamKey) => {
          const teamData = wavelengthData.teams[teamKey];
          if (teamData) {
            return (
              <a
                href={`/${teamKey}`}
                className="mr-3 bold text-underline font-weight-bold"
              >
                {teamData.name}
              </a>
            );
          }
          return <></>;
        })}
      </div>
      ;
    </div>
  );
};
