const Result = ({ handleClick, result, types }) => {
  return (
    <div className='result'>
      <ul>
        <li><strong className='price'>{result.Valor}</strong></li>
        <li>Modelo: <strong>{result.Modelo}</strong></li>
        <li>Ano: <strong>{result.AnoModelo}</strong></li>
        <li>Tipo de veículo: <strong>{types.find((_, index) => (index + 1 === result.TipoVeiculo)).nome}</strong></li>
        <li>Combustível: <strong>{result.Combustivel}</strong></li>
        <li>Mês da consulta: <strong>{result.MesReferencia}</strong></li>
        <li>Código fipe: <strong>{result.CodigoFipe}</strong></li>
      </ul>
      <button onClick={handleClick}>Nova consulta</button>
    </div>
  )
}

export default Result
