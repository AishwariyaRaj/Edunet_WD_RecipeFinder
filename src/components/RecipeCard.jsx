import { useState } from 'react'
import { useRecipeContext } from '../context/RecipeContext'

const RecipeCard = ({ recipe }) => {
  const { toggleFavorite, favorites, addToShoppingList } = useRecipeContext()
  const [showModal, setShowModal] = useState(false)
  
  const isFavorite = favorites.some(fav => fav.id === recipe.id)
  
  const handleAddToShoppingList = (e) => {
    // Prevent the card click event from triggering
    e.stopPropagation()
    
    // For user recipes, ingredients are already in the right format
    if (recipe.isUserRecipe && recipe.ingredients) {
      addToShoppingList(recipe.ingredients, recipe.id, recipe.title)
      return
    }
    
    // For Spoonacular API recipes, we would need to fetch detailed information
    // In a real app, you would make an API call to get the ingredients
    // For this demo, we'll use placeholder data
    const placeholderIngredients = [
      { id: Date.now(), name: 'Ingredient from ' + recipe.title, purchased: false }
    ]
    
    addToShoppingList(placeholderIngredients, recipe.id, recipe.title)
  }
  
  const handleFavoriteClick = (e) => {
    e.stopPropagation() // Prevent the card click event from triggering
    toggleFavorite(recipe)
  }
  
  const openModal = () => {
    setShowModal(true)
    document.body.style.overflow = 'hidden' // Prevent scrolling when modal is open
  }
  
  const closeModal = () => {
    setShowModal(false)
    document.body.style.overflow = 'auto' // Re-enable scrolling
  }
  
  return (
    <>
      <div 
        className="card cursor-pointer" 
        onClick={openModal}
      >
        {recipe.image && (
          <div className="relative overflow-hidden h-48">
            <img 
              src={recipe.image} 
              alt={recipe.title} 
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-dark-darker opacity-50"></div>
          </div>
        )}
        
        <div className="p-5">
          <h3 className="text-lg font-semibold mb-2 text-white">{recipe.title}</h3>
          
          {recipe.summary && (
            <p className="text-gray-400 text-sm mb-4">
              {recipe.summary.length > 100 
                ? recipe.summary.substring(0, 100) + '...' 
                : recipe.summary}
            </p>
          )}
          
          <div className="flex justify-between items-center mt-4">
            <button 
              onClick={handleFavoriteClick}
              className={`p-2 rounded-full ${isFavorite ? 'text-secondary' : 'text-gray-400'} hover:bg-dark-darker transition-colors`}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={isFavorite ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            
            <button 
              onClick={handleAddToShoppingList}
              className="btn-primary text-sm"
            >
              Add to Shopping List
            </button>
          </div>
        </div>
      </div>
      
      {/* Recipe Detail Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-dark-lighter rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-dark-lighter p-4 border-b border-dark flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">{recipe.title}</h2>
              <button 
                onClick={closeModal}
                className="text-gray-400 hover:text-primary focus:outline-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {recipe.image && (
              <img 
                src={recipe.image} 
                alt={recipe.title} 
                className="w-full h-64 object-cover"
              />
            )}
            
            <div className="p-6">
              {recipe.summary && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2 text-primary">Description</h3>
                  <p className="text-gray-400">{recipe.summary}</p>
                </div>
              )}
              
              {recipe.ingredients && recipe.ingredients.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2 text-primary">Ingredients</h3>
                  <ul className="list-disc pl-5 text-gray-400">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient.name}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {recipe.instructions && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2 text-primary">Instructions</h3>
                  <p className="text-gray-400 whitespace-pre-line">{recipe.instructions}</p>
                </div>
              )}
              
              <div className="flex justify-between mt-6">
                <button 
                  onClick={() => {
                    handleFavoriteClick({ stopPropagation: () => {} })
                  }}
                  className={`btn ${isFavorite ? 'btn-secondary' : 'btn-outline'}`}
                >
                  {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                </button>
                
                <button 
                  onClick={() => {
                    handleAddToShoppingList({ stopPropagation: () => {} })
                    closeModal()
                  }}
                  className="btn-primary"
                >
                  Add to Shopping List
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default RecipeCard