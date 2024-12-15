import { EntryContext } from '../utilities/globalContext'
import { EntryContextType, Entry } from '../@types/context'
import { useContext } from 'react'

export default function ThemeContainer({ children }) {
    const {theme} = useContext(EntryContext) as EntryContextType
    return (
        <section className={theme}>
            {children}
        </section>
    )
}