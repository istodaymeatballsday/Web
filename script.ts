import fetch from "node-fetch";
import { Day } from "./interfaces";
import { from, forkJoin } from "rxjs";
import { map, switchAll, filter, reduce } from "rxjs/operators";

(async () => {
  // const meals = {};
  from<Promise<Day[]>>(
    (await fetch(
      "http://carbonateapiprod.azurewebsites.net/api/v1/mealprovidingunits/871c63d7-4ddb-46b8-d2a0-08d558129279/dishoccurrences?startDate=2017-04-04&endDate=2019-10-05"
    )).json()
  )
    .pipe(
      switchAll(),
      map(day =>
        forkJoin(
          from(day.displayNames).pipe(
            filter(
              displayName =>
                displayName.displayNameCategory.displayNameCategoryName ===
                "Swedish"
            ),
            map(displayName => displayName.dishDisplayName)
          )
        )
      ),
      switchAll(),
      map(a => a[0].trim())
    )
    .subscribe(a => console.log(a));
  // days.forEach(day => day.length && console.log("nice"));
  // const lengths = days.map(day => day.displayNames.length);
  // days.forEach(day => {
  //   day.displayNames.map;
  // });
  // days.map(day=> day.displayNames.map(display => display.dishDisplayName)).reduce((acc:Map<string, number> , curr): Map<string, number> => {
  // 	acc.get('curr')
  // }, new Map<string, number>);
  // console.log(days[1].displayNames.map(name => name.id));
  // const a = [1, 2, 3];
  // from(a).subscribe(arr => {
  //   console.log(arr);
  // });
})();
