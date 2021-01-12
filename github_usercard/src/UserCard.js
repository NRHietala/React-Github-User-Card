import React from 'react'

class UserCard extends React.Component {

  render(props) {
    return (
      <div>
      {
        props.userData.map(user => (
          <div>{user.name}</div>
        ))
      }
      </div>
    )
  }
}

export default UserCard;
