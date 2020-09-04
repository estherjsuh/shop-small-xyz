
import React, { useState } from 'react'
import { Checkbox } from 'antd'

import './search-checkboxes.styles.scss'


const SearchCheckBox= (props) => {

    const handleToggle = (value) => {
        const currentIndex = props.checked.indexOf(value);
        const newChecked = [...props.checked];

        if (currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }  
        props.handleFilters(newChecked)

    }

    const renderCheckboxLists = () => props.list && props.list.map((value, index) => (
        <React.Fragment key={index}>

        <div className = "categories">
            <Checkbox
                onChange={() => handleToggle(value._id)}
                type="checkbox"
                id={value.name}
                checked={props.checked.indexOf(value._id) === -1 ? false : true}
            />
        <label for={value.name}>{value.name}</label>
            
        </div>
        </React.Fragment>
    ))

    return (
        <div>
            {renderCheckboxLists()}
        </div>
    )
}

export default SearchCheckBox