import React from 'react'
import io from 'socket.io-client'
import {useState, useEffect} from 'react'
import Header from './components/Header'
import Contracts from './components/Contracts'
import Filters from './components/Filters'
import Pinned from './components/Pinned'
import './App.css';

const socket = io.connect('https://new-contract.herokuapp.com/')

function App() {

const[showFilters, setShowFilters] = useState(false)
const[contracts, setContracts] = useState([])
const[filters, setFilters] = useState({name: "", decimals: "", supply: "", date: ""})
const[pinnedContracts, setPinnedContracts] = useState([])

useEffect(() => {
    const getContracts = async () => {
    fetchContracts()
    socket.on('request', ({ data }) => {
        setContracts(data)
        console.log(data)
    })
    }

    getContracts()

}, [])

socket.on('newContract', ( { data }) => {
    setContracts(data.map((contract) => checkFilters(
    filters.name, filters.decimals, filters.supply , filters.date, contract) ? {...contract, nameFilter : true} : {...contract, nameFilter : false}))
})

const fetchContracts = async () => {
    let chain = "bsc"
    socket.emit('request', { chain } )
}

const changeName = (characters, contract) => {
    if (contract.name.toLowerCase().includes(characters)){
    return true
    } else{
    return false
    }
}

const changeDecimals = (decimals, contract) => {
    if (contract.decimals == decimals){
    return true
    } else if ( decimals == 0 ){
    return true
    } else {
    return false
    }
}

const changeSupply = (supply, contract) => {
    if(contract.supply === supply){
    return true
    } else if (supply == 0){
    return true
    } else{
    return false
    }
}

const changeDate = (date, contract) => {
    let time
    if (date != ""){
    date = new Date(date)
    time = date.getTime()
    }else time = null

    if (contract.date >= time){
    return true
    }else {
    return false
    }
}

const checkFilters = (name, decimals, supply, date, contract) => {
    if (changeName(name, contract) && changeDecimals(decimals, contract)
    && changeSupply(supply, contract) && changeDate(date, contract)) {
    return true
    }else{
    return false
    }
}

const changeFilters = (name, decimals, supply, date) => {
    setFilters({name: name, decimals: decimals, supply: supply, date: date})
    setContracts(contracts.map((contract) => checkFilters(name, decimals, supply , date, contract) ? {...contract, nameFilter : true} : {...contract, nameFilter : false}))
}

const pinContract = (id) => {
    let newPinnedContracts = contracts.filter(contract => contract._id == id)
    setPinnedContracts([...pinnedContracts, ...newPinnedContracts])
}

const unpinContract = (id) => {
    setPinnedContracts(pinnedContracts.filter(contract => contract._id != id))
}

return (
    <div className="fullscreen flex-parent">
        <div className="container flex-child1">
            <Header onFilter={() => setShowFilters(!showFilters)} showFilters={showFilters}/>
            { showFilters && <Filters  name={filters.name} decimals={filters.decimals} supply={filters.supply} date={filters.date} changeFilters={changeFilters} /> }
            <Contracts contracts={contracts} pinContract={pinContract} />
        </div>
        <div className='pinned flex-child2'>
            <header className='header'> <h1>PINNED</h1></header>
            {pinnedContracts.length > 0 && <Pinned pinnedContracts={pinnedContracts} unpinContract={unpinContract}/> }
        </div>
    </div>
);
}

export default App;
