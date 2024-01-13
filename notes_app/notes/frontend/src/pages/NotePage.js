import React, { useEffect, useState } from "react";
import { useParams  } from "react-router-dom";
import { Link } from 'react-router-dom';
const NotePage = () => {
    const {id} = useParams()
    let noteId = id

    let [note, setNote] = useState(null)

    useEffect(() => {
        getNote()
    }, [noteId])

    let getNote = async () => {
        if(noteId === "new") return
        let res = await fetch(`/api/notes/${noteId}`)
        let data = await res.json()
        setNote(data)
    } 

    let updateNote = async () => {
        fetch(`/api/notes/${noteId}/update`, {
            method: "PUT", 
            headers:{
                'Content-Type': 'application/json'

            },
            body:JSON.stringify(note)
        })
    }

    let handleSubmit = () => {
        if(noteId !== 'new' && (note.body === "")){
            deleteNote()
        }
        else if(noteId !== 'new'){

        updateNote()
        }
        else if( noteId === 'new' && (note.body !== null)){
            createNote()
        }
    }

    let createNote = async () => {
        fetch(`/api/notes/add`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
    }

    let deleteNote = async () => { 
        fetch(`/api/notes/${noteId}/delete`, {
            method:'DELETE',
            headers:{
                'Content-Type':'application/json'
            }
        })
    }
    return (
        <div>
            <Link to="/"><button onClick={handleSubmit}><h4>Back/Save</h4></button></Link>
            <h1>Note Id: { noteId }</h1>
            <textarea onChange={(e) => {setNote({...note, 'body':e.target.value})}} defaultValue={note?.body}></textarea>
            <br></br>
        <Link to="/">
            {noteId !== 'new' ? (

                <button onClick={deleteNote}>DELETE</button>
            ): (
                <button onClick={createNote}>Save</button>
            )}
        </Link>            
        </div>
    )
}

export default NotePage