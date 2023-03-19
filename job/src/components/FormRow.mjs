const FormRow = ({value,name,handleChange,type,labelText}) => {
    return <div className="form-row">
        <label htmlFor={name} className="form-label">{ labelText || name}</label>
        <input type={type}
            value={value}
            name={name}
            onChange={handleChange}
            className="form-input"
    >
    
    </input>
</div>
}
export default FormRow