import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthContext } from "./useAuth";
import { IFood, IMeal } from "../pages/user/Nutrition";

interface IProviderChildren {
  children: ReactNode;
}

interface INutritionContext {
  currentMeals: IMeal[];
  setCurrentMeals: Dispatch<SetStateAction<IMeal[]>>;
  recipes: IFood[];
  setRecipes: Dispatch<SetStateAction<IFood[]>>;
}

export const NutritionContext = createContext<INutritionContext>({} as INutritionContext);

const initcm: IMeal[] = [
  {
    name: "Breakfast Breakfast Breakfast Breakfast Breakfast",
    foods: [
      {
        name: "Extra Virgin Olive Oil",
        calories: 460,
        protein: 20,
        fat: 20,
        carbs: 20,
        amount: 4,
        amountType: "tbsp",
      },
      {
        name: "Pizza",
        calories: 600,
        protein: 20,
        fat: 20,
        carbs: 20,
        amount: 2,
        amountType: "slices",
      },
    ],
  },
  {
    name: "Lunch",
    foods: [
      {
        name: "Eggs",
        calories: 380,
        protein: 20,
        fat: 20,
        carbs: 20,
        amount: 4,
        amountType: "eggs",
      },
      {
        name: "Ryse Chocolate Chip Peanut and Peanut Butter Protein Powder",
        calories: 600,
        protein: 20,
        fat: 20,
        carbs: 20,
        amount: 80,
        amountType: "grams",
      },
    ],
  },
  {
    name: "Dinner",
    foods: [
      {
        name: "Chicken",
        calories: 360,
        protein: 20,
        fat: 20,
        carbs: 20,
        amount: 60,
        amountType: "grams",
      },
      {
        name: "Mass Gainer",
        calories: 10000,
        protein: 20,
        fat: 20,
        carbs: 20,
        amount: 5000000,
        amountType: "mg",
      },
    ],
  },
];

const initr: IFood[] = [];

const init: [] = [];

export function NutritionProvider({ children }: IProviderChildren) {
  const currentUser = useContext(AuthContext);

  const [currentMeals, setCurrentMeals] = useState<IMeal[]>(init);
  const [recipes, setRecipes] = useState<IFood[]>(init);

  useEffect(() => {
    if (currentMeals !== init) {
      AsyncStorage.setItem(`@${currentUser?.id}:currentMeals`, JSON.stringify(currentMeals));
    }
  }, [currentMeals]);

  useEffect(() => {
    if (recipes !== init) {
      AsyncStorage.setItem(`@${currentUser?.id}:recipes`, JSON.stringify(recipes));
    }
  }, [recipes]);

  useEffect(() => {
    AsyncStorage.multiGet([`@${currentUser?.id}:currentMeals`, `@${currentUser?.id}:recipes`]).then((arrayJson) => {
      if (arrayJson[0][1]) {
        setCurrentMeals(JSON.parse(arrayJson[0][1]));
      }
      if (arrayJson[1][1]) {
        setRecipes(JSON.parse(arrayJson[1][1]));
      }
    });
  }, []);

  return (
    <NutritionContext.Provider value={{ currentMeals, setCurrentMeals, recipes, setRecipes }}>
      {children}
    </NutritionContext.Provider>
  );
}
