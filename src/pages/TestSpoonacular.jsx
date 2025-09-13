import { useState } from 'react'
import { useRecipeContext } from '../context/RecipeContext'

const TestSpoonacular = () => {
  const { getRecipeDetails, loading, error } = useRecipeContext()
  const [recipeId, setRecipeId] = useState('716429') // Default recipe ID for testing
  const [recipeDetails, setRecipeDetails] = useState(null)
  
  const handleFetchRecipe = async () => {
    try {
      const details = await getRecipeDetails(recipeId)
      setRecipeDetails(details)
      console.log('Recipe details:', details)
    } catch (err) {
      console.error('Error in test component:', err)
    }
  }
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-white">Test Spoonacular API</h1>
      
      <div className="mb-6">
        <label className="block text-gray-400 mb-2">Recipe ID:</label>
        <div className="flex">
          <input 
            type="text" 
            value={recipeId} 
            onChange={(e) => setRecipeId(e.target.value)}
            className="bg-dark-lighter text-white p-2 rounded-l border border-gray-700 flex-grow"
          />
          <button 
            onClick={handleFetchRecipe}
            className="bg-primary hover:bg-primary-dark text-white p-2 rounded-r"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Fetch Recipe'}
          </button>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
      
      {recipeDetails && (
        <div className="bg-dark-lighter p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4 text-white">{recipeDetails.title}</h2>
          
          {recipeDetails.image && (
            <img 
              src={recipeDetails.image} 
              alt={recipeDetails.title} 
              className="w-full h-64 object-cover mb-4 rounded"
            />
          )}
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2 text-primary">Description</h3>
            <p className="text-gray-400">
              {typeof recipeDetails.summary === 'string' && recipeDetails.summary.includes('<') 
                ? recipeDetails.summary.replace(/<[^>]*>/g, '') // Remove HTML tags
                : recipeDetails.summary}
            </p>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2 text-primary">Ingredients</h3>
            <ul className="list-disc pl-5 text-gray-400">
              {recipeDetails.extendedIngredients?.map((ingredient, index) => (
                <li key={index}>{ingredient.original || `${ingredient.amount} ${ingredient.unit} ${ingredient.name}`}</li>
              ))}
            </ul>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2 text-primary">Instructions</h3>
            {recipeDetails.analyzedInstructions && recipeDetails.analyzedInstructions.length > 0 ? (
              <ol className="list-decimal pl-5 text-gray-400">
                {recipeDetails.analyzedInstructions[0].steps.map(step => (
                  <li key={step.number} className="mb-2">{step.step}</li>
                ))}
              </ol>
            ) : (
              <p className="text-gray-400">{recipeDetails.instructions || 'No instructions available'}</p>
            )}
          </div>
          
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2 text-primary">Additional Information</h3>
            <div className="grid grid-cols-2 gap-4 text-gray-400">
              <div>
                <p><strong>Ready in:</strong> {recipeDetails.readyInMinutes} minutes</p>
                <p><strong>Servings:</strong> {recipeDetails.servings}</p>
              </div>
              <div>
                <p><strong>Health Score:</strong> {recipeDetails.healthScore}</p>
                <p><strong>Weight Watcher Points:</strong> {recipeDetails.weightWatcherSmartPoints}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TestSpoonacular