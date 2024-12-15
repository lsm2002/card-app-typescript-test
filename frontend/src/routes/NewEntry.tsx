import {useState, useContext, ChangeEvent, MouseEvent} from 'react'
import {EntryContext} from '../utilities/globalContext'
import {Entry, EntryContextType} from '../@types/context'

export default function NewEntry(){
    const emptyEntry: Entry = {title: "", description: "",created_at: new Date(), scheduled_for: new Date()}
    const { saveEntry } = useContext(EntryContext) as EntryContextType
    const [newEntry,setNewEntry] = useState<Entry>(emptyEntry)
    const handleInputChange = (event: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        setNewEntry({
            ...newEntry,
            [event.target.name] : event.target.value
        })
    }
    const handleSend = (e: MouseEvent<HTMLButtonElement>) => {
        saveEntry(newEntry)
        setNewEntry(emptyEntry)
    }
    const initialScheduledForValue =  (newEntry.scheduled_for != null ? new Date(newEntry.scheduled_for) : new Date()).toISOString().split('T')[0]
    return(
        <section className="flex justify-center flex-col w-fit ml-auto mr-auto mt-10 gap-5 bg-gray-300 p-8 rounded-md">
            <input className="p-3 rounded-md" type="text" placeholder="Title" name="title" value={newEntry.title} onChange={handleInputChange}/>
            <textarea className="p-3 rounded-md" placeholder="Description" name="description" value={newEntry.description} onChange={handleInputChange}/>
            <div className='grid grid-cols-[auto,1fr] gap-2'>
                <div className="flex items-center">Date created: </div>
                <input className="p-3 rounded-md" type="date" name="created_at" value={(new Date(newEntry.created_at)).toISOString().split('T')[0]} onChange={handleInputChange}/>
                <div className="flex items-center">Scheduled for: </div>
                <input className="p-3 rounded-md" type="date" name="scheduled_for" value={initialScheduledForValue} onChange={handleInputChange}/>
            </div>
            
            <button onClick={(e) => {handleSend(e)}} className="bg-blue-400 hover:bg-blue-600 font-semibold text-white p-3 rounded-md">Create</button>
        </section>
    )
}