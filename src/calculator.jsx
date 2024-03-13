import { hydrate, prerender as ssr } from 'preact-iso'
import { useState } from 'preact/hooks'
import Header from './components/header'
import Footer from './components/footer'
import './style.css';

export function App() {
	const [numOfRuns, setNumOfRuns] = useState('')
	const [numOfCorrect, setNumOfCorrect] = useState()
	const [results, setResults] = useState([])

	const createArr = () => {
		const number = Math.floor(Math.random() * 3)
		let arr = [false, false, false]
		arr[number] = true
	
		return arr
	}
	
	const getUnselectedIndex = (arr, selectionArr) => {
		if (arr[0] == false && selectionArr[0] == false)
			return 0
		if (arr[1] == false && selectionArr[1] == false)
			return 1
		if (arr[2] == false && selectionArr[2] == false)
			return 2
	}
	
	const removeWrongOption = (arr, selectionArr, unselectedIndex) => {
		arr.splice(unselectedIndex, 1)
		selectionArr.splice(unselectedIndex, 1)
	}
	
	const run = (theResults) => {
		const result = {}
		const doors = createArr()
		result.correctDoor = doors.indexOf(true) + 1
		let guess = createArr()
		result.firstGuess = guess.indexOf(true) + 1
		let unselectedIndex = getUnselectedIndex(doors, guess)
		result.doorRemoved = unselectedIndex+1
		removeWrongOption(doors, guess, unselectedIndex)
		guess[0] = !guess[0]
		guess[1] = !guess[1]

		if (doors[0]) {
			result.lastGuess = guess[0]
		} else {
			result.lastGuess = guess[1]
		}

		theResults.push(result)
		return theResults
	}

	const start = () => {
		const idx = parseInt(numOfRuns) ? parseInt(numOfRuns) : 1000000
		let theResults = []
		for (let i = 0; i < idx; i++) {
			theResults = run(theResults)
		}

		setNumOfCorrect(theResults.reduce((count, currentValue) => count + (currentValue.lastGuess === true ? 1 : 0), 0))
		const newResults = [...theResults]
		setResults(newResults)
	}

	const setRunTimes = (e) => {
		const val = e.currentTarget.value
		setNumOfRuns(val)
	}
	
	return (
		<div className="content">
			<Header/>
			<h1>The Monty Hall Problem</h1>
			<section>
				<form class="pure-form">
					<input value={numOfRuns} type="number" onInput={setRunTimes} placeholder="Number of runs"/>
					<button class="pure-button pure-button-primary" type="button" onClick={start}>Start</button>
					<span>{numOfCorrect ? (numOfCorrect / results.length) * 100 : ""}</span>
				</form>
			</section>
			<section>
				<table className="pure-table pure-table-horizontal">
					<thead>
						<tr>
							<th>#</th>
							<th>First guess</th>
							<th>Door removed</th>
							<th>Guess was correct</th>
						</tr>
					</thead>
				<tbody>
					{results.slice(0, 50000).map((result, idx) => (
						<tr key={idx}>
							<td>{idx+1}</td>
							<td>{result.firstGuess}</td>
							<td>{result.doorRemoved}</td>
							<td>{result.lastGuess ? <span>&#10003;</span>: "X"}</td>
						</tr>
					))}
				</tbody>
				</table>
			</section>
			<Footer/>
		</div>
	);
}

if (typeof window !== 'undefined') {
	hydrate(<App />, document.getElementById('app'));
}

export async function prerender(data) {
	return await ssr(<App {...data} />);
}
