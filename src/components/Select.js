const Select = ({ value, onChange, disabled, data, placeholder }) => {
  return (
    <select value={value} onChange={onChange} disabled={disabled}>
      <option value="">{placeholder}</option>
      {data.map((record) => (
        <option key={record.codigo} value={record.codigo}>{record.nome}</option>
      ))}
    </select>
  )
}

export default Select
