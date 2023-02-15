
const FilterCheckbox =({category, filter, checked, onChange}) =>
    {  return (
        <label>
            <input 
                type="checkbox" 
                name={category} 
                value={filter} 
                checked={checked} 
                onChange={onChange} />
            {filter}
        </label>
        );
    }   

export default FilterCheckbox;