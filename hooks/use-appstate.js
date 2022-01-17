import { useState, useContext, createContext } from 'react';

const AppStateContext = createContext(undefined)

export function AppStateProvider({ children }) {
    const [hasDismissedNotification, setHasDismissedNotification] = useState(false)
    const [currentUser, setCurrentUser] = useState(null)

    return (
        <AppStateContext.Provider
            value={{
                hasDismissedNotification,
                setHasDismissedNotification,
                currentUser,
                setCurrentUser
            }}
        >
            {children}
        </AppStateContext.Provider>
    )
}

export function useAppState() {
    const context = useContext(AppStateContext)

    return context
}