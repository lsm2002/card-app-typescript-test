import { ChangeEvent, MouseEvent, useContext, useState } from "react";
import { Entry, EntryContextType } from "../@types/context";
import { EntryContext } from "../utilities/globalContext";

export default function NewEntry() {
  const emptyEntry: Entry = { title: "", description: "", created_at: new Date(), scheduled_for: new Date() };
  const { saveEntry } = useContext(EntryContext) as EntryContextType;
  const [newEntry, setNewEntry] = useState<Entry>(emptyEntry);
  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewEntry({
      ...newEntry,
      [event.target.name]: event.target.value,
    });
  };
  const handleSend = (e: MouseEvent<HTMLButtonElement>) => {
    saveEntry(newEntry);
    setNewEntry(emptyEntry);
  };
  const initialScheduledForValue = (newEntry.scheduled_for != null ? new Date(newEntry.scheduled_for) : new Date())
    .toISOString()
    .split("T")[0];
  return (
    <section className="flex justify-center flex-col w-fit ml-auto mr-auto mt-10 gap-5 bg-card text-card-text p-8 rounded-md">
      <input
        className="p-3 rounded-md bg-input text-input-text placeholder-input-placeholder"
        type="text"
        placeholder="Title"
        name="title"
        value={newEntry.title}
        onChange={handleInputChange}
      />
      <textarea
        className="p-3 rounded-md bg-input text-input-text placeholder-input-placeholder"
        placeholder="Description"
        name="description"
        value={newEntry.description}
        onChange={handleInputChange}
      />
      <div className="grid grid-cols-[auto,1fr] gap-2">
        <div className="flex items-center">Date created: </div>
        <input
          className="p-3 rounded-md bg-input text-input-text placeholder-input-placeholder"
          type="date"
          name="created_at"
          value={new Date(newEntry.created_at).toISOString().split("T")[0]}
          onChange={handleInputChange}
        />
        <div className="flex items-center">Scheduled for: </div>
        <input
          className="p-3 rounded-md bg-input text-input-text placeholder-input-placeholder color-scheme-dark"
          type="date"
          name="scheduled_for"
          value={initialScheduledForValue}
          onChange={handleInputChange}
        />
      </div>

      <button
        onClick={(e) => {
          handleSend(e);
        }}
        className="bg-button-colored hover:bg-button-colored-hover font-semibold text-button-colored-text p-3 rounded-md"
      >
        Create
      </button>
    </section>
  );
}
