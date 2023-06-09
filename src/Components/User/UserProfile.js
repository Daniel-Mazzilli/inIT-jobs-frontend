import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUserProvider } from "../../Providers/UserProvider.js";
import SkillsComponent from "../Job/SkillsComponent.js";
import userIcon from "../../Assets/USER.png";
import pencilBlack from "../../Assets/pencil-black.png";
import pencilGrey from "../../Assets/pencil-grey.png";
import "./UserProfile.css";

export default function UserProfile() {
  const navigate = useNavigate();
  const { userProfile, userJobs, isSignedIn, setIsSignedIn, theme, isRecruiterAcc, email } =
    useUserProvider();
  const [limit, setLimit] = useState(true);

  const dateFormat = (date) => {
    const newDate = date.split("T")[0].split("-");
    return `${newDate[1]}/${newDate[2]}/${newDate[0].substring(2)}`;
  };

  const mapJobs = (jobs) => {
    const val = limit ? 2 : jobs.length;
    return jobs.map(({ id, title, company, date_applied }, i) =>
      i < val ? (
        <p key={id}>
          <br />
          <strong>
            <Link to={`/jobs/${id}`}>{title}</Link>
          </strong>
          <br />
          <em>{company}</em> - {dateFormat(date_applied)}
        </p>
      ) : null
    );
  };

  return (
    <div>
      {!isSignedIn && (
        <div className="user-login-prompt">
          <h2>Login to access your user profile!</h2>
          <button className="login-button" onClick={() => setIsSignedIn(true)}>
            LOGIN
          </button>
        </div>
      )}
      {userProfile.id && (
        <div className="profile">
          <div className="top-profile">
            <div>
              <p>Name</p>
              <p className="bold label-spacing">
                {userProfile["first_name"] + " " + userProfile["last_name"]}
              </p>
              <br />
              <p>Education</p>
              <p className="bold label-spacing">{userProfile.education}</p>
              <br />
              <p>Skills & Technologies</p>
              <SkillsComponent
                // sorting ascending for skill ids
                skillsArr={userProfile.skills["skill_ids"].sort(
                  (a, b) => a - b
                )}
                justList={true}
              />
            </div>
            <div className="icon-edit">
              <img id="icon-user" src={userIcon} alt="user icon" />
              {!isRecruiterAcc && <button
                onClick={() => navigate(`/user/edit`)}
                className="profile-button"
              >
                EDIT{" "}
                <img
                  src={theme === "light" ? pencilBlack : pencilGrey}
                  alt="pencil"
                />
              </button>}
            </div>
          </div>
          <br />
          <p>Portfolio Projects</p>
          <ul className="portfolio">
            <li className="bold label-spacing">
              {userProfile["project_one"] ? (
                <a href={userProfile["project_one"]} target="_blank">
                  Project one
                </a>
              ) : (
                "add link"
              )}
            </li>
            <li className="bold">
              {userProfile["project_two"] ? (
                <a href={userProfile["project_two"]} target="_blank">
                  Project two
                </a>
              ) : (
                "add link"
              )}
            </li>
          </ul>
          <br />
          <p>About me</p>
          <p className="bio-section bold label-spacing">{userProfile.bio || "add a short bio"}</p>
          <br />
          {isRecruiterAcc && <div className="user-email">
            Contact me here
            <p>{email}</p>
            </div>}
          {!isRecruiterAcc && <div className="applications">
            <p className="bold">My Applications</p>
            <div>
              {userJobs.length > 0 && mapJobs(userJobs)}
              <br />
              <button
                id="activity-button"
                onClick={() =>
                  userJobs.length === 0 ? navigate("/jobs") : setLimit(!limit)
                }
              >
                {userJobs.length > 0
                  ? limit
                    ? "VIEW ALL"
                    : "HIDE"
                  : "FIND JOBS"}
              </button>
            </div>
          </div>}
        </div>
      )}
    </div>
  );
}
