import React from 'react';
import axios from 'axios';

// import UserCard from './UserCard';
import './App.css';

class App extends React.Component {
  state =  {
    userData: [],
    searchValue:"",
  }

  componentDidMount(){
    axios
    .get(`https://api.github.com/users/NRHietala`)
    .then(res => {
      console.log(res.data)
      this.setState({
        userData:res.data
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  handleChange = event => {
    this.setState({
      searchValue:event.target.value
    })
  }

  handleClick = event => {
    event.preventDefault();

    axios.get(`https://api.github.com/users/${this.state.searchValue}`)
    .then(res => {
      console.log(res.data)
      this.setState({
        userData: res.data
      })
      .catch(err => {
        console.log(err)
      })
    })
  }

  render() {
    return (
      <div>
       <h1>Search for a GitHub User!</h1>
       <form>
         <input
         type="text"
         onChange={this.handleChange}
         placeholder='Search for User'
         />
         <button onClick={this.handleClick}>Search</button>
       </form>
        <div className="cardContainer">
          <h2>{this.state.userData.name}</h2>
        </div>
      </div>
    )
  }
}

export default App;