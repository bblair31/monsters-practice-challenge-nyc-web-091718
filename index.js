document.addEventListener('DOMContentLoaded', () => {
  let allMonsterData = []
  let pageNumber = 0
  let numPerPage = 50
  let maxPageNumber = 0
  const divToAddMonsters = document.getElementById('monster-container')
  const monsterPostForm = document.getElementById('create-monster')
  const forwardButton = document.getElementById('forward')
  const backButton = document.getElementById('back')


  fetch('http://localhost:3000/monsters')
    .then(responseObj => responseObj.json())
    .then((parsedJSON) => {
      allMonsterData = parsedJSON
      maxPageNumber = (allMonsterData.length / numPerPage)
      paginatedMonsterData = paginateMonsters(allMonsterData)
      divToAddMonsters.innerHTML = appendMonstersToDom(paginatedMonsterData)
    })

  function paginateMonsters(monstersArray) {
    return monstersArray.slice(pageNumber * numPerPage, (pageNumber + 1) * numPerPage);
  }

  forwardButton.addEventListener('click', (event) => {
    pageNumber += 1
    if (pageNumber > maxPageNumber) {
      alert("NO MORE PAGES")
      pageNumber -= 1
    } else {
      paginatedMonsterData = paginateMonsters(allMonsterData)
      divToAddMonsters.innerHTML = appendMonstersToDom(paginatedMonsterData)
    }
  })

  backButton.addEventListener('click', (event) => {
    pageNumber -= 1
    if (pageNumber < 0) {
      alert("THIS IS THE FIRST PAGE")
      pageNumber += 1
    } else {
      paginatedMonsterData = paginateMonsters(allMonsterData)
      divToAddMonsters.innerHTML = appendMonstersToDom(paginatedMonsterData)
    }
  })

  monsterPostForm.addEventListener('submit', (event) => {
    event.preventDefault()
    let name = document.querySelector('#name').value
    let age = document.querySelector('#age').value
    let description = document.querySelector('#description').value
  
    fetch('http://localhost:3000/monsters/',
    {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          "name": `${name}`,
          "age": `${age}`,
          "description": `${description}`
        })
    })
      .then(response => {
        return response.json();
      })
      .then(json => {
        allMonsterData.push(json);
      })
  }) // End of PostFormListeneer


}) // End of DOMContentLoaded

const appendMonstersToDom = (monstersArray) => {
  return monstersArray.map((monster) => {
    return `
    <div class="monster-card">
      <div data-id=${monster.id}>
        <h2>${monster.name}</h2>
        <h4>Age: ${monster.age}</h4>
        <p>
          Bio: ${monster.description}
        </p>
      </div>
    </div>
    `
  }).join("")
}
