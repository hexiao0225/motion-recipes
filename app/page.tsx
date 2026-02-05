import { Header } from "@/components/Header";
import { RecipeCard } from "@/components/RecipeCard";
import { recipes } from "@/lib/recipes";

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Header />

      <div className="mt-12 grid gap-8 sm:grid-cols-1 lg:grid-cols-2">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>

      <footer className="mt-16 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
        <p>
          Built with Next.js, Tailwind CSS, and zero animation libraries.
        </p>
        <p className="mt-1">
          <a
            href="https://github.com/hexiao0225/motion-recipes"
            className="text-blue-600 hover:underline"
          >
            View source on GitHub
          </a>
        </p>
      </footer>
    </main>
  );
}
