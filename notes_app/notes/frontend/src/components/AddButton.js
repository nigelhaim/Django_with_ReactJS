import React from 'react';
import { Link } from 'react-router-dom';
const AddButton = () => {
    return(
        <div>
            <Link to="/note/new" className='floating-button'>
                <button><h1>Add Note</h1></button>
            </Link>
        </div>
    )
}
export default AddButton