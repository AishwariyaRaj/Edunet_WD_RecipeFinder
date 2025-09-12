import { useRecipeContext } from '../context/RecipeContext'
import { useMemo } from 'react'

const ShoppingList = () => {
  const { shoppingList, removeFromShoppingList, toggleItemPurchased } = useRecipeContext()

  // Group shopping list items by recipe
  const groupedItems = useMemo(() => {
    const groups = {};
    
    shoppingList.forEach(item => {
      const recipeId = item.recipeId || 'unknown';
      const recipeTitle = item.recipeTitle || 'Other Items';
      
      if (!groups[recipeId]) {
        groups[recipeId] = {
          title: recipeTitle,
          items: []
        };
      }
      
      groups[recipeId].items.push(item);
    });
    
    return Object.values(groups);
  }, [shoppingList]);

  // Function to clear all purchased items
  const clearPurchasedItems = () => {
    if (window.confirm('Are you sure you want to clear all purchased items?')) {
      shoppingList
        .filter(item => item.purchased)
        .forEach(item => removeFromShoppingList(item.id))
    }
  }

  // Function to clear all items
  const clearAllItems = () => {
    if (window.confirm('Are you sure you want to clear the entire shopping list?')) {
      shoppingList.forEach(item => removeFromShoppingList(item.id))
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-white">Shopping List</h1>
      
      {shoppingList.length === 0 ? (
        <div className="card text-center my-12 p-10">
          <p className="text-white text-lg">Your shopping list is empty.</p>
          <p className="mt-2 text-gray-400">Add ingredients from recipes to create your shopping list!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {groupedItems.map((group, groupIndex) => (
            <div key={groupIndex} className="card p-6">
              <h3 className="text-xl font-semibold mb-4 text-primary border-b border-dark pb-2">{group.title}</h3>
              
              <ul className="divide-y divide-dark">
                {group.items.map(item => (
                  <li key={item.id} className="py-3 flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={item.purchased || false}
                        onChange={() => toggleItemPurchased(item.id)}
                        className="h-5 w-5 text-primary rounded focus:ring-primary-light mr-3 bg-dark-lighter border-dark"
                      />
                      <span className={`${item.purchased ? 'line-through text-gray-400' : 'text-white'}`}>
                        {item.name}
                      </span>
                    </div>
                    <button
                      onClick={() => removeFromShoppingList(item.id)}
                      className="text-secondary hover:text-secondary-light transition-colors"
                      aria-label="Remove item"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          <div className="flex justify-end space-x-3 mt-4">
            <button
              onClick={clearPurchasedItems}
              className="btn-outline"
            >
              Clear Purchased
            </button>
            
            <button
              onClick={clearAllItems}
              className="btn-secondary"
            >
              Clear All
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ShoppingList