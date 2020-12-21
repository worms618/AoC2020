import { DayScriptExecutor } from "../../src/day/day.types.ts";

import { getInputLinesTrimAndFilterEmpty } from '../shared.ts';

export const executor: DayScriptExecutor = (input: string): string => {
  const lines = getInputLinesTrimAndFilterEmpty(input);

  const allIngredients = new Set<string>();
  const allergensInIngredients: Map<string, string[]> = new Map<string, string[]>();

  const getIngredientsWithAllergensRegExp = /(.*)\(contains(.*)\)/;
  lines.forEach(line => {
    const regRes = getIngredientsWithAllergensRegExp.exec(line);

    if (regRes && (regRes.length > 2)) {
      const ingredients = regRes[1].trim().split(' ').map(i => i.trim());
      const allergens = regRes[2].trim().split(',').map(a => a.trim());

      ingredients.forEach(ingredient => allIngredients.add(ingredient));
      allergens.forEach(allergen => {
        let knownIngredients = allergensInIngredients.get(allergen);

        if (knownIngredients === undefined)
          knownIngredients = Array.from(ingredients);
        else {
          const newKnowIngredients = [];

          //Intersection? Only add the ingredient that is already in the list
          for (const ingredient of ingredients) {
            if ((knownIngredients.indexOf(ingredient) >= 0)) {
              newKnowIngredients.push(ingredient);
            }
          }

          knownIngredients = newKnowIngredients;
        }

        allergensInIngredients.set(allergen, knownIngredients);
      });
    }
  });

  let allHaveOneIngredientLeft = false;
  while (!allHaveOneIngredientLeft) {
    const allergens = Array.from(allergensInIngredients.keys());
    for (const allergen of allergens) {
      const ingredients = allergensInIngredients.get(allergen);

      if (ingredients) {
        if (ingredients.length > 1) continue;

        const ingredient = ingredients[0];

        for (const [cAllergen, cIngredients] of allergensInIngredients.entries()) {
          if (cAllergen === allergen) continue;

          const ingredientIndex = cIngredients.indexOf(ingredient);

          if (ingredientIndex < 0) continue;

          cIngredients.splice(ingredientIndex, 1)
        }
      }
    }

    allHaveOneIngredientLeft = true;
    for (const ingredients of allergensInIngredients.values()) {
      if (ingredients.length > 1) {
        allHaveOneIngredientLeft = false;
        break;
      }
    }
  }

  return Array.from(allergensInIngredients)
    .map(allergenWithIngredient => ({
      allergen: allergenWithIngredient[0],
      ingredient: allergenWithIngredient[1][0]
    }))
    .sort((a, b) => a.allergen.localeCompare(b.allergen))
    .reduce<string[]>((ingredients, allWithIng) => {
      ingredients.push(allWithIng.ingredient);
      return ingredients;
    }, [])
    .join(',');
};