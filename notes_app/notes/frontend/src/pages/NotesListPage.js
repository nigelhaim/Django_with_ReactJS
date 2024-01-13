import React, {useState, useEffect} from "react";
import ListItem from "../components/ListItem";

const NotesListPage = () => {

    let [notes, setNotes] = useState([])

    useEffect(()=> {
        getNotes()
    }, [])

    let getNotes = async () => {

        let res = await fetch('/api/notes/')
        let data = await res.json()
        console.log('Data: ', data)
        setNotes(data)
    }

    return (
        <div>
            <div className="notes-list">
                {notes.map((note, index) => (
                    <ListItem key={index} note={note}></ListItem>
                ))}
            </div>
        </div>
    )
}

export default NotesListPage
