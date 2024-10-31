/* eslint-disable react/prop-types */


import { useState, useEffect } from "react";
import JobListing from "./JobListing";
import Spinner from "./Spinner";

// import jobs from "../jobs.json";
const JobListings = ({ isHome = false }) => {

  const [jobs, setJobs] = useState([]); //default is empty array []
  const [loading, setLoading] = useState(true);

  // in most cases we use empty array []
  useEffect(() => {
    const fetchJobs = async () => {
      const apiUrl = isHome ? '/api/jobs?_limit=3' : '/api/jobs';
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        setJobs(data);
      } catch (e) {
        console.log(`Error fetching data: ${e}`);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 2000);

        // setLoading(false);
      }
    };

    fetchJobs();
  }, []);


  // const jobsListings = isHome ? jobs.slice(0, 3) : jobs;


  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          {isHome ? <>Browse Jobs</> : <></>}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {loading ? (<div className="flex flex-cols justify-center items-center"><Spinner loading={loading} /></div>) :
            jobs.map((job) => (
              <JobListing job={job} key={job.id} />
            ))
          }
        </div>
      </div>
    </section>
  );
};

export default JobListings;
