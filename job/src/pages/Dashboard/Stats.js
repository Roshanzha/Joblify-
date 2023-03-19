import { Fragment, useEffect } from "react"
import { ChartsContainer, StatsContainer } from "../../components"
import Loading from "../../components/Loading"
import {  useAppContext } from "../../context/appContext.mjs"
const Stats = () => {
    const { showStats, isLoading, monthlyApplications} = useAppContext()
    useEffect(() => {
       showStats() 
    }, [])
    if (isLoading === true) {
        return <Loading center />
    }
    return <Fragment>
        <StatsContainer />
        {monthlyApplications.length>0 && <ChartsContainer/>}
    </Fragment>
}
export default Stats