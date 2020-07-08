import React from 'react'
import './SavedList.css'
import { Checkbox } from 'antd'

function SavedList({ item }) {
    return (
        <div style={{ margin: 10, overflow: "hidden", height: 200 }}>
            {item && item.id ? (
                <div>
                    <p
                        className="saved-note-title mb-5"
                    >{item.title}</p>
                    {item.listItems.length > 0 ? (
                        <ul className="pl-5 saved-list-body">
                            {item.listItems.map(item => {
                                return (
                                    <li key={Math.random()} className="saved-list-item">
                                        <Checkbox checked={item.done}></Checkbox>
                                        <p className="m-0 ml-10">{item.text}</p>
                                    </li>
                                )
                            })}
                        </ul>
                    ) : (<></>)}
                </div>
            ) : (
                    <></>
                )
            }
        </div >
    )
}

export default SavedList
