import { RawDay } from "./interfaces";
import * as _ from "lodash";

export function getMealStrings(days: RawDay[]): string[] {
  return _.flattenDeep(
    days.map(day =>
      day.displayNames
        .filter(
          dn => dn.displayNameCategory.displayNameCategoryName === "English"
        )
        .map(dn => dn.dishDisplayName.trim())
    )
  ) as string[];
}

export function getFriendlyFormat(raw: RawDay[]) {
  return raw;
}

export function aggregate(foods: string[]): Record<string, number> {
  const meals: Record<string, number> = {};
  foods.forEach(food => (meals[food] ? meals[food]++ : (meals[food] = 1)));
  return meals;
}

export function getIngredients(mealStrings: string[]) {
  const separatorRegex = /,|&/;
  return _.flattenDeep(
    mealStrings.map(food =>
      food.split(separatorRegex).filter(val => !separatorRegex.test(val))
    )
  )
    .map((ingredient: string) => ingredient.trim().toLowerCase())
    .sort((a, b) => ("" + a[0]).localeCompare(b[0]));
}

export function getGeneralMetaData(
  mealsAccumulated: Record<string, number>
): GeneralMetaData {
  const average =
    Object.values(mealsAccumulated).reduce((acc, curr) => acc + curr, 0) /
    Object.keys(mealsAccumulated).length;
  const length = Object.keys(mealsAccumulated).length;
  return { average, length };
}

interface GeneralMetaData {
  average: number;
  length: number;
}
