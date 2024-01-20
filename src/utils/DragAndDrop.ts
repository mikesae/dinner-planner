import { addItemToMeal, removeItemFromMeal } from 'data/api/MealFunctions';

export async function onDragEnd(e: any) {
  const fromDate = e.active.data.current.date;
  const fromMealId = e.active.data.current.mealId;
  const fromUpdate = e.active.data.current.updateMeal;

  // Ignore if just a click and no drag.
  if (e.over === null) {
    return;
  }

  const toDate = e.over.data.current.date;
  const toMealId = e.over.data.current.mealId;
  const toUpdate = e.over.data.current.updateMeal;

  // Can't drag item placeholder with same date
  if (fromDate === toDate) {
    return;
  }

  const itemId = e.active.data.current.id;

  // Add active item to over date.

  await addItemToMeal(itemId, toMealId, toDate);
  if (typeof toUpdate === 'function') {
    toUpdate();
  }

  // Remove active item from current meal and re-render
  await removeItemFromMeal(fromMealId, itemId);
  if (typeof fromUpdate === 'function') {
    fromUpdate();
  }
}
