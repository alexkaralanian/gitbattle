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

		// Here we bind the components method's this keyword' methods to the this keyword inside the constructor's context
		this.updateLanguage = this.updateLanguage.bind(this)
	}

	// LIFECYCLE METHODS
	// Lets us hook into view when specific conditions happen (ie when component first renders, gets updated, etc...)
	// AJAX requests go here...

	componentDidMount(){
		this.updateLanguage(this.state.selectedLanguage)
	}

	// COMPONENT METHODS
	updateLanguage(lang){

	/*
	- Here we are recieveing the language and passing lang in to change the state.
	- We also bind this to the constructor.
	*/

		this.setState(() => {
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
		})  // }.bind(this), no longer necessary with arrow functions. The 'this keyword, which would normally be encapsulated in the encolsing function's scope, has access to the function's outer scope.
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

				{/*
				Here we are passing down the this.updateLanguage method, which calls setState, to the 'SelectedLanguage' stateless functional component - as a prop named 'OnSelect'
				*/}

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

	// Here we are mapping over the array of laguages
	// Each lanuguage item gets its own click handler

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

						{/*
						Here we are binding onSelect (aka this.updateLanguage) to the onClick handler.
						  We already bound the this keyword of this.updateLanguage to the constructor's context, so first arg is null.
						The next argument we are passing is lang (the seleted language) so that onSelect aka this.updateLanguage can pass in whichever specific language that was clicked on as an argument to this.updateLanguage, which will update state accordingly.

						style= If lang === whichever language we selected, make the style an object with a specified color, else do nothing.

					*/}

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
