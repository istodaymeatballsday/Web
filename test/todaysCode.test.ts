import { getFood, getTodaysMealCode } from "../utils/importantFunctions";
import * as mockdate from "mockdate";

describe("getFood", () => {
  it("should not get meatballs or mash for 2019-04-09", async () => {
    const foods = await getFood(new Date("2019-04-09"));
    expect(foods).toEqual([
      "creamy salmon pasta",
      "bean otto, green asparagus & pesto"
    ]);
  });
  it("should not get meatballs but mash for 2019-04-10", async () => {
    const foods = await getFood(new Date("2019-04-10"));
    expect(foods).toEqual([
      "italian veal sausage, mashed potatoes & pesto crème",
      "pasta, spinach, broccoli & lentils"
    ]);
  });
  it("should get meatballs and mash for 2019-04-12", async () => {
    const foods = await getFood(new Date("2019-04-12"));
    expect(foods).toEqual([
      "meatballs, cream sauce, lingonberries & mashed potatoes",
      "green lasagna"
    ]);
  });
});

describe("getCode", () => {
  it("should get Nope. for 2019-04-09", async () => {
    mockdate.set("2019-04-09");
    const today = await getTodaysMealCode();
    expect(today).toEqual({ msg: "Nope.", code: 0 });
  });
  it("should get Nope. for 2019-04-10", async () => {
    mockdate.set("2019-04-10");
    const today = await getTodaysMealCode();
    expect(today).toEqual({ msg: "Nope. But it is mashed potatoes", code: 2 });
  });
  it("should get Yep. for 2019-04-12", async () => {
    mockdate.set("2019-04-12");
    const today = await getTodaysMealCode();
    expect(today).toEqual({ msg: "Yep.", code: 1 });
  });
});
