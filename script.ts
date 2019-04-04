// import fetch from "node-fetch";
import { RawDay } from "./interfaces";
import * as _ from "lodash";
import * as fs from "fs";
(async () => {
  // const rawDays: RawDay[] = await (await fetch(
  //   "http://carbonateapiprod.azurewebsites.net/api/v1/mealprovidingunits/3d519481-1667-4cad-d2a3-08d558129279/dishoccurrences?startDate=2018-04-01&endDate=2019-04-01"
  // )).json();
  const rawDays: RawDay[] = JSON.parse(
    fs.readFileSync("data.json", { encoding: "utf8" })
  );
})();

export function getMealStrings(days: RawDay[]) {
  return _.flatMapDeep(
    days.map(day =>
      day.displayNames
        .filter(
          dn => dn.displayNameCategory.displayNameCategoryName === "English"
        )
        .map(dn => dn.dishDisplayName.trim())
    )
  );
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
  const separatorRegex = /(,|&)/;
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
