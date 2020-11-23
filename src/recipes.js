import uuidv4 from 'uuid/v4'

let recipes = []
let ingredients = []

// Read existing recipes from localStorage

const loadRecipes = () => {
    
    const recipesJSON = localStorage.getItem('recipes')
    
    try {
        return recipesJSON ? JSON.parse(recipesJSON) : []
    } catch (e) {
        return []
    }
}

// Read existing ingredients from localStorage

const loadIngredients = () => {
    
    const ingredientsJSON = localStorage.getItem('ingredients')
    
    try {
        return ingredientsJSON ? JSON.parse(ingredientsJSON) : []
    } catch (e) {
        return []
    }
}

// Save the recipes to localStorage

const saveRecipes = () => {
    localStorage.setItem('recipes', JSON.stringify(recipes))
}

// Save the ingredients to localStorage

const saveIngredients = () => {
    localStorage.setItem('ingredients', JSON.stringify(ingredients))
}

// Expose recipes from modules

const getRecipes = () => recipes

const createRecipe = () => {
    const id = uuidv4()
    
    recipes.push({
        id: id,
        title: '',
        body: '',
    })
    saveRecipes()

    return id
}

// Add ingredient

const addIngredient = (text) => {
    const id = uuidv4()
    
    ingredients.push({
        id: id,
        text,
        completed: false,
    })
    saveIngredients()

    return id
}

// Remove a receipe from the list

const removeRecipe = (id) => {
    const recipeIndex = recipes.findIndex((recipe) => recipe.id === id)

    if (recipeIndex > -1) {
        recipes.splice(recipeIndex, 1)
        saveRecipes()
    }
}

// Remove a ingredient from the list

const removeIngredient = (id) => {
    const ingredientIndex = ingredients.findIndex((ingredient) => ingredient.id === id)

    if (ingredientIndex > -1) {
        ingredients.splice(ingredientIndex, 1)
        saveIngredients()
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

    saveRecipes()
    return recipe
}

recipes = loadRecipes()

export { getRecipes, createRecipe, removeRecipe, updateRecipe, loadRecipes, addIngredient, loadIngredients, saveIngredients, removeIngredient }