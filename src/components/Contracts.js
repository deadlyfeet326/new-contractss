import Contract from './Contract'

const Contracts = ( {contracts, pinContract} ) => {
  console.log(contracts)
  return (
    <div className='contractContainer'>
        {contracts.map((contract, index) => (
             contract.nameFilter &&
             <Contract key={index} contract={contract} pinContract={pinContract}/>
        ))}
    </div>
  )
}

export default Contracts