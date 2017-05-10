import axios from 'axios'

// FUNCTIONAL COMPOSITION...

// getProfile: append /params

function getProfile (username) {
  return axios.get(`http://api.github.com/users/${username}`)
  .then((user) => {
    return user.data
  })
}

// getRepos: insert params after username
// append username/params/repos

function getRepos(username) {
  return axios.get(`http://api.github.com/users/${username}/repos`)
}

function getStarCount(repos) {
  return repos.data.reduce((sum, repoArray) => {
    return sum + repoArray.stargazers_count
  }, 0)
}

function calculateScore(profile, repos){
  let followers = profile.followers
  let totalStars = getStarCount(repos)
  return (followers * 3) + totalStars
}

function handleError(error){
  console.warn(error)
  return null
}

function getUserData(player){
  return axios.all([
    getProfile(player),
    getRepos(player)
  ])
  .then((data) => {
    let profile = data[0]
    let repos = data[1]

    return {
      profile: profile,
      score: calculateScore(profile, repos)
    }
  })
}

function sortPlayers (players) {
  return players.sort((a, b) => {
    return b.score - a.score
  })
}

const id = 'YOUR_CLIENT_ID';
const secret = 'YOUR_CLIENT_SECRET';
const params =  '?client_id=' + id + '&client_secret=' + secret

module.exports = {

  fetchPopularRepos: (language) => {

		let encodedURI = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars$order=desc&type=Repositories`)

		return axios.get(encodedURI)
			.then((res) => {
				return res.data.items
			})
	},

  battle: function (players) {
    return axios.all(players.map(getUserData))
    .then(sortPlayers)
    .catch(handleError)
  }

}
