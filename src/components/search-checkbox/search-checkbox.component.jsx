
import React, { useState } from 'react'
import { Checkbox, Collapse } from 'antd'

import './search-checkboxes.styles.scss'

const Panel = Collapse.Panel;

const SearchCheckBox= (props) => {

    const [Checked, setChecked] = useState([])

    const handleToggle = (value) => {
        const currentIndex = Checked.indexOf(value);
        const newChecked = [...Checked];

        if (currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }

        setChecked(newChecked)
        props.handleFilters(newChecked)

    }


    const renderCheckboxLists = () => props.list && props.list.map((value, index) => (
        <React.Fragment key={index}>

        <div className = "categories">
            <Checkbox
                onChange={() => handleToggle(value._id)}
                type="checkbox"
                checked={Checked.indexOf(value._id) === -1 ? false : true}
            />
            <label>{value.name}</label>
        </div>
        </React.Fragment>
    ))

    return (
        <div>
            <Collapse className="collapse">
                <Panel key="1" style={{width:'30%'}}>
                    {renderCheckboxLists()}
                </Panel>
            </Collapse>
        </div>
    )
}

export default SearchCheckBox