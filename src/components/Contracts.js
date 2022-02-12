import Contract from './Contract'

const Contracts = ( {contracts, changeName} ) => {
  return (
    <div className='contractContainer'>
        {contracts.slice(0).reverse().map((contract, index) => (
             contract.nameFilter &&
             <Contract key={index} contract={contract} changeName={changeName} />
        ))}
    </div>
  )
}

export default Contracts