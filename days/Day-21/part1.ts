import { DayScriptExecutor } from "../../src/day/day.types.ts";

import { getInputLinesTrimAndFilterEmpty } from '../shared.ts';

export const executor: DayScriptExecutor = (input: string): string => {
  const lines = getInputLinesTrimAndFilterEmpty(input);

  const allIngredients = new Set<string>();
  const allergensInIngredients: Map<string, string[]> = new Map<string, string[]>();

  const ingredientsPerLine: string[][] = [];

  const getIngredientsWithAllergensRegExp = /(.*)\(contains(.*)\)/;
  lines.forEach(line => {
    const regRes = getIngredientsWithAllergensRegExp.exec(line);

    if (regRes && (regRes.length > 2)) {
      const ingredients = regRes[1].trim().split(' ').map(i => i.trim());
      const allergens = regRes[2].trim().split(',').map(a => a.trim());

      ingredientsPerLine.push(ingredients);

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

  const ingredientsWithAllergen: Set<string> = new Set<string>();
  for (const ingredients of allergensInIngredients.values()) {
    ingredients.forEach(ingredient => ingredientsWithAllergen.add(ingredient));
  }

  let total = ingredientsPerLine.reduce((total, ingredients) => {
    return total + (ingredients.filter(ingredient => !ingredientsWithAllergen.has(ingredient)).length);
  }, 0);

  return `${total}`;
};