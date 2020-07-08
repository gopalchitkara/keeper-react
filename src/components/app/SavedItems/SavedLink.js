import React from 'react'
import './SavedLink.css'

function SavedLink({ item }) {
    return (
        <div style={{ margin: 10, overflow: "hidden", height: 200 }}>
            {item && item.id ? (
                <div>
                    <p
                        className="saved-link-body"
                    >{item.linkAddress}</p>
                </div>
            ) : (
                    <></>
                )
            }
        </div >
    )
}

export default SavedLink
