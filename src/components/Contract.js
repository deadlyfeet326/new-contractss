import React from 'react'

const Contract = ( {contract} ) => {
  return (
    <div className='contract' >
        <h2>{contract.name}</h2>
        <p> <b>Contract Address : </b> {contract.address} </p>
        <p> 
            <b>Decimals : </b> {contract.decimals} 
            <b> Supply : </b> {contract.supply} 
            <b> Date : </b> {contract.date} 
        </p>
        <p> <b> Dev Wallet : </b>{contract.owner} </p>
        <a href= {"https://bscscan.com/address/" + contract.address } target="_blank"> BSC CONTRACT</a>
    </div>
  )
}

export default Contract