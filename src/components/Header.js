import Button from './Button'

const Header = ({ title, onFilter, showFilters, showButton}) => {
  return (
    <header className='header'>
        <h1>{title}</h1>
        {<Button color={showFilters ? 'red' : 'green'} text ={showFilters ? 'X' : 'Filters' } onClick={onFilter}/>} 
    </header>
    
  )
}

Header.defaultProps = {
  title: 'New Contracts'
}

export default Header