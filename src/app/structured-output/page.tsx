"use client";
import { useState } from "react";
import { schemaRecipe } from "../api/generate-recipe/route";
import { z } from "zod";

type Recipe = z.infer<typeof schemaRecipe>;

export default function StructuredOutputPage() {
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerateRecipe = async () => {
        setIsLoading(true);
        const response = await fetch("/api/generate-recipe", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                prompt: "Generate a recipe for a chocolate cake.",
            }),
        });
        if (!response.ok) {
            console.error("Failed to generate recipe");
            setIsLoading(false);
            return;
        }
        const data = await response.json();
        setRecipe(data.result as Recipe);
        setIsLoading(false);
    };
    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Structured Output - Recipe example</h1>
            <button
                onClick={handleGenerateRecipe}
                disabled={isLoading}
                className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600 disabled:opacity-50"
            >
                {isLoading ? "Generating..." : "Generate Recipe"}
            </button>
            {recipe && (
                <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-2">{recipe.recipe.name}</h2>
                    <h3 className="text-lg font-medium mb-1">Ingredients:</h3>
                    <ul className="list-disc pl-5 mb-4">
                        {recipe.recipe.ingredients.map((ingredient, index) => (
                            <li key={index}>
                                {ingredient.amount} of {ingredient.name}
                            </li>
                        ))}
                    </ul>
                    <h3 className="text-lg font-medium mb-1">Steps:</h3>
                    <ol className="list-decimal pl-5">
                        {recipe.recipe.steps.map((step, index) => (
                            <li key={index}>{step}</li>
                        ))}
                    </ol>
                </div>)}
        </div>
    );
}