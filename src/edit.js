import { initializeEditPage, renderIngredients } from './views'
import { updateRecipe, removeRecipe, addIngredient, loadIngredients } from './recipes'

const titleElement = document.querySelector('#recipe-title')
const bodyElement = document.querySelector('#recipe-body')
const removeElement = document.querySelector('#remove-recipe')
const recipeId = location.hash.substring(1)

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

removeElement.addEventListener('click', (e) => {
    removeRecipe(recipeId)
    location.assign('/index.html')
})

window.addEventListener('storage', (e) => {
    if (e.key === 'recipes') {
        initializeEditPage(recipeId)
    }
})

// Set up form submission handler

document.querySelector('#add-ingredient').addEventListener('submit', (e) => {
    const text = e.target.elements.text.value.trim()
    e.preventDefault()

    if (text.length > 0) {
        addIngredient(text)
        renderIngredients()
        e.target.elements.text.value = ''
    }
})

window.addEventListener('storage', (e) => {
    if (e.key === 'ingredients') {
        loadIngredients()
        renderIngredients()
    }
})