import Image from 'next/image';
import Link from 'next/link';

async function getRecipes() {
  const res = await fetch('https://dummyjson.com/recipes', {
    next: {
      revalidate: 60 // revalidate every 60 seconds
    }
  });
  const data = await res.json();
  return data;
}

export default async function Blog() {
  const { recipes } = await getRecipes();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Recipe Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <Link 
            href={`/blog/${recipe.id}`} 
            key={recipe.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative h-48">
              <Image
                src={recipe.image}
                alt={recipe.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{recipe.name}</h2>
              <div className="flex items-center mb-2">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="ml-1 text-sm text-gray-600">{recipe.rating}</span>
                </div>
                <span className="mx-2 text-gray-400">•</span>
                <span className="text-sm text-gray-600">{recipe.cuisine}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {recipe.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 text-sm text-gray-600 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                <div>
                  <span className="font-medium">Prep:</span> {recipe.prepTimeMinutes}min
                </div>
                <div>
                  <span className="font-medium">Cook:</span> {recipe.cookTimeMinutes}min
                </div>
                <div>
                  <span className="font-medium">Serves:</span> {recipe.servings}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
