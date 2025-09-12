import { useState } from 'react'
import { useRecipeContext } from '../context/RecipeContext'
import { useNavigate } from 'react-router-dom'

const AddRecipe = () => {
  const { addUserRecipe } = useRecipeContext()
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    ingredients: '',
    instructions: '',
    image: ''
  })
  
  const [errors, setErrors] = useState({})
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }
  
  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }
    
    if (!formData.ingredients.trim()) {
      newErrors.ingredients = 'Ingredients are required'
    }
    
    if (!formData.instructions.trim()) {
      newErrors.instructions = 'Instructions are required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    // Process ingredients into an array of objects
    const ingredientsList = formData.ingredients.split(',').map(ingredient => ({
      id: Date.now() + Math.random(), // Generate unique ID
      name: ingredient.trim(),
      purchased: false
    }))
    
    // Create the recipe object
    const newRecipe = {
      title: formData.title,
      summary: formData.summary,
      ingredients: ingredientsList,
      instructions: formData.instructions,
      image: formData.image || 'https://via.placeholder.com/300x200?text=Recipe+Image', // Default image if none provided
      createdAt: new Date().toISOString()
    }
    
    // Add the recipe
    addUserRecipe(newRecipe)
    
    // Show success message and redirect
    alert('Recipe added successfully!')
    navigate('/')
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-white">Add Your Own Recipe</h1>
      
      <div className="card p-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-white mb-1">
              Recipe Title*
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full p-3 bg-dark-lighter border ${errors.title ? 'border-secondary' : 'border-dark'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-white`}
            />
            {errors.title && <p className="text-secondary text-sm mt-1">{errors.title}</p>}
          </div>
          
          <div className="mb-4">
            <label htmlFor="summary" className="block text-sm font-medium text-white mb-1">
              Description
            </label>
            <textarea
              id="summary"
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              rows="3"
              className="w-full p-3 bg-dark-lighter border border-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-white"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="ingredients" className="block text-sm font-medium text-white mb-1">
              Ingredients* (comma-separated)
            </label>
            <textarea
              id="ingredients"
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              rows="4"
              placeholder="Example: 2 cups flour, 1 cup sugar, 3 eggs"
              className={`w-full p-3 bg-dark-lighter border ${errors.ingredients ? 'border-secondary' : 'border-dark'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-white`}
            />
            {errors.ingredients && <p className="text-secondary text-sm mt-1">{errors.ingredients}</p>}
          </div>
          
          <div className="mb-4">
            <label htmlFor="instructions" className="block text-sm font-medium text-white mb-1">
              Instructions*
            </label>
            <textarea
              id="instructions"
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
              rows="6"
              className={`w-full p-3 bg-dark-lighter border ${errors.instructions ? 'border-secondary' : 'border-dark'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-white`}
            />
            {errors.instructions && <p className="text-secondary text-sm mt-1">{errors.instructions}</p>}
          </div>
          
          <div className="mb-6">
            <label htmlFor="image" className="block text-sm font-medium text-white mb-1">
              Image URL (optional)
            </label>
            <input
              type="text"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full p-3 bg-dark-lighter border border-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-white"
            />
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="btn-outline"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              Add Recipe
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddRecipe