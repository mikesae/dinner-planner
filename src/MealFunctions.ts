import { API, graphqlOperation } from "aws-amplify";
import { updateMeal, createMeal } from './graphql/mutations';
import { getMeal } from "./graphql/queries";
import { dateToExtendedISODate } from 'aws-date-utils'

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

export async function addMeal(date: Date, userName: string) {
    const meal = {
        date: dateToExtendedISODate(date),
        userName,
        type: 'Dinner',
        items: [],
        note: ''
    };
    const result: any = await API.graphql(graphqlOperation(createMeal, { input: meal }));
    return result.data.createMeal.id;
}