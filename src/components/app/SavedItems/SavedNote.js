import React from 'react'
import './SavedNote.css'

function SavedNote({ item }) {
    return (
        <div style={{ margin: 10, overflow: "hidden", height: 200 }}>
            {item && item.id ? (
                <div>
                    <p
                        className="saved-note-title mb-5"
                    >{item.title}</p>
                    <p
                        className="saved-note-body mb-5"
                    >{item.body}</p>
                </div>
            ) : (
                    <></>
                )
            }
        </div >
    )
}

export default SavedNote
