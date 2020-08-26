
import React, { useState } from 'react'
import { Checkbox, Collapse } from 'antd'
// import Example from '../dropdown/dropdown.component';
import './search-checkboxes.styles.scss'

const Panel = Collapse.Panel;

const SearchCheckBox= (props) => {

    const [checked, setChecked] = useState([])
    // const [open, setOpen] = useState(false)

    const handleToggle = (value) => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

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
                checked={checked.indexOf(value._id) === -1 ? false : true}
            />
            <label>{value.name}</label>
        </div>
        </React.Fragment>
    ))

    return (
        <div>
            <Collapse className="collapse">
                <Panel key="1" header={props.title} >
                    {renderCheckboxLists()}
                </Panel>
            </Collapse>

            {/* <Example  title={props.title}>
                {renderCheckboxLists()}
            </Example> */}
        </div>
    )
}

export default SearchCheckBox