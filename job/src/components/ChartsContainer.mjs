import { useAppContext } from '../context/appContext.mjs'
import Wrapper from '../assets/wrappers/ChartsContainer.js'
import AreaChartComponent from './AreaChartComponent.mjs'
import { useState } from 'react'
import BarChartComponent from './BarChartComponent.mjs'
const ChartsContainer = () => {
    const [barChart, setBarChart] = useState(true)
    const { monthlyApplications: data } = useAppContext()
    console.log(data)
    return <Wrapper>
        <h4>monthlyApplication</h4>
        <button type='button' onClick={() => setBarChart(!barChart)}>
        {barChart?'Area Chart':'Bar Chart'}
        </button>

        {barChart ? <AreaChartComponent data={data} /> :
            <BarChartComponent data={data} />}
    </Wrapper>
}
export default ChartsContainer