import React from 'react'
import NewItem from '../NewItems/NewItem'
import SavedItemsDndGrid from '../SavedItems/SavedItemsDndGrid'

function ItemsDashboard() {
    return (
        <div className="sidebar-offset navbar-offset" >
            <NewItem />
            <SavedItemsDndGrid />
        </div>
    )
}

export default ItemsDashboard
