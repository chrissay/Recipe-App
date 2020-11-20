import { initializeEditPage } from './views'
import { updateRecipe, removeRecipe } from './recipes'

const titleElement = document.querySelector('#recipe-title')
const bodyElement = document.querySelector('#recipe-body')
const removeElement = document.querySelector('#remove-recipe') //
const recipeId = location.hash.substring(1)  //

initializeEditPage(recipeId)

titleElement.addEventListener('input', (e) => {
    const recipe = updateRecipe(recipeId, {
        title: e.target.value
    })
})

bodyElement.addEventListener('input', (e) => {
    const recipe = updateRecipe(recipeId, {
        body: e.target.value
    })
})

removeElement.addEventListener('click', (e) => {  // this looks fine
    removeRecipe(recipeId)
    location.assign('/index.html')
})

window.addEventListener('storage', (e) => {
    if (e.key === 'recipes') {
        initializeEditPage(recipeId)
    }
})