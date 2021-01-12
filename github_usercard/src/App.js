import React from 'react';
import axios from 'axios';
import styled from 'styled-components';



const Wrapper = styled.div `
display:flex;
flex-flow:column nowrap;
justify-content:center;
align-items:center;
height: 100vh;
background: tan;

h1 {
  text-decoration:underline;
  font-size: 40px;
}

.formInput {
  padding: 10px 5px;
  margin: 10px;
  text-align:center;
}

.searchBtn {
  padding: 10px;
  color:red;
}

.userInfo {
  display:flex;
  flex-flow:column nowrap;
  align-items:center;
  justify-content:center;
  background:whitesmoke;
  padding: 10px;
  font-size: 25px;
}

.avatar {
    border-radius: 25px;
  }
`
class App extends React.Component {
  state =  {
    userData: [],
    searchValue:"",
  }

  componentDidMount(){
    axios
    .get(`https://api.github.com/users/NRHietala`)
    .then(res => {
      const newData = res.data
      console.log(newData);
      this.setState({
        userData: newData
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
      const searchData = res.data
      console.log(searchData);
      this.setState({
        userData: searchData
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  render() {
    return (
      <Wrapper>
       <h1>Search for a GitHub User!</h1>
       <form>
         <input
         type="text"
         className="formInput"
         onChange={this.handleChange}
         placeholder='Search for User'
         />
         <button className ="searchBtn"onClick={this.handleClick}>Search</button>
       </form>
        <div className="cardContainer">
          <img className="avatar" src={this.state.userData.avatar_url}/>
          <div className="userInfo">
            <h2>{this.state.userData.name}</h2>
            <p>{this.state.userData.bio}</p>
            <p>Followers: {this.state.userData.followers}</p>
            <p>Following: {this.state.userData.following}</p>
          </div>
        </div>
      </Wrapper>
    )
  }
}

export default App;