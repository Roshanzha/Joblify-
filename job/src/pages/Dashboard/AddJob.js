import { useAppContext } from "../../context/appContext.mjs"
import Wrapper from '../../assets/wrappers/DashboardFormPage.js'
import Alert from '../../components/Alert.mjs'
import FormRow from '../../components/FormRow.mjs'
import FormRowSelect from "../../components/FormRowSelect.mjs"
const AddJob = () => {
    const {isLoading, isEditing, showAlert, displayAlert, position, company, jobLocation,
        jobType, jobTypeOptions, status, statusOptions, handleChange, clearValues, createJob,
    editJob
    } = useAppContext()
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!position || !company || !jobLocation) {
            displayAlert()
            return
        }
        if (isEditing) {
         editJob()
            return
        }
        
        createJob()
}

    const handleJobInput = (e) => {
        const name = e.target.name
        const value = e.target.value
    handleChange({name,value })
    }
    return <Wrapper>
        <form className="form" >
            <h3>{isEditing ? 'edit job' : 'add job'}</h3>
            {showAlert && <Alert />}
            <div className="form-center">
            {/*position */}
                <FormRow
                    type="text"
                    name="position"
                    value={position}
                handleChange={handleJobInput}
                />
                {/*company */}
                <FormRow type="text"
                    name="company"
                    value={company}
                handleChange={handleJobInput}
                />
                {/*location */}
                <FormRow type="text"
                    name="jobLocation" 
                    labelText='job location'
                value={jobLocation}
                handleChange={handleJobInput}
                />
                {/*job status*/}
                <FormRowSelect
                    name="status"
                    value={status} 
                    handleChange={handleJobInput}
                    list={statusOptions}
                />
                {/*job type */}
                <FormRowSelect
                name="jobType"
                 labelText="job Type"
                 value={jobType}
                 handleChange={handleJobInput}
                list={jobTypeOptions}
            />
{/*btn container */}
                <div className="btn-container">
                    <button type="submit" onClick={handleSubmit}
                        className="btn btn-block submit-btn"
    disabled={isLoading}
                    > submit </button>
                    <button className="btn btn-block clear-btn"
                        onClick={(e) => {
                            e.preventDefault()
                            clearValues()
                            console.log('clicked')
                    }}
                    >
                        clear
                    </button>
                </div>
            </div>
        </form>
    </Wrapper>
}
export default AddJob