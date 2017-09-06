function getRepositories() {
	const req = new XMLHttpRequest()
	req.addEventListener("load", showRepositories)
	req.open("GET", 'https://api.github.com/users/dtfreemn/repos')
	req.setRequestHeader("Authorization", "token 826eebf38902a82a14db4519e6ef366528be686c")
	req.send()
}

function showRepositories(event, data) {
	let repos = JSON.parse(this.responseText)
	let repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a></li>').join('')}</ul>`
	document.getElementById('repositories').innerHTML = repoList
}

function getCommits(el) {
	const name = el.dataset.repo
	const req = new XMLHttpRequest()
	req.addEventListener("load", showCommits)
	req.open("GET",'https://api.github.com/repos/dtfreemn/' + name + '/commits')
	req.setRequestHeader("Authorization", "token 826eebf38902a82a14db4519e6ef366528be686c")
	req.send()
}

function showCommits() {
	const commits = JSON.parse(this.responseText)
	const commitsList = `<ul>${commits.map(commit => '<li><strong>'+ '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
	document.getElementById("commits").innerHTML = commitsList
}