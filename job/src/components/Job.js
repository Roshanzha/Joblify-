import moment from 'moment'
import { FaLocationArrow, FaBriefcase } from 'react-icons/fa'
import GrMapLocation from 'react-icons/gr'

import { Link } from 'react-router-dom'
import { useAppContext } from '../context/appContext.mjs'
import Wrapper from '../assets/wrappers/Job.js'
import JobInfo from './JobInfo.mjs'
const Job = ({ _id, position, company, createdAt, jobLocation,
    jobType, status }) => {
    
    const {setEditJob,deleteJob}=useAppContext()
    let date = moment(createdAt)
    date=date.format('MMM Do, YYYY')
    return <Wrapper>
        <header>
        <div className='main-icon'>
        {company.charAt(0)}
            </div>
            <div className='info'>
                <h5>{position}</h5>
                <p>{ company}</p>
            </div>
        </header>
        <div className='content'>
            <div className='content-center'>
                <JobInfo
                    icon={<FaLocationArrow />}
                    text={jobLocation} />
                <JobInfo
                    icon={<FaLocationArrow />}
                    text={date} 
                />
                <JobInfo
                    icon={<FaBriefcase />}
                    text={jobType} />
            
                <div className={`status ${status}`}>
                    {status}
                </div>
            </div>
            <footer>
                <div className='actions'>
                    <Link to='/add-jobs'
                        className='btn edit-btn'
                        onClick={() => setEditJob(_id)}>
                        Edit
                    </Link>
                    <button
                        type='button'
                        className='btn delete-btn'
                    onClick={()=>deleteJob(_id)}>  
                    delete</button>
                </div>
            </footer>
        </div>
    </Wrapper>
}
export default Job