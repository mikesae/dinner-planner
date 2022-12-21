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
    return API.graphql(graphqlOperation(updateMeal, { input: meal }));
}

export async function addMeal(date: Date, userName: string) {
    const isoDate = dateToExtendedISODate(date);
    const meal = {
        date: isoDate.substring(0, isoDate.length-6),
        userName,
        type: 'Dinner',
        items: [],
        note: ''
    };
    const result: any = await API.graphql(graphqlOperation(createMeal, { input: meal }));
    return result.data.createMeal.id;
}