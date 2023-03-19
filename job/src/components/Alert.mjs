import { useAppContext } from "../context/appContext.mjs";
const Alert = () => {
  const { alertType, alertText } = useAppContext();
  return <div className={`alert alert-${alertType}`}>{alertText}</div>;
};
export default Alert;
