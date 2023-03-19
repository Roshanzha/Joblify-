import { useAppContext } from "../context/appContext.mjs";
import { useEffect } from "react";
import Loading from "./Loading.js";
import Job from "./Job.js";
import Wrapper from "../assets/wrappers/JobsContainer.js";
import PageBtnContainer from "./PageBtnContainer.js";
const JobsContainer = () => {
  const { getJobs,
    isLoading,
    totalJobs,
    jobs,
    page,
    search,
    searchType,
    searchStatus,
    sort,
  numOfPages
  } = useAppContext();
  useEffect(() => {
    getJobs();
  }, [ page,search,
    searchType,
    searchStatus,
  sort]);
  console.log(totalJobs)
  if (isLoading) {
      return <Loading center/>
  }
  if (jobs.length === 1) {
    return <Wrapper>No jobs found...!</Wrapper>;
  }
  return (
    <Wrapper>
      <h5>
        {totalJobs} job{jobs.length > 1 && "s"}
      </h5>
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
   {numOfPages>1 && <PageBtnContainer/>}   
    </Wrapper>
  );
};
export default JobsContainer;
