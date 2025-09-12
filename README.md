# Recipe Finder App

## Overview
A React application for searching recipes, saving favorites, managing a shopping list, and adding your own recipes.

## Features
- **Search Recipes**: Find recipes by name or ingredients using the Spoonacular API
- **Filter Recipes**: Filter by diet, intolerances, and cuisine
- **Favorites**: Save your favorite recipes for quick access
- **Shopping List**: Add ingredients to your shopping list and track purchases
- **User Recipes**: Add your own recipes to the collection

## Tech Stack
- React (with Vite)
- React Router for navigation
- Tailwind CSS for styling
- Context API for state management
- LocalStorage for data persistence

## Getting Started

### Prerequisites
- Node.js and npm installed

### Installation
1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Get a free API key from [Spoonacular API](https://spoonacular.com/food-api)
4. Update the API key in `src/context/RecipeContext.jsx`

### Running the App
```
npm run dev
```

### Building for Production
```
npm run build
```

## Usage

### Searching Recipes
Use the search bar on the home page to find recipes. You can filter results by diet, intolerances, and cuisine.

### Saving Favorites
Click the heart icon on any recipe card to save it to your favorites.

### Managing Shopping List
Click "Add to Shopping List" on a recipe card to add its ingredients to your shopping list. You can mark items as purchased or remove them from the list.

### Adding Your Own Recipes
Navigate to the "Add Recipe" page to submit your own recipes. These will be saved locally and displayed on the home page.

## Note
This app uses the free tier of the Spoonacular API, which has a limited number of requests per day. If you encounter issues with the API, you may have reached the daily limit.