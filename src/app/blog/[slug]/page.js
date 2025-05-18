import Image from "next/image";
import { notFound } from "next/navigation";

async function getRecipe(id) {
  try {
    const res = await fetch(`https://dummyjson.com/recipes/${id}`, {
      next: {
        revalidate: 60, // revalidate every 60 seconds
      },
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    return null;
  }
}

async function getAllRecipes() {
  try {
    const res = await fetch("https://dummyjson.com/recipes", {
      next: {
        revalidate: 60, // revalidate every 60 seconds
      },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.recipes;
  } catch (error) {
    return [];
  }
}

export async function generateStaticParams() {
  const recipes = await getAllRecipes();
  return recipes.map((recipe) => ({
    slug: recipe.id.toString(),
  }));
}

export default async function RecipePage({ params }) {
  const { slug } = await params;
  const recipe = await getRecipe(slug);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-96">
          <Image
            src={recipe.image}
            alt={recipe.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{recipe.name}</h1>

          <div className="flex items-center mb-6">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="ml-1 text-gray-600">
                {recipe.rating} ({recipe.reviewCount} reviews)
              </span>
            </div>
            <span className="mx-3 text-gray-400">•</span>
            <span className="text-gray-600">{recipe.cuisine}</span>
            <span className="mx-3 text-gray-400">•</span>
            <span className="text-gray-600">{recipe.difficulty}</span>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6 text-center">
            <div className="bg-gray-50 p-3 rounded">
              <div className="font-medium">Prep Time</div>
              <div className="text-gray-600">{recipe.prepTimeMinutes} min</div>
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <div className="font-medium">Cook Time</div>
              <div className="text-gray-600">{recipe.cookTimeMinutes} min</div>
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <div className="font-medium">Servings</div>
              <div className="text-gray-600">{recipe.servings}</div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Ingredients</h2>
            <ul className="list-disc list-inside space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="text-gray-600">
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Instructions</h2>
            <ol className="list-decimal list-inside space-y-3">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="text-gray-600">
                  {instruction}
                </li>
              ))}
            </ol>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {recipe.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 text-sm text-gray-600 rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
