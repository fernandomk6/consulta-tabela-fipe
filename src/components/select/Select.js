const Select = ({ name, values }) => {
  return (
    <select name={name}>
      <option value=''>Tipo do veículo</option>
      {values.map((value, index) => (
        <option value={value} key={index}>{value}</option>
      ))}
    </select>
  )
}

export default Select