import { Dropdown } from "react-bootstrap";
const FilterCheckbox =({category, option, checked, onChange}) =>
    {  return (
        <Dropdown.Item>
        <label>
            <input 
                type="checkbox" 
                name={category} 
                value={option} 
                checked={checked} 
                onChange={onChange} />
            {option}
        </label>
        </Dropdown.Item>
        );                 
    }   

export default FilterCheckbox;