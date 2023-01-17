import { useState } from 'react'
import Select from './Select'

const Form = ({ handleSubmit, types }) => {
  const [selectedType, setSelectedType] = useState('') 
  const [fetching, setFetching] = useState(false)
  const [brands, setBrands] = useState([]) 
  const [selectedBrand, setSelectedBrand] = useState('')
  const [models, setModels] = useState([]) 
  const [selectedModel, setSelectedModel] = useState('')
  const [years, setYears] = useState([])
  const [selectedYear, setSelectedYear] = useState('')



  const selectedTypeChange = async (e) => {
    setSelectedType(e.target.value)
    setFetching(true)
    try {
      const response = await fetch(`https://parallelum.com.br/fipe/api/v1/${e.target.value}/marcas`)
      const data = await response.json()

      setBrands([...data])
      setModels([])
      setSelectedModel('')
      setYears([])
      setSelectedYear('')

    } catch (error) {
      console.log(error)
    } finally {
      setFetching(false)
    }
  }

  const selectedBrandChange = async (e) => {
    setSelectedBrand(e.target.value)
    setFetching(true)

    try {
      const response = await fetch(`https://parallelum.com.br/fipe/api/v1/${selectedType}/marcas/${e.target.value}/modelos`)
      const data = await response.json()

      setModels([...data.modelos])
      setYears([])
      setSelectedYear('')

    } catch (error) {
      console.log(error)
    } finally {
      setFetching(false)
    }
  }

  const selectedModelChange = async (e) => {
    setSelectedModel(e.target.value)
    setFetching(true)

    try {
      const response = await fetch(`https://parallelum.com.br/fipe/api/v1/${selectedType}/marcas/${selectedBrand}/modelos/${e.target.value}/anos`)
      const data = await response.json()
      setYears([...data])
    } catch (error) {
      console.log(error)
    } finally {
      setFetching(false)
    }
  }

  return (
    <form onSubmit={(e) => {
        e.preventDefault()
        setFetching(true)
        handleSubmit(selectedType, selectedBrand, selectedModel, selectedYear)
        setFetching(false)
      }} 
      disabled={fetching}
    >
      <Select 
        value={selectedType} 
        onChange={selectedTypeChange} 
        disabled={fetching} 
        data={types} 
        placeholder='Tipo do veículo'
      />

      {Boolean(brands.length) && (
        <Select 
          value={selectedBrand} 
          onChange={selectedBrandChange} 
          disabled={fetching} 
          data={brands} 
          placeholder='Marca do veículo'
        />
      )}

      {Boolean(models.length) && (
        <Select 
          value={selectedModel} 
          onChange={selectedModelChange} 
          disabled={fetching} 
          data={models} 
          placeholder='Modelo do veículo'
        />
      )}

      {Boolean(years.length) && (
        <Select 
          value={selectedYear} 
          onChange={(e) => setSelectedYear(e.target.value)} 
          disabled={fetching} 
          data={years} 
          placeholder='Ano do veículo'
        />
      )}

      {Boolean(selectedYear) && <button>Consultar preço</button>}
    </form>
  )
}

export default Form
