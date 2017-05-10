import React from 'react'
import api  from '../../utils/api'
import PropTypes from 'prop-types'
import Loading from './Loading'

// STATEFUL COMPONENT CLASS
class Popular extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			selectedLanguage: 'All',
			repos: null
		}

		// Here we bind the components methods to the constructor
		this.updateLanguage = this.updateLanguage.bind(this)
	}

	// LIFECYCLE METHODS
	// Lets us hook into view when speciic conditions happen (ie when component first renders, gets updated, etc...)
	// AJAX requests go here...

	componentDidMount(){
		this.updateLanguage(this.state.selectedLanguage)
	}

	// COMPONENT METHODS
	updateLanguage(lang){

		this.setState(function() {
			return {
				selectedLanguage: lang,
				repos: null
			}
		})

		api.fetchPopularRepos(lang)
		.then((repos) => {
			this.setState(() => {
				return {
					repos: repos
				}
			})
		})  // }.bind(this))
	}

	// RENDER METHOD
	// must be a pure function
	// We pass down props to our child components from here
	// We render our UI here...

	render(){

		return (
			<div>
				<SelectedLanguage
					selectedLanguage={this.state.selectedLanguage}
					onSelect={this.updateLanguage}
				/>

				{/*JSON.stringify(this.state.repos, null, 2)*/}
				{!this.state.repos
					? <Loading />
					: <RepoGrid repos = {this.state.repos} /> }
			</div>
		)
	}
}

// STATELESS FUNCTIONAL COMPONENT
// only renders ui and takes in state as props
const SelectedLanguage = (props) => {

	let languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python']

	return (
		<ul className="languages">
			{ languages.map((lang) => {
				return (
					<li
						style={lang === props.selectedLanguage ? {color: '#d0021b'} : null}
						onClick={props.onSelect.bind(null, lang)}
						key={lang}>
						{lang}
					</li>
				)
			}, this)} {/* with arrow functions we do not neet to set the context of this with the map function any longer... leaving it here for context!! get it... */}
		</ul>
	)
}

// STATELSS FUNCTIONAL COMPONENT
// only renders UI and takes in state as props

const RepoGrid = (props) => {

	return (
		<ul className="popular-list">
			{props.repos.map((repo, index) => {
				return (
					<li key={repo.name} className="popular-item">
						<div className="popular-rank">#{index + 1}</div>
						<ul className="space-list-items">
							<li>
								<img
									className="avatar"
									src={repo.owner.avatar_url}
									alt={'Avatar for ' + repo.owner.login}
								/>
							</li>
							<li><a href={repo.html_url}>{repo.name}</a></li>
							<li>@{repo.owner.login}</li>
							<li>{repo.stargazers_count} stars</li>
						</ul>
					</li>
				)
			})}
		</ul>
	)
}

RepoGrid.propTypes = {
	repos: PropTypes.array.isRequired
}

export default Popular;
