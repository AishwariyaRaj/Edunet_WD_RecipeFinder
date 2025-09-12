import { useRecipeContext } from '../context/RecipeContext'
import SearchBar from '../components/SearchBar'
import RecipeCard from '../components/RecipeCard'

const Home = () => {
  const { recipes, loading, error, userRecipes, setUserRecipes, setShoppingList } = useRecipeContext()
  
  console.log('Home component - userRecipes:', userRecipes)
  
  const clearLocalStorage = () => {
    localStorage.removeItem('userRecipes')
    localStorage.removeItem('shoppingList')
    localStorage.removeItem('favorites')
    // Force reload the page to trigger the useEffect in RecipeContext
    window.location.reload()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Find Your Perfect Recipe</h1>
        <button 
          onClick={clearLocalStorage}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm"
        >
          Reset Sample Data
        </button>
      </div>
      
      <SearchBar />
      
      {loading && (
        <div className="flex justify-center my-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      )}
      
      {error && (
        <div className="bg-secondary-darker bg-opacity-20 border border-secondary text-secondary-light px-4 py-3 rounded-lg relative my-6" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      
      {!loading && !error && recipes.length === 0 && (
        <div className="card text-center my-12 p-10">
          <p className="text-white text-lg">Search for recipes to get started!</p>
        </div>
      )}
      
      {recipes.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-white">Search Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </div>
      )}
      
      {userRecipes.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4 text-white">Your Recipes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userRecipes.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Home