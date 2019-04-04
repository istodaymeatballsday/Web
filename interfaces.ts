export interface Day {
  mealName: string;
  co2: number;
  date: Date;
}

export interface RootObject {
  data: RawDay[];
}

export interface RawDay {
  id: string;
  startDate: string;
  endDate: string;
  dishID: string;
  mealProvidingUnitID: string;
  mealProvidingUnit: MealProvidingUnit;
  displayNames: DisplayName[];
  dishTypeID: string;
  dishType: DishType;
  dish: Dish;
  availableDishTypes: DishType[];
  editableByDefault: boolean;
  sortOrder: number;
  numberOfPreparedPortions: number;
  numberOfServedPortions: number;
  allergens: any[];
  overrideAllergens: boolean;
  dishMenuSettings?: any;
  dayMenuSettings?: any;
  weekMenuSettings?: any;
  nyckelhalmarkt: boolean;
  wwfApproved: boolean;
}

export interface Dish {
  id: string;
  recipes: Recipe[];
  dishName: string;
  displayNames?: any;
  dishType?: any;
  cookbookIDs: any[];
  editableByDefault: boolean;
  totalEmission: number;
  mainRecipe?: any;
  price: number;
  prices: string;
  totalEmissionURL: string;
}

export interface Recipe {
  id: string;
  recipeName: string;
  allergens: Allergen[];
  ingredients: Ingredient[];
  basedOn?: any;
  instructions?: any;
  portions: number;
  cookbookIDs: any[];
  totalEmission: number;
}

export interface Ingredient {
  id: string;
  amount: number;
  foodID: string;
  regionID: string;
  productionActivityID: string;
  isEcological: boolean;
  measurementUnitID: string;
  recipeID: string;
  totalEmission: number;
}

export interface Allergen {
  id: string;
  allergenCode: string;
  recipeID: string;
  allergenURL: string;
}

export interface DisplayName {
  dishID?: any;
  id: string;
  displayNameCategoryID: string;
  dishDisplayName: string;
  dishOccurrenceID: string;
  displayNameCategory: DisplayNameCategory;
}

export interface MealProvidingUnit {
  id: string;
  mealProvidingUnitName: string;
  organizationID: string;
  showFoods: boolean;
  showArticles: boolean;
  longitude: number;
  latitude: number;
  displayNameCategories: DisplayNameCategory[];
  dishTypes: DishType[];
  settings: Settings;
}

export interface Settings {
  id: string;
  hasLibrary: boolean;
  hasNyckelhalsLabel: boolean;
  hasWwfApprovedLabel: boolean;
  hasPricesLabel: boolean;
  dayMenuSettings?: any;
  weekMenuSettings?: any;
  individualMenuSettings?: any;
}

export interface DishType {
  id: string;
  dishTypeName: string;
  dishTypeNameEnglish: string;
  isEnabled: boolean;
  price: number;
  hasPrice: boolean;
}

export interface DisplayNameCategory {
  displayNameCategoryID: string;
  displayNameCategoryName: string;
  sortOrder: number;
  mealProvidingUnitID: string;
}
