import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContextProvider } from "./Provider.js";
import { useParams } from "react-router-dom";

export const JobContextData = createContext();
export function useJobProvider() {
  return useContext(JobContextData);
}
const TASK = process.env.REACT_APP_TASK_BREAK;

function JobProvider({ children }) {
  const {
    API,
    axios,
    userID,
    isRecruiterAcc,
    isSignedIn,
    setIsRecruiterAcc,
    recruiterID,
    setRecruiterID,
  } = useContextProvider();
  const { jobID } = useParams();
  const navigate = useNavigate()
  const [jobs, setJobs] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [recruiterJobs, setRecruiterJobs] = useState([]);

  const [editAccess, setEditAccess] = useState(false);
  const [showAccess, setShowAccess] = useState(isRecruiterAcc)

  const [bonus, setBonus] = useState({})

  useEffect(() => {
    axios
      .get(`${API}/jobs`)
      .then(({ data }) => {
        setJobs(data);
        setSearchResult(data);
      })
      .catch((error) => console.log(error));

    // axios.get(`${API}/jobs/22`)
    //   .then(({data}) => setBonus(data))
    //   .catch(err=> console.log(err))
  }, []);

  useEffect(() => {
    if (recruiterID) {
      axios
        .get(`${API}/recruiters/${recruiterID}`)
        .then(({ data }) => {
          setRecruiterJobs(data["jobs_posted"])
          if(jobID){
            const applicantAccess = data["jobs_posted"].find(({id}) => id=== +jobID)
            if(applicantAccess){
              setShowAccess(true)
            }
            else {
              setShowAccess(false)
            }
          }
        })
        .catch((err) => console.log(err));
    }
    if (jobID && recruiterID) {
      axios
        .get(`${API}/jobs/${jobID}`)
        .then(({ data }) => {
          if (data["recruiter_id"] === +recruiterID) {
            setEditAccess(true);
          } 
          else {
            if(!editAccess && !showAccess && !isRecruiterAcc)
            navigate("/not-found");
          }
        })
        .catch((err) => console.log(err));
    }
  }, [recruiterID, jobID]);

  return (
    <JobContextData.Provider
      value={{
        API,
        axios,
        jobID,
        userID,
        jobs,
        setJobs,
        searchResult,
        setSearchResult,
        TASK,
        recruiterID,
        setRecruiterID,
        editAccess,
        setEditAccess,
        isRecruiterAcc,
        recruiterJobs,
        isSignedIn,
        setIsRecruiterAcc,
        showAccess,
        setShowAccess,
        bonus,
        setBonus,
      }}
    >
      {children}
    </JobContextData.Provider>
  );
}

export default JobProvider;
