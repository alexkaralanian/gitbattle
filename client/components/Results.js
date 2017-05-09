import React from 'react'
const api = require('../../utils/api')
const queryString = require('query-string')

// console.log(typeof api.battle)


export default class Results extends React.Component {

  componentDidMount(){
    let players = queryString.parse(this.props.location.search)

    api.battle([
      players.playerOneName,
      players.playerTwoName
    ]).then(function (players) {
      console.log(players)
    });

  }

  render() {
     return (
      <div>Results</div>
    )
  }
}
