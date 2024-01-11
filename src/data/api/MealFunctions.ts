import { API, graphqlOperation } from 'aws-amplify';
import { dateToExtendedISODate } from 'aws-date-utils';
import { createMeal, updateMeal } from 'data/graphql/mutations';
import { getMeal } from 'data/graphql/queries';

export async function getMealItemIds(mealId?: string) {
  const result: any = await API.graphql(graphqlOperation(getMeal, { id: mealId }));
  return result.data.getMeal.items;
}

export async function updateMealItems(items: any, mealId?: string) {
  const meal = {
    id: mealId,
    items: items,
  };
  return API.graphql(graphqlOperation(updateMeal, { input: meal }));
}

export async function addMeal(date: Date, userName: string) {
  const isoDate = dateToExtendedISODate(date);
  const meal = {
    date: isoDate.substring(0, isoDate.length - 6),
    userName,
    type: 'Dinner',
    items: [],
    note: '',
  };
  const result: any = await API.graphql(graphqlOperation(createMeal, { input: meal }));
  return result.data.createMeal.id;
}

export async function addItemToMeal(mealItemId: number, mealId: string | undefined, date: Date, userName: string) {
  if (typeof mealId === 'undefined') {
    mealId = await addMeal(date, userName);
  }

  const itemIds = await getMealItemIds(mealId);
  itemIds.push(mealItemId);
  await updateMealItems(itemIds, mealId);
}

export async function removeItemFromMeal(mealId: string | undefined, itemId: string) {
  const itemIds = await getMealItemIds(mealId);
  let newItemIds: string[] = [];
  itemIds.forEach((id: string) => {
    if (id !== itemId) {
      newItemIds.push(id);
    }
  });
  await updateMealItems(newItemIds, mealId);
}
