import { API, graphqlOperation } from "aws-amplify";
import { updateMeal } from './graphql/mutations';
import { getMeal } from "./graphql/queries";

export async function getMealItemIds(mealId?: string) {
    const result: any = await API.graphql(graphqlOperation(getMeal, { id: mealId }));
    return result.data.getMeal.items;
}

export async function updateMealItems(items: any, mealId?: string) {
    const meal = {
        id: mealId,
        items: items
    };
    await API.graphql(graphqlOperation(updateMeal, { input: meal }));
}