import { createContext, useContext, useEffect, useState } from "react";
import {type FoodEntry, initialState, type ActivityEntry, type Credentials, type User } from "../types";
import { useNavigate } from "react-router-dom";
import mockApi from "../assets/mockApi";


const AppContext = createContext(initialState)

export const AppProvider = ({children}: {children: React.ReactNode}) => {

    const navigate = useNavigate()
    const [user, setUser] = useState<User>(null)
    const [isUserFetched, setIsUserFetched] = useState(false)
    const [onboardingCompleted, setOnboardingCompleted] = useState(false)
    const [allFoodLogs, setAllFoodLogs] = useState<FoodEntry[]>([])
    const [allActivityLogs, setAllActivityLogs] = useState<ActivityEntry[]>([])

    const signup = async (credentials: Credentials) => {
        const {data} = await mockApi.auth.register(credentials)
        setUser(data.user)
        if(data?.user?.age && data?.user?.weight && data?.user?.goal){
            setOnboardingCompleted(true)
        }
        localStorage.setItem('token', data.jwt)
    }

    const login = async (credentials: Credentials) => {
        const {data} = await mockApi.auth.login(credentials)
        setUser({...data.user, token: data.jwt})
        if(data?.user?.age && data?.user?.weight && data?.user?.goal){
            setOnboardingCompleted(true)
        }
        localStorage.setItem('token', data.jwt)
    }

    const fetchUser = async (token: string) => {
  try {
    const { data } = await mockApi.user.me()
    setUser({...data, token})
    if (data?.age && data?.weight && data?.goal) {
      setOnboardingCompleted(true)
    }
  } finally {
    setIsUserFetched(true) // always runs, even on error
  }
}

    const fetchFoodLogs = async () => {
        const { data } = await mockApi.foodLogs.list()
        setAllFoodLogs(data)
    }

    const fetchActivityLogs = async () => {
        const { data } = await mockApi.activityLogs.list()
        setAllActivityLogs(data)
    }

    const logout = () => {
        localStorage.removeItem('token')
        setUser(null)
        setOnboardingCompleted(false)
        navigate('/')
    }
    useEffect(() => {
  const token = localStorage.getItem('token')
  if (token) {
    (async () => {
      try {
        await fetchUser(token)
        await fetchFoodLogs()
        await fetchActivityLogs()
      } catch (error) {
        // Token is invalid/expired — clear it and show login
        localStorage.removeItem('token')
        setIsUserFetched(true)
      }
    })()
  } else {
    setIsUserFetched(true)
  }
}, [])

    const value = {
        user, setUser, isUserFetched, fetchUser, signup, login, logout, onboardingCompleted, setOnboardingCompleted, allFoodLogs, allActivityLogs,setAllFoodLogs, setAllActivityLogs
    }

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export const useAppContext = () => useContext(AppContext)