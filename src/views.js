import { getFilters } from './filters'
import { loadRecipes, getRecipes, loadIngredients, removeIngredient } from './recipes'

// Generate the DOM structure for a recipe

// const generateStatusDOM = (incompleteTodos) => {
//     const summary = document.createElement('h2')
//     summary.classList.add('list-title')
//     const plural = incompleteTodos.length === 1 ? '' : 's'
//     summary.textContent = `You have ${incompleteTodos.length} todo${plural} left.`        
//     return summary
// }

const generateRecipeDOM = (recipe) => {
    const recipeEl = document.createElement('a')
    const textEl = document.createElement('p')
    // const ingredientEl = document.createElement('p')

    //Set up the recipe title text

    if(recipe.title.length > 0) {
        textEl.textContent = recipe.title
    } else {
        textEl.textContent = 'Unnamed Recipe'
    }
    textEl.classList.add('list-item_title')
    recipeEl.appendChild(textEl)

    // Setup the link

    recipeEl.setAttribute('href', `/edit.html#${recipe.id}`)
    recipeEl.classList.add('list-item')

    // Setup the status message
    // ingredientEl.textContent = generateLastEdited(note.updatedAt)
    // ingredientEl.classList.add('list-item_subtitle')
    // recipeEl.appendChild(ingredientEl)

    return recipeEl

}

const generateIngredientDOM = (ingredient) => {
    const ingredientEl = document.createElement('label')
    const containerEl = document.createElement('div')
    const checkbox = document.createElement('input')
    const ingredientText = document.createElement('span')
    const removeButton = document.createElement('button')

    // Setup ingredient checkbox

    checkbox.setAttribute('type', 'checkbox')
    containerEl.appendChild(checkbox)
    // checkbox.addEventListener('change', () => {
    //     toggleTodo(todo.id)
    //     renderTodos()
    // })

    // Setup ingredient text

    ingredientText.textContent = ingredient.text
    containerEl.appendChild(ingredientText)

    // Setup container
    
    ingredientEl.classList.add('list-item')
    containerEl.classList.add('list-item_container')
    ingredientEl.appendChild(containerEl)

    // Setup the 'remove' button

    removeButton.textContent = 'remove'
    removeButton.classList.add('button', 'button--text')
    ingredientEl.appendChild(removeButton)
    removeButton.addEventListener('click', () => {
        removeIngredient(ingredient.id)
        renderIngredients()
    })

    // Setup container
    ingredientEl.classList.add('list-item')
    containerEl.classList.add('list-item_container')

    return ingredientEl

}

// Render application recipes

const renderRecipes = () => {
    const recipesEl = document.querySelector('#recipes')
    const filters = getFilters()
    const recipes = loadRecipes()
    const filteredRecipes = recipes.filter((recipe) => recipe.title.toLowerCase().includes(filters.searchText.toLowerCase()))

    recipesEl.innerHTML = ''

    if (filteredRecipes.length > 0) {
        filteredRecipes.forEach((recipe) => {
            const recipeEl = generateRecipeDOM(recipe)
            recipesEl.appendChild(recipeEl)
        })
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'No recipes to show'
        emptyMessage.classList.add('empty-message')
        recipesEl.appendChild(emptyMessage)
    }
}

// Render application ingredients

const renderIngredients = () => {
    const ingredientsEl = document.querySelector('#ingredients')
    const ingredients = loadIngredients()

    ingredientsEl.innerHTML = ''

    ingredients.forEach((ingredient) => {
        const ingredientEl = generateIngredientDOM(ingredient)
        ingredientsEl.appendChild(ingredientEl)
    })
}

// Initialize edit page

const initializeEditPage = (recipeId) => {
    const titleElement = document.querySelector('#recipe-title')
    const bodyElement = document.querySelector('#recipe-body')
    const recipes = getRecipes()
    const recipe = recipes.find((recipe) => recipe.id === recipeId)

    if (!recipe) {
        location.assign('/index.html')
    }

    titleElement.value = recipe.title
    bodyElement.value = recipe.body
}

export { generateRecipeDOM, renderRecipes, initializeEditPage, renderIngredients }