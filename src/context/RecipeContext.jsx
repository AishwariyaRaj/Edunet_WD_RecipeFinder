import { createContext, useState, useEffect, useContext } from 'react'

const RecipeContext = createContext()

export const useRecipeContext = () => useContext(RecipeContext)

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([])
  const [favorites, setFavorites] = useState([])
  const [shoppingList, setShoppingList] = useState([])
  const [userRecipes, setUserRecipes] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Load data from localStorage on initial render
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites')
    const storedShoppingList = localStorage.getItem('shoppingList')
    const storedUserRecipes = localStorage.getItem('userRecipes')
    
    console.log('localStorage check:', { 
      storedFavorites: !!storedFavorites, 
      storedShoppingList: !!storedShoppingList, 
      storedUserRecipes: !!storedUserRecipes 
    })

    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites))
    }
    
    if (storedShoppingList) {
      setShoppingList(JSON.parse(storedShoppingList))
    }
    
    // Create sample recipes
    const timestamp = Date.now();
    const sampleRecipes = [
      {
        id: timestamp,
        title: 'Paneer Butter Masala',
        summary: 'A creamy, mildly spiced curry made with paneer cubes in a tomato-cashew base',
        ingredients: [
          { id: timestamp + 1, name: '250g paneer, cubed', purchased: false },
          { id: timestamp + 2, name: '2 tbsp butter', purchased: false },
          { id: timestamp + 3, name: '1 onion, finely chopped', purchased: false },
          { id: timestamp + 4, name: '2 tomatoes, pureed', purchased: false },
          { id: timestamp + 5, name: '1 tbsp ginger-garlic paste', purchased: false },
          { id: timestamp + 6, name: '1 tsp garam masala', purchased: false },
          { id: timestamp + 7, name: '1/2 tsp red chili powder', purchased: false },
          { id: timestamp + 8, name: '1/4 cup cashew paste', purchased: false },
          { id: timestamp + 9, name: '1/2 cup cream', purchased: false },
          { id: timestamp + 10, name: 'Salt to taste', purchased: false },
          { id: timestamp + 11, name: 'Fresh coriander for garnish', purchased: false }
        ],
        instructions: 'Heat butter in a pan. Add onions and sauté until golden. Add ginger-garlic paste and cook for 1 minute. Add tomato puree and spices, cook for 5 minutes. Add cashew paste and cream, simmer for 2 minutes. Add paneer cubes and cook for 5 more minutes. Garnish with fresh coriander and serve hot with naan or rice.',
        image: 'https://www.indianhealthyrecipes.com/wp-content/uploads/2014/11/paneer-butter-masala-recipe-1.jpg',
        isUserRecipe: true,
        createdAt: new Date().toISOString()
      },
      {
        id: timestamp + 100,
        title: 'Rustic Red Wine Spaghetti',
        summary: 'A rich and flavorful pasta dish cooked with red wine for a deep, complex flavor',
        ingredients: [
          { id: timestamp + 101, name: '400g spaghetti', purchased: false },
          { id: timestamp + 102, name: '750ml dry red wine', purchased: false },
          { id: timestamp + 103, name: '4 cloves garlic, minced', purchased: false },
          { id: timestamp + 104, name: '1 small onion, finely chopped', purchased: false },
          { id: timestamp + 105, name: '2 tbsp olive oil', purchased: false },
          { id: timestamp + 106, name: '1 tsp red pepper flakes', purchased: false },
          { id: timestamp + 107, name: '1/2 cup grated Parmesan cheese', purchased: false },
          { id: timestamp + 108, name: 'Fresh basil leaves', purchased: false },
          { id: timestamp + 109, name: 'Salt and pepper to taste', purchased: false }
        ],
        instructions: 'Heat olive oil in a large pot. Add garlic and onion, sauté until fragrant. Add red pepper flakes and cook for 30 seconds. Pour in 1/2 cup of red wine and let it reduce. Add spaghetti and remaining wine. Cook, stirring frequently, until pasta is al dente and has absorbed the wine. Top with Parmesan cheese and fresh basil before serving.',
        image: 'https://iili.io/KTqa5Ja.jpg',
        isUserRecipe: true,
        createdAt: new Date(Date.now() - 86400000).toISOString() // 1 day ago
      },
      {
        id: timestamp + 200,
        title: 'Chicken Biriyani',
       summary: 'A fragrant and flavorful rice dish made with marinated chicken, spices, and basmati rice, cooked together in layers.',
       ingredients: [
        { id: timestamp + 301, name: '500g chicken pieces', purchased: false },
        { id: timestamp + 302, name: '2 cups basmati rice (soaked 30 minutes)', purchased: false },
        { id: timestamp + 303, name: '1 cup yogurt (curd)', purchased: false },
        { id: timestamp + 304, name: '2 onions, thinly sliced and fried golden', purchased: false },
        { id: timestamp + 305, name: '2 tomatoes, chopped', purchased: false },
        { id: timestamp + 306, name: '2 tbsp ginger-garlic paste', purchased: false },
        { id: timestamp + 307, name: '2 tsp red chili powder', purchased: false },
        { id: timestamp + 308, name: '1 tsp turmeric powder', purchased: false },
        { id: timestamp + 309, name: '2 tsp garam masala', purchased: false },
        { id: timestamp + 310, name: '1 bay leaf', purchased: false },
        { id: timestamp + 311, name: '3 cardamoms', purchased: false },
        { id: timestamp + 312, name: '4 cloves', purchased: false },
        { id: timestamp + 313, name: '1 small cinnamon stick', purchased: false },
        { id: timestamp + 314, name: 'A handful of fresh mint leaves', purchased: false },
        { id: timestamp + 315, name: 'A handful of fresh coriander leaves', purchased: false },
        { id: timestamp + 316, name: '3 tbsp oil or ghee', purchased: false },
        { id: timestamp + 317, name: 'Salt to taste', purchased: false }
      ],
      instructions: 'Marinate chicken with yogurt, ginger-garlic paste, chili powder, turmeric, garam masala, salt, and keep aside for 30 minutes. Boil rice with bay leaf, cardamom, cloves, cinnamon, and salt until half cooked, then drain. In a pan, heat oil/ghee, fry onions until golden, add tomatoes, then add marinated chicken and cook until almost done. In a large pot, layer chicken masala at the bottom, then rice, and sprinkle fried onions, mint, and coriander. Repeat layers. Cover tightly and cook on low heat for 20 minutes. Gently fluff before serving. Enjoy hot with raita.',
      image: 'https://iili.io/KTBofFR.jpg',
      isUserRecipe: true,
      createdAt: new Date(Date.now() - 172800000).toISOString() // 2 days ago
      },
      {
        id: timestamp + 300,
        title: 'Lasagna',
       summary: 'A classic Italian baked pasta dish layered with rich meat sauce, creamy béchamel, and melted cheese.',
       ingredients: [
         { id: timestamp + 401, name: '9 lasagna noodles', purchased: false },
         { id: timestamp + 402, name: '500g ground beef or chicken', purchased: false },
         { id: timestamp + 403, name: '1 onion, chopped', purchased: false },
         { id: timestamp + 404, name: '2 cloves garlic, minced', purchased: false },
         { id: timestamp + 405, name: '2 cups tomato sauce', purchased: false },
         { id: timestamp + 406, name: '1 tsp Italian seasoning', purchased: false },
         { id: timestamp + 407, name: '2 cups ricotta or cottage cheese', purchased: false },
         { id: timestamp + 408, name: '2 cups shredded mozzarella', purchased: false },
         { id: timestamp + 409, name: '1/2 cup grated Parmesan', purchased: false },
         { id: timestamp + 410, name: '2 tbsp olive oil', purchased: false },
         { id: timestamp + 411, name: 'Salt and pepper to taste', purchased: false }
        ],
        instructions: 'Boil lasagna noodles until al dente, then drain. In a pan, heat olive oil, sauté onion and garlic, add ground meat, cook until browned. Stir in tomato sauce, seasoning, salt, and pepper, simmer 10 minutes. In a baking dish, layer noodles, meat sauce, ricotta, and mozzarella. Repeat layers, finishing with mozzarella and Parmesan on top. Bake at 375°F (190°C) for 30–35 minutes until golden and bubbly. Rest for 10 minutes before serving.',
        image: 'https://iili.io/KTB0MFI.jpg',
        isUserRecipe: true,
        createdAt: new Date(Date.now() - 259200000).toISOString() // 3 days ago
      },
      {
        id: timestamp + 300,
        title: 'Pizza Margherita',
        summary: 'A simple and classic Neapolitan pizza topped with fresh tomato sauce, mozzarella cheese, and basil leaves.',
        ingredients: [
           { id: timestamp + 501, name: '2 cups all-purpose flour', purchased: false },
           { id: timestamp + 502, name: '1 tsp dry yeast', purchased: false },
           { id: timestamp + 503, name: '1 tsp sugar', purchased: false },
           { id: timestamp + 504, name: '3/4 cup warm water', purchased: false },
           { id: timestamp + 505, name: '2 tbsp olive oil', purchased: false },
           { id: timestamp + 506, name: '1/2 tsp salt', purchased: false },
           { id: timestamp + 507, name: '1 cup tomato sauce', purchased: false },
           { id: timestamp + 508, name: '1 1/2 cups fresh mozzarella, sliced', purchased: false },
           { id: timestamp + 509, name: 'Fresh basil leaves', purchased: false }
        ],
        instructions: 'Mix flour, yeast, sugar, salt, warm water, and olive oil to form dough. Knead and let rise for 1 hour. Preheat oven to 475°F (245°C). Roll dough into a thin round base. Spread tomato sauce, add mozzarella slices, and place basil leaves on top. Drizzle with olive oil. Bake 10–12 minutes until crust is golden and cheese is melted. Serve hot.',
        image: 'https://iili.io/KTBOq9R.jpg',
        isUserRecipe: true,
        createdAt: new Date(Date.now() - 259200000).toISOString() // 3 days ago
      },
      {
        id: timestamp + 300,
        summary: 'A comforting Japanese noodle soup made with broth, noodles, vegetables, and toppings like egg and meat.',
        ingredients: [
           { id: timestamp + 601, name: '200g ramen noodles', purchased: false },
           { id: timestamp + 602, name: '4 cups chicken or vegetable broth', purchased: false },
           { id: timestamp + 603, name: '2 tbsp soy sauce', purchased: false },
           { id: timestamp + 604, name: '1 tbsp miso paste (optional)', purchased: false },
           { id: timestamp + 605, name: '1 clove garlic, minced', purchased: false },
           { id: timestamp + 606, name: '1 small piece ginger, grated', purchased: false },
           { id: timestamp + 607, name: '1 boiled egg, halved', purchased: false },
           { id: timestamp + 608, name: '1 cup mushrooms, sliced', purchased: false },
           { id: timestamp + 609, name: '1/2 cup corn kernels', purchased: false },
           { id: timestamp + 610, name: '1 spring onion, chopped', purchased: false },
           { id: timestamp + 611, name: '1 tbsp sesame oil', purchased: false }
        ],
        instructions: 'In a pot, heat sesame oil and sauté garlic and ginger for 1 minute. Add broth, soy sauce, and miso paste, simmer for 5 minutes. Add mushrooms and corn, cook until tender. Cook ramen noodles separately, then add to broth. Serve in bowls topped with boiled egg and spring onion. Enjoy hot.',
        image: 'https://i.postimg.cc/GpkMZ5Tx/Trimmed-03-Miso-Ramen-02-M.jpg',
         isUserRecipe: true,
        createdAt: new Date(Date.now() - 259200000).toISOString() // 3 days ago
      }
    ];
    
    // If there are stored user recipes, use them, otherwise use the sample recipes
    if (storedUserRecipes) {
      console.log('Using stored user recipes')
      const parsedUserRecipes = JSON.parse(storedUserRecipes);
      
      // If the stored user recipes array is empty, use the sample recipes
      if (parsedUserRecipes.length === 0) {
        console.log('Stored user recipes array is empty, using sample recipes')
        setUserRecipes(sampleRecipes);
        localStorage.setItem('userRecipes', JSON.stringify(sampleRecipes));
      } else {
        setUserRecipes(parsedUserRecipes);
      }
    } else {
      console.log('No stored user recipes found, adding sample recipes')
      // Add sample recipes if no user recipes exist
      setUserRecipes(sampleRecipes);
      localStorage.setItem('userRecipes', JSON.stringify(sampleRecipes));
      
      // Add sample ingredients to shopping list from the first recipe if no shopping list exists
      if (!storedShoppingList) {
        const sampleIngredients = sampleRecipes[0].ingredients.map(ingredient => ({
          ...ingredient,
          recipeId: sampleRecipes[0].id,
          recipeTitle: sampleRecipes[0].title
        }));
        setShoppingList(sampleIngredients);
        localStorage.setItem('shoppingList', JSON.stringify(sampleIngredients));
      }
    }
  }, [])

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  useEffect(() => {
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList))
  }, [shoppingList])

  useEffect(() => {
    localStorage.setItem('userRecipes', JSON.stringify(userRecipes))
  }, [userRecipes])

  // Function to search recipes using Spoonacular API
  const searchRecipes = async (query, filters = {}) => {
    setLoading(true)
    setError(null)
    
    try {
      // Note: In a real app, you would use your actual API key
      const API_KEY = 'ddcfe0ee6d704e70bd1df3737e1ca4c7' 
      let url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${query}&number=12`
      
      // Add any filters to the API request
      if (filters.diet) url += `&diet=${filters.diet}`
      if (filters.intolerances) url += `&intolerances=${filters.intolerances}`
      if (filters.cuisine) url += `&cuisine=${filters.cuisine}`
      
      const response = await fetch(url)
      const data = await response.json()
      
      if (data.results) {
        setRecipes(data.results)
      } else {
        setRecipes([])
        setError('No recipes found')
      }
    } catch (err) {
      setError('Failed to fetch recipes. Please try again.')
      console.error('Error fetching recipes:', err)
    } finally {
      setLoading(false)
    }
  }

  // Function to toggle a recipe as favorite
  const toggleFavorite = (recipe) => {
    const isFavorite = favorites.some(fav => fav.id === recipe.id)
    
    if (isFavorite) {
      setFavorites(favorites.filter(fav => fav.id !== recipe.id))
    } else {
      setFavorites([...favorites, recipe])
    }
  }

  // Function to add ingredients to shopping list
  const addToShoppingList = (ingredients, recipeId, recipeTitle) => {
    const newItems = ingredients.filter(ingredient => 
      !shoppingList.some(item => item.name === ingredient.name && item.recipeId === recipeId)
    ).map(ingredient => ({
      ...ingredient,
      recipeId,
      recipeTitle
    }))
    
    if (newItems.length > 0) {
      setShoppingList([...shoppingList, ...newItems])
    }
  }

  // Function to remove item from shopping list
  const removeFromShoppingList = (itemId) => {
    setShoppingList(shoppingList.filter(item => item.id !== itemId))
  }

  // Function to toggle item as purchased in shopping list
  const toggleItemPurchased = (itemId) => {
    setShoppingList(shoppingList.map(item => 
      item.id === itemId ? { ...item, purchased: !item.purchased } : item
    ))
  }

  // Function to add a user recipe
  const addUserRecipe = (recipe) => {
    const newRecipe = {
      ...recipe,
      id: Date.now(), // Generate a unique ID
      isUserRecipe: true
    }
    setUserRecipes([...userRecipes, newRecipe])
  }

  const value = {
    recipes,
    favorites,
    shoppingList,
    userRecipes,
    loading,
    error,
    searchRecipes,
    toggleFavorite,
    addToShoppingList,
    removeFromShoppingList,
    toggleItemPurchased,
    addUserRecipe
  }

  return (
    <RecipeContext.Provider value={value}>
      {children}
    </RecipeContext.Provider>
  )
}