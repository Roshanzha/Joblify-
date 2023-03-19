import { useState } from "react"
import { FormRow, Alert } from '../../components/index.js'
import { useAppContext } from "../../context/appContext.mjs"
import Wrapper from '../../assets/wrappers/DashboardFormPage.js'

const Profile = () => {
    const { user, showAlert, displayAlert, updateUser, isLoading } = useAppContext()
    const [name, setName] = useState(user?.name)
    const [lastName, setLastName] = useState(user?.lastName)
    const [email, setEmail] = useState(user?.email)
    const [location, setLocation] = useState(user?.location)
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !location || !lastName || !email)
        {
            displayAlert()
            
            return
        }
        updateUser({name,email,lastName,location})
}

    return <Wrapper>
        <form className="form" onSubmit={handleSubmit}>
            <h3>profile</h3>
            {showAlert && <Alert />}
            <div className="form-center">
                <FormRow type="text" name="name" value={name}
                    handleChange={(e)=> setName(e.target.value)}
                >
                </FormRow>
                <FormRow type="text" name="lastName"
                    labelText='lastName'
                    value={lastName}
                    handleChange={(e)=> setLastName(e.target.value)}
                >
                </FormRow>
                <FormRow type="text" name="email" value={email}
                    handleChange={(e)=> setEmail(e.target.value)}
                >
                </FormRow>
                <FormRow type="text" name="location" value={location}
                    handleChange={(e)=> setLocation(e.target.value)}
                >
                </FormRow>
                <button className="btn btn-block" type="submit"
                disabled={isLoading}>
                {isLoading ? "please wait..." : "save Changes"}
                </button>
            </div>
        </form>
    </Wrapper>
}
export default Profile