import { useState } from 'react'
import Form from './components/Form'
import Result from './components/Result'

const App = () => {
  const [result, setResult] = useState(null)

  const types = [{
    codigo: 'carros',
    nome: 'Carros'
  },{
    codigo: 'motos',
    nome: 'Motos'
  },{
    codigo: 'caminhoes',
    nome: 'Caminhões'
  }]

  const getResult = async (selectedType, selectedBrand, selectedModel, selectedYear) => {
    try {
      const response = await fetch(`https://parallelum.com.br/fipe/api/v1/${selectedType}/marcas/${selectedBrand}/modelos/${selectedModel}/anos/${selectedYear}`)
      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="App">
      <h1>Consulta tabela FIPE</h1>
      {!Boolean(result) ? (
        <Form handleSubmit={getResult} types={types} />
      ) : (
        <Result handleClick={() => setResult(null)} result={result} types={types} />
      )}
    </div>
  )
}

export default App
