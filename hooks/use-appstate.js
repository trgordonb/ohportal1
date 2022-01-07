import { useState, useContext, createContext } from 'react';

const AppStateContext = createContext(undefined)

export function AppStateProvider({ children }) {
    const [hasDismissedNotification, setHasDismissedNotification] = useState(false)

    return (
        <AppStateContext.Provider
            value={{
                hasDismissedNotification,
                setHasDismissedNotification
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