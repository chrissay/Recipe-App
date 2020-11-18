import uuidv4 from 'uuid/v4'

let recipes = []

// Read existing notes from localStorage

const loadRecipes = () => {
    
    const recipesJSON = localStorage.getItem('recipes')
    
    try {
        return recipesJSON ? JSON.parse(recipesJSON) : []
    } catch (e) {
        return []
    }
}

// Save the notes to localStorage

const saveRecipes = () => {
    localStorage.setItem('recipes', JSON.stringify(recipes))
}

// Expose notes from modules

const getRecipes = () => recipes

const createRecipe = () => {
    const id = uuidv4()
    
    notes.push({
        id: id,
        title: '',
        body: '',
    })
    saveRecipes()

    return id
}

// Remove a note from the list

const removeRecipe = (id) => {
    const recipeIndex = recipes.findIndex((recipe) => recipe.id === id)

    if (recipeIndex > -1) {
        recipes.splice(recipeIndex, 1)
        saveRecipes()
    }
}

// Update recipe

const updateRecipe = (id, updates) => {
    const recipe = recipes.find((recipe) => recipe.id === id)

    if (!recipe) {
        return
    }

    if (typeof updates.title === 'string') {
        recipe.title = updates.title
    }

    if (typeof updates.body === 'string') {
        recipe.body = updates.body
    }

    saveRecipe()
    return recipe
}

recipes = loadRecipes()

export { getRecipes, createRecipe, removeRecipe, updateRecipe, loadRecipes }

