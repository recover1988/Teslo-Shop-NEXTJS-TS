import { FC, useReducer } from 'react'
import { UIContext, uiReducer } from './'

export interface UIState {
    isMenuOpen: boolean
}

const UI_INITIAL_STATE: UIState = {
    isMenuOpen: false
}

interface Props {
    children?: React.ReactNode | undefined,
}

export const UIProvider: FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)

    const toggleSideMenu = () => {
        dispatch({ type: '[UI] - ToggleMenu' })
    }

    return (
        <UIContext.Provider value={{
            ...state,
            //Metodos
            toggleSideMenu,
        }} >
            {children}
        </UIContext.Provider>
    )
}   