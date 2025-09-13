import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import ShoppingList from './pages/ShoppingList'
import AddRecipe from './pages/AddRecipe'
import TestSpoonacular from './pages/TestSpoonacular'
import { RecipeProvider } from './context/RecipeContext'

function App() {
  return (
    <RecipeProvider>
      <div className="min-h-screen bg-dark">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/shopping-list" element={<ShoppingList />} />
            <Route path="/add-recipe" element={<AddRecipe />} />
            <Route path="/test-spoonacular" element={<TestSpoonacular />} />
          </Routes>
        </main>
      </div>
    </RecipeProvider>
  )
}

export default App