import { useRecipeContext } from '../context/RecipeContext'
import RecipeCard from '../components/RecipeCard'

const Favorites = () => {
  const { favorites } = useRecipeContext()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-white">Your Favorite Recipes</h1>
      
      {favorites.length === 0 ? (
        <div className="card text-center my-12 p-10">
          <p className="text-white text-lg">You haven't saved any favorites yet.</p>
          <p className="mt-2 text-gray-400">Browse recipes and click the heart icon to add them here!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Favorites