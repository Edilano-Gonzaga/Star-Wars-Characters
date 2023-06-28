let currentPageUrl = 'https://swapi.dev/api/starships/' //Foi usado Let porque esse valor da variavel vai ficar mudando, let e var pode ser redeclarado o const não pode é um valor constante, pega a visão não esquecer disso.//

window.onload = async () => {
    try{
         await loadCharacters(currentPageUrl);
    } catch (error) {
        console.log(error);
        alert('error ao carregar cards');
    }

    const nextButton = document.getElementById('next-button')
    const backButton = document.getElementById('back-button')

    nextButton.addEventListener('click', loadNextPage)
    backButton.addEventListener('click', loadPreviousPage)

};

async function loadCharacters(url) {
    const mainContent = document.getElementById('main-content')
    mainContent.innerHTML = ''; // Limpar os resultados anteriores.

    try {
        const response = await fetch(url);
        const responseJson = await response.json();

        responseJson.results.forEach((character) => {
            const card = document.createElement("div")
            card.style.backgroundImage = 
            `url('https://starwars-visualguide.com/assets/img/starships/${character.url.replace(/\D/g, "")}.jpg')`
            card.className = "cards"
          

            const characterNameBG = document.createElement("div")
            characterNameBG.className = "character-name-bg"

            const characterName = document.createElement("span")
            characterName.className = "character-name"
            characterName.innerText = `${character.name}`

            characterNameBG.appendChild(characterName) // insira um elemento dentro desse elemento ou seja, pega um elemento filho e coloca dentro do elemento pai, nesse caso o charactername é filho do characternameBG//
            card.appendChild(characterNameBG)

            card.onclick = () =>{
                const modal = document.getElementById("modal")
                modal.style.visibility = "visible"

                const modalContent = document.getElementById("modal-content")
                modalContent.innerHTML = ''

                const characterImage = document.createElement("div")
                characterImage.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/starships/${character.url.replace(/\D/g, "")}.jpg'`
                characterImage.className = "character-image"

                const name = document.createElement("span")
                name.className = "character-details"
                name.innerText = `Nome: ${character.name}`

                const model = document.createElement("span")
                model.className = "character-details"
                model.innerText = `Modelo: ${character.model}`

                const passengers = document.createElement("span")
                passengers.className = "character-details"
                passengers.innerText = `Passageiros a bordo: ${character.passengers}`

                const cargo_Capacity = document.createElement("span")
                cargo_Capacity.className = "character-details"
                cargo_Capacity.innerText = `Capacidade de Carga: ${character.cargo_capacity}`

                const length = document.createElement("span")
                length.className = "character-details"
                length.innerText = `Comprimento/m: ${convertlength(character.length)}`

                modalContent.appendChild(characterImage)
                modalContent.appendChild(name)
                modalContent.appendChild(model)
                modalContent.appendChild(passengers)
                modalContent.appendChild(cargo_Capacity)
                modalContent.appendChild(length)
            }

          
            

            
            mainContent.appendChild(card)
        });

        const nextButton = document.getElementById("next-button")
        const backButton = document.getElementById("back-button")

        nextButton.disabled = !responseJson.next
        backButton.disabled = !responseJson.previous

        backButton.style.visibility = responseJson.previous? "visible" : "hidden"

        currentPageUrl = url

    } catch(error) {
        alert('Erro ao carregar os personagens')
        console.log(error)
    }
}

async function loadNextPage() {
    if (!currentPageUrl) return;

    try {

        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadCharacters(responseJson.next)

    } catch (error) {
        console.log(error)
        alert('Erro ao carregar a próxima página')
    }

}

async function loadPreviousPage(){
    if (!currentPageUrl) return;

    try{

        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadCharacters(responseJson.previous)

    } catch (error) {
        console.log(error)
        alert('Erro ao carregar a página anterior')
    }

}

function hidenModal (){
    const modal = document.getElementById("modal")
    modal.style.visibility = "hidden"
}

function convertlength(length) {
        if (length === "unknown") {
            return "desconhecida"
        }
    
        return (length / 1).toFixed(2);
     }