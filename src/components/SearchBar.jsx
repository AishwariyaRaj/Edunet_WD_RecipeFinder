import { useState } from 'react'
import { useRecipeContext } from '../context/RecipeContext'

const SearchBar = () => {
  const { searchRecipes, loading } = useRecipeContext()
  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState({
    diet: '',
    intolerances: '',
    cuisine: ''
  })

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      searchRecipes(query, filters)
    }
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="card p-6 mb-6">
      <form onSubmit={handleSearch}>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-grow">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for recipes or ingredients..."
              className="w-full p-3 bg-dark-lighter border border-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-white"
              required
            />
          </div>
          <button
            type="submit"
            className="btn-primary py-3 px-6"
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="diet" className="block text-sm font-medium text-white mb-1">
              Diet
            </label>
            <select
              id="diet"
              name="diet"
              value={filters.diet}
              onChange={handleFilterChange}
              className="w-full p-3 bg-dark-lighter border border-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-white"
            >
              <option value="">Any</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="gluten-free">Gluten Free</option>
              <option value="ketogenic">Keto</option>
              <option value="paleo">Paleo</option>
            </select>
          </div>

          <div>
            <label htmlFor="intolerances" className="block text-sm font-medium text-white mb-1">
              Intolerances
            </label>
            <select
              id="intolerances"
              name="intolerances"
              value={filters.intolerances}
              onChange={handleFilterChange}
              className="w-full p-3 bg-dark-lighter border border-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-white"
            >
              <option value="">None</option>
              <option value="dairy">Dairy</option>
              <option value="egg">Egg</option>
              <option value="gluten">Gluten</option>
              <option value="peanut">Peanut</option>
              <option value="seafood">Seafood</option>
            </select>
          </div>

          <div>
            <label htmlFor="cuisine" className="block text-sm font-medium text-white mb-1">
              Cuisine
            </label>
            <select
              id="cuisine"
              name="cuisine"
              value={filters.cuisine}
              onChange={handleFilterChange}
              className="w-full p-3 bg-dark-lighter border border-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-white"
            >
              <option value="">Any</option>
              <option value="italian">Italian</option>
              <option value="mexican">Mexican</option>
              <option value="indian">Indian</option>
              <option value="chinese">Chinese</option>
              <option value="american">American</option>
              <option value="thai">Thai</option>
            </select>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SearchBar