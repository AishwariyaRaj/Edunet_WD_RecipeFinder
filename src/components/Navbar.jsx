import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-dark-darker text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-xl font-bold">Recipe Finder</span>
          </Link>
          
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-primary transition-colors font-medium">
              Home
            </Link>
            <Link to="/favorites" className="hover:text-primary transition-colors font-medium">
              Favorites
            </Link>
            <Link to="/shopping-list" className="hover:text-primary transition-colors font-medium">
              Shopping List
            </Link>
            <Link to="/add-recipe" className="hover:text-primary transition-colors font-medium">
              Add Recipe
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-white hover:text-primary focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu (hidden by default) */}
      <div className="md:hidden hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 bg-dark-darker">
          <Link to="/" className="block px-3 py-2 hover:text-primary transition-colors font-medium">
            Home
          </Link>
          <Link to="/favorites" className="block px-3 py-2 hover:text-primary transition-colors font-medium">
            Favorites
          </Link>
          <Link to="/shopping-list" className="block px-3 py-2 hover:text-primary transition-colors font-medium">
            Shopping List
          </Link>
          <Link to="/add-recipe" className="block px-3 py-2 hover:text-primary transition-colors font-medium">
            Add Recipe
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar