import React, { useState, useEffect } from 'react'
import { FaAngleDoubleRight } from 'react-icons/fa'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tabs-project'
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [value, setValue] = useState(0)

  const getJobs = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const newJobs = await response.json();
      setIsLoading(false);
      setJobs(newJobs);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }

  useEffect(() => {
    getJobs();
  }, []);

  if (isLoading) {
    return (
      <section className="section loading">
        <h1>Loading...</h1>
      </section>
    )
  }

  const { title, dates, duties, company } = jobs[value];

  return (
    <section className="section">
      <div className="title">
        <h2>Experience</h2>
        <div className="underline"></div>
      </div>
      <div className="jobs-center">
        <div className="btn-container">
          {jobs.map((job, index) => {
            return (
              <button
                key={index}
                type='button'
                className={`job-btn ${index === value && 'active-btn'}`}
                onClick={() => setValue(index)}
              >
                {job.company}
              </button>
            )
          })}
        </div>

        <article className="job-info">
          <h3>{title}</h3>
          <h4>{company}</h4>
          <h6 className="job-date">{dates}</h6>
          {duties.map((duty, i) => {
            return (
              <div key={i} className="job-desc">
                <FaAngleDoubleRight className='job-icon' />
                <p>{duty}</p>
              </div>
            )
          })}
        </article>
      </div>
        <button type='button' className="btn">More info</button>
    </section>
  )
}

export default App
