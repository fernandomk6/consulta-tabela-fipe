import { useState } from 'react'

const Form = () => {
  const [selectedType, setSelectedType] = useState('') 
  const [fetching, setFetching] = useState(false)

  const [brands, setBrands] = useState([]) 
  const [selectedBrand, setSelectedBrand] = useState('')
  const [models, setModels] = useState([]) 
  const [selectedModel, setSelectedModel] = useState('')
  const [years, setYears] = useState([])
  const [selectedYear, setSelectedYear] = useState('')
  const [result, setResult] = useState(null)

  const selectedTypeChange = async (e) => {
    setSelectedType(e.target.value)
    
    setFetching(true)
    try {
      const response = await fetch(`https://parallelum.com.br/fipe/api/v1/${e.target.value}/marcas`)
      const data = await response.json()

      setBrands([...data])
      setModels([])
      setYears([])
      setSelectedYear('')
      setResult(null)

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
      setResult(null)

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
      setResult(null)
    } catch (error) {
      console.log(error)
    } finally {
      setFetching(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFetching(true)
    try {
      const response = await fetch(`https://parallelum.com.br/fipe/api/v1/${selectedType}/marcas/${selectedBrand}/modelos/${selectedModel}/anos/${selectedYear}`)
      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.log(error)
    } finally {
      setFetching(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} disabled={fetching}>
      <select name="type" value={selectedType} onChange={selectedTypeChange} disabled={fetching}>
        <option value="">Tipo do veículo</option>
        <option value="carros">Carros</option>
        <option value="motos">Motos</option>
        <option value="caminhoes">Caminhões</option>
      </select>

      {Boolean(brands.length) && (
        <select name="brand" value={selectedBrand} onChange={selectedBrandChange} disabled={fetching}>
          <option value="">Marca do veículo</option>
          {brands.map((brand) => (
            <option key={brand.codigo} value={brand.codigo}>{brand.nome}</option>
          ))}
        </select>
      )}

      {Boolean(models.length) && (
        <select name="model" value={selectedModel} onChange={selectedModelChange} disabled={fetching}>
          <option value="">Modelo do veículo</option>
          {models.map((model) => (
            <option key={model.codigo} value={model.codigo}>{model.nome}</option>
          ))}
        </select>
      )}

      {Boolean(years.length) && (
        <select name="year" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
          <option value="">Ano do veículo</option>
          {years.map((year) => (
            <option key={year.codigo} value={year.codigo}>{year.nome}</option>
          ))}
        </select>
      )}

      {Boolean(selectedYear) && <button>Consultar preço</button>}
      
      {Boolean(result) && (
        <ul>
          <li>ano modelo: {result.AnoModelo}</li>
          <li>codigo fipe: {result.CodigoFipe}</li>
          <li>combustivel: {result.Combustivel}</li>
          <li>mes referencia: {result.MesReferencia}</li>
          <li>modelo: {result.Modelo}</li>
          <li>sigla combustivel: {result.SiglaCombustivel}</li>
          <li>tipo veiculo: {result.TipoVeiculo}</li>
          <li>valor: {result.Valor}</li>
        </ul>
      )}
    </form>
  )
}

export default Form