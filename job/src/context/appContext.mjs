import React, { useState, useReducer, useContext } from "react";
import reducer from "./reducer.mjs";
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_BEGIN,
  LOGIN_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_JOB_BEGIN,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_ERROR,
  GET_JOBS_BEGIN,
  GET_JOBS_SUCCESS,
  SET_EDIT_JOB,
  DELETE_JOB_BEGIN,
  DELETE_JOB_ERROR,
  EDIT_JOB_BEGIN,
  EDIT_JOB_ERROR,
  EDIT_JOB_SUCCESS,
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
  CLEAR_FILTERS,CHANGE_PAGE
} from "./actions.js";
import axios from "axios";
const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
const userLocation = localStorage.getItem("location");


const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user:user? JSON.parse(user):null,
  token:token || null,
  userLocation: userLocation || "",
  showSidebar: false,
  isEditing: false,
  editJobId: '',
  position: '',
  company: '',
  jobLocation: userLocation || "",
  jobTypeOptions: ['fulltime', 'parttime', 'remote', 'internship'],
  jobType: 'fulltime',
  statusOptions: ['interview', 'declined', 'pending'],
  status: 'pending',
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  search:'',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],

};




const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //   // axios
  // const authFetch = axios.create({
  //   baseURL:'api/v1'
  // }) 
  // authFetch.interceptors.request.use((config) => {
  //   config.headers.Authorization=`Bearer ${state.token}`
  //   return config
  // }, (error) => {
    
  //   return Promise.reject(error)
  // })
  
  // authFetch.interceptors.response.use((response) => {
  //   return response
  // }, (error) => {
  //   console.log(error.response)
  //   if (error.response.status === 401) {
  //     console.log("auth error")
  //   }
  //   return Promise.reject(error)
  // })
  
  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };
  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };
  const addUserToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("location", location);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("location");
  };
//register
  const registerUser = async (currentUser) => {
    // console.log(currentUser);
    try {
      dispatch({ type: REGISTER_USER_BEGIN });
      const data = await fetch("api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentUser),
      });
      console.log(data);

      const response = await data.json();
      // console.log(response);

      const { user, token, location } = response;
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: { user, location, token },
      });
      addUserToLocalStorage({ user, token, location });
    } catch (error) {
      console.log(error);
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { msg: error.message },
      });
    }
    clearAlert();
  };
  //login 
  const loginUser = async (currentUser) => {
    
    try {
    dispatch({ type: LOGIN_USER_BEGIN });
    
      const data = await fetch("api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentUser),
      });
      console.log(data);

      const response = await data.json();

      const { user, token, location } = response;

      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { user, token, location },
      });
      addUserToLocalStorage({ user, token, location });
    } catch (error) {
      console.log(error);
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response },
      });
    }
    clearAlert();
  };
  const toggleSidebar = () => {
    dispatch({type:TOGGLE_SIDEBAR})
  }
  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER })
    removeUserFromLocalStorage()
  }
  // Update user
  const updateUser = async (currentUser) => {
    try {
    dispatch({ type: UPDATE_USER_BEGIN });
   const data = await fetch("api/v1/auth/updateUser", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization":`Bearer ${state.token}`
      },
      body: JSON.stringify(currentUser),
    });
      const response = await data.json();

      const { user,  location,token } = response;

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, location, token },
      });
      addUserToLocalStorage({user,location,token})
    } catch (error) {
      console.log(error)
      dispatch({
        type: UPDATE_USER_ERROR,
        payload: { msg: error.response },
      });
    }
    clearAlert();
}
//handle change
  const handleChange = ({name,value}) => {
  dispatch({type :HANDLE_CHANGE,payload:{name,value} })
  }
  const clearValues = () => {
    dispatch({type:CLEAR_VALUES})
  }
//create job
  const createJob = async () => {
    dispatch({ type: CREATE_JOB_BEGIN })

    try {
      const data = await fetch("api/v1/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        "Authorization":`Bearer ${state.token}`

        },
        body: JSON.stringify(state),
      });
console.log('data',data)
      const response = await data.json();

      dispatch({ type: CREATE_JOB_SUCCESS })
      dispatch({type:CLEAR_VALUES})
    }
    catch(error)
    {
      console.log(error)
      if(error.response === 401) return
      dispatch({
        type: CREATE_JOB_ERROR,
        payload: { msg: error.response }
      })
    }
    clearAlert()
  }
//get jobs
  const getJobs = async () => {
    const {page, search, searchStatus, searchType, sort } = state
    let url =
      `api/v1/jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}
   `
    if (search) {
      url=url+`&search=${search}`
    }
    dispatch({ type: GET_JOBS_BEGIN })    
    try {
    const data = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      "Authorization":`Bearer ${state.token}`
      },
      body: JSON.stringify(),
    });
    const response = await data.json();
    console.log(response)
      const { jobs, totalJobs, numOfPages } = response

      dispatch({
        type: GET_JOBS_SUCCESS,
        payload:{
        jobs,totalJobs,numOfPages
        }
      })
    }
    catch (error) {
logoutUser()
    }
    clearAlert()
  }
  //set edit job
  const setEditJob = (id) => {
    dispatch({ type: SET_EDIT_JOB, payload: { id } })
  }
  //edit job
  const editJob =async () => {
    dispatch({ type: EDIT_JOB_BEGIN })
    try {
      const { position, company, jobLocation, jobType, status } = state
      const data = await fetch(`api/v1/jobs/${state.editJobId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization":`Bearer ${state.token}`
        },
        body: JSON.stringify(state),
      });
      const response = await data.json();
      dispatch({type:EDIT_JOB_SUCCESS})
   dispatch({type:CLEAR_VALUES})
    } catch (err) {
      console.log(err.status)
dispatch({type:EDIT_JOB_ERROR,payload:{msg:err.message}})
    }
clearAlert()
  }
  //DELETE JOB
  const deleteJob = async(id) => {
    dispatch({ type: DELETE_JOB_BEGIN })
 
    try {
      const data=   await fetch(`api/v1/jobs/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        "Authorization":`Bearer ${state.token}`
        },
        body: JSON.stringify(),
      });
  
    const response = await data.json();
      getJobs()

    }    
    catch (error) {
      dispatch({
        type: DELETE_JOB_ERROR,
        payload: { msg: error.response.data.msg },
      });
      logoutUser()
    }
    clearAlert();
  }
  const showStats = async () => {
    dispatch({ type: SHOW_STATS_BEGIN })
    
    try {
      const data = await fetch("api/v1/jobs/stats", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${state.token}`
        },
        body: JSON.stringify(),
      });
      
      const response = await data.json();
      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: {
          stats: response.defaultStats,
          monthlyApplications:response.monthlyApplications
        }
      })
    }
    catch(error) {
logoutUser()
    }
    clearAlert()
}
  const clearFilters = () => {
dispatch({type: CLEAR_FILTERS})
  }
  const changePage = (page) => {
    dispatch({type:CHANGE_PAGE,payload:{page}})
  }
  
  return (
    <AppContext.Provider
      value={{
        ...state, displayAlert, registerUser, loginUser,
        toggleSidebar, logoutUser, updateUser, handleChange, clearValues,
        createJob, getJobs, deleteJob, setEditJob, editJob, showStats,
        clearFilters,changePage
        
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};
export { AppProvider, initialState, useAppContext };
