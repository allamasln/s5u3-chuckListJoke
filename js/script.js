const buttonAdd = document.getElementById('fetchJoke')
const buttonDeleteAll = document.getElementById('btn-delete-all')
const containerElDOM = document.getElementById('jokeList')

const jokesKey = 'jokes'

let jokes = getJokesFromLocalStorage()

render()

buttonAdd.addEventListener('click', handleAdd)
buttonDeleteAll.addEventListener('click', heandleDeleteAll)

function heandleDeleteAll() {
	jokes = []

	saveJokesToLocalStorage()
	render()
}

function handleAdd() {
	fetch('https://api.chucknorris.io/jokes/random')
		.then((res) => res.json())
		.then(({ id, value: joke }) => {
			jokes.push({ id, joke })

			saveJokesToLocalStorage()
			render()
		})
}

function render() {
	containerElDOM.innerHTML = ''

	jokes.forEach(({ id, joke }) => {
		const li = document.createElement('li')
		const p = document.createElement('p')
		p.textContent = joke

		const buttonDeleteOne = document.createElement('button')
		buttonDeleteOne.textContent = 'Eliminar'
		buttonDeleteOne.className = 'btn btn--danger'

		buttonDeleteOne.addEventListener('click', () => {
			const idToDelete = id

			jokes = jokes.filter((joke) => joke.id !== idToDelete)

			saveJokesToLocalStorage()
			render()
		})

		li.append(p, buttonDeleteOne)

		containerElDOM.appendChild(li)
	})
}

function getJokesFromLocalStorage() {
	const value = JSON.parse(localStorage.getItem(jokesKey))

	return value ? value : []
}

function saveJokesToLocalStorage() {
	localStorage.setItem(jokesKey, JSON.stringify(jokes))
}
