import fetch from "node-fetch";
import { Day } from "./interfaces";
import * as _ from "lodash";

(async () => {
  const meals: Record<string, number> = {};
  const days: Day[] = await (await fetch(
    "http://carbonateapiprod.azurewebsites.net/api/v1/mealprovidingunits/3d519481-1667-4cad-d2a3-08d558129279/dishoccurrences?startDate=2019-04-01&endDate=2019-04-01"
  )).json();
  const foods = _.flatMapDeep(
    days.map(day =>
      day.displayNames
        .filter(
          dn => dn.displayNameCategory.displayNameCategoryName === "Swedish"
        )
        .map(dn => dn.dishDisplayName.trim())
    )
  );
  foods.forEach(food => (meals[food] ? meals[food]++ : (meals[food] = 1)));
  const avg =
    Object.values(meals).reduce((acc, curr) => acc + curr, 0) /
    Object.keys(meals).length;
  console.log(meals);
  console.log(avg);
  console.log(Object.keys(meals).length);
})();
