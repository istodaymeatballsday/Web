import fetch from "node-fetch";
import { RawDay } from "./interfaces";
import { getMealStrings } from "./dataCrunching";

export async function getTodaysMealCode() {
  const meatballsAndMashRegex = /meatballs.*mashed|mashed.*meatballs/;
  const mashRegex = /mashed/;
  const today = await getFood(new Date());
  const filterRegex = initFilterRegex(today);
  // nested ternary, sue me
  return filterRegex(meatballsAndMashRegex)
    ? { msg: "Yep.", code: 1 }
    : filterRegex(mashRegex)
    ? { msg: "Nope. But it is mashed potatoes", code: 2 }
    : { msg: "Nope.", code: 0 };
}

export async function getFood(start: Date, end: Date = new Date()) {
  const rayDays: RawDay[] = await (await fetch(
    `http://carbonateapiprod.azurewebsites.net/api/v1/mealprovidingunits/3d519481-1667-4cad-d2a3-08d558129279/dishoccurrences?startDate=${start
      .toISOString()
      .substr(0, 10)}&endDate=${end.toISOString().substr(0, 10)}`
  )).json();
  const mealStrings = getMealStrings(rayDays).map(meal => meal.toLowerCase());
  return mealStrings;
}

// functional bby. https://www.w3schools.com/js/js_function_closures.asp
export function initFilterRegex(arr: string[]) {
  // returns null if no match in the array and the array otherwise
  function filterRegex(regex: RegExp) {
    return arr.filter(mealString => regex.test(mealString)).length ? arr : null;
  }
  return filterRegex;
}
