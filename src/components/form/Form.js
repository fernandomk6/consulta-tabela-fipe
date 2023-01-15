import { useState, useEffect } from 'react'

const Form = () => {
  const [selectedType, setSelectedType] = useState('') 

  const [brands, setBrands] = useState([]) 
  const [selectedBrand, setSelectedBrand] = useState('')
  const [models, setModels] = useState([]) 
  const [selectedModel, setSelectedModel] = useState('')
  const [years, setYears] = useState([])
  const [selectedYear, setSelectedYear] = useState('')
  const [result, setResult] = useState(null)

  useEffect(() => {
    let ignore = false
    if (!selectedType) {
      return
    }

    const getBrands = async () => {
      try {
        const response = await fetch(`https://parallelum.com.br/fipe/api/v1/${selectedType}/marcas`)
        const data = await response.json()

        if (!ignore) {
          setBrands([...data])
        }
        
      } catch (error) {
        console.log(error)
      }
    }

    getBrands()

    return () => ignore = true
  }, [selectedType])

  useEffect(() => {
    let ignore = false
    if (!selectedBrand) {
      return
    }

    const getModels = async () => {
      try {
        const response = await fetch(`https://parallelum.com.br/fipe/api/v1/${selectedType}/marcas/${selectedBrand}/modelos`)
        const data = await response.json()

        if (!ignore) {
          setModels([...data.modelos])
        }
        
      } catch (error) {
        console.log(error)
      }
    }

    getModels()

    return () => ignore = true
  }, [selectedBrand])

  useEffect(() => {
    let ignore = false
    if (!selectedModel) {
      return
    }

    const getYears = async () => {
      try {
        const response = await fetch(`https://parallelum.com.br/fipe/api/v1/${selectedType}/marcas/${selectedBrand}/modelos/${selectedModel}/anos`)
        const data = await response.json()

        if (!ignore) {
          setYears([...data])
        }
        
      } catch (error) {
        console.log(error)
      }
    }

    getYears()

    return () => ignore = true
  }, [selectedModel])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch(`https://parallelum.com.br/fipe/api/v1/${selectedType}/marcas/${selectedBrand}/modelos/${selectedModel}/anos/${selectedYear}`)
    const data = await response.json()
    setResult(data)
  }

  return (
    <form onSubmit={handleSubmit}>
      <select name="type" value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
        <option value="">Tipo do veículo</option>
        <option value="carros">Carros</option>
        <option value="motos">Motos</option>
        <option value="caminhoes">Caminhões</option>
      </select>

      {Boolean(brands.length) && (
        <select name="brand" value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
          <option value="">Marca do veículo</option>
          {brands.map((brand) => (
            <option key={brand.codigo} value={brand.codigo}>{brand.nome}</option>
          ))}
        </select>
      )}

      {Boolean(models.length) && (
        <select name="model" value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)}>
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

      <button>Consultar preço</button>
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