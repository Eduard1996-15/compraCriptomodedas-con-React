import React from 'react'
import GraficoCompras from './GraficoCompras'
import GraficoMoneda from './GraficoMoneda'
import GraficoVentas from './GraficoVentas'
const Estadisticas = () => {
  return (
    <div className='container text-center'>
       <h1>Estadisticas</h1>
    <div className='wrapper'>
       
        <div >
        <GraficoCompras />
        </div> 
        <div >
          <GraficoVentas/>
        </div>
        <div >
        <GraficoMoneda />
        </div>
       
    </div>
    </div>
  )
}

export default Estadisticas