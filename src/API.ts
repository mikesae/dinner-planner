/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateItemInput = {
  id?: string | null,
  name: string,
  description?: string | null,
  image: string,
  category: string,
  rating?: number | null,
  userName: string,
};

export type ModelItemConditionInput = {
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  image?: ModelStringInput | null,
  category?: ModelStringInput | null,
  rating?: ModelIntInput | null,
  userName?: ModelStringInput | null,
  and?: Array< ModelItemConditionInput | null > | null,
  or?: Array< ModelItemConditionInput | null > | null,
  not?: ModelItemConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateItemInput = {
  id: string,
  name?: string | null,
  description?: string | null,
  image?: string | null,
  category?: string | null,
  rating?: number | null,
  userName?: string | null,
};

export type DeleteItemInput = {
  id?: string | null,
};

export type CreateMealInput = {
  id?: string | null,
  date: string,
  userName: string,
  type: string,
};

export type ModelMealConditionInput = {
  date?: ModelStringInput | null,
  userName?: ModelStringInput | null,
  type?: ModelStringInput | null,
  and?: Array< ModelMealConditionInput | null > | null,
  or?: Array< ModelMealConditionInput | null > | null,
  not?: ModelMealConditionInput | null,
};

export type UpdateMealInput = {
  id: string,
  date?: string | null,
  userName?: string | null,
  type?: string | null,
};

export type DeleteMealInput = {
  id?: string | null,
};

export type ModelItemFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  image?: ModelStringInput | null,
  category?: ModelStringInput | null,
  rating?: ModelIntInput | null,
  userName?: ModelStringInput | null,
  and?: Array< ModelItemFilterInput | null > | null,
  or?: Array< ModelItemFilterInput | null > | null,
  not?: ModelItemFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelMealFilterInput = {
  id?: ModelIDInput | null,
  date?: ModelStringInput | null,
  userName?: ModelStringInput | null,
  type?: ModelStringInput | null,
  and?: Array< ModelMealFilterInput | null > | null,
  or?: Array< ModelMealFilterInput | null > | null,
  not?: ModelMealFilterInput | null,
};

export type CreateItemMutationVariables = {
  input: CreateItemInput,
  condition?: ModelItemConditionInput | null,
};

export type CreateItemMutation = {
  createItem:  {
    __typename: "Item",
    id: string,
    name: string,
    description: string | null,
    image: string,
    category: string,
    rating: number | null,
    userName: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateItemMutationVariables = {
  input: UpdateItemInput,
  condition?: ModelItemConditionInput | null,
};

export type UpdateItemMutation = {
  updateItem:  {
    __typename: "Item",
    id: string,
    name: string,
    description: string | null,
    image: string,
    category: string,
    rating: number | null,
    userName: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteItemMutationVariables = {
  input: DeleteItemInput,
  condition?: ModelItemConditionInput | null,
};

export type DeleteItemMutation = {
  deleteItem:  {
    __typename: "Item",
    id: string,
    name: string,
    description: string | null,
    image: string,
    category: string,
    rating: number | null,
    userName: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateMealMutationVariables = {
  input: CreateMealInput,
  condition?: ModelMealConditionInput | null,
};

export type CreateMealMutation = {
  createMeal:  {
    __typename: "Meal",
    id: string,
    date: string,
    userName: string,
    type: string,
    items:  Array< {
      __typename: "Item",
      id: string,
      name: string,
      description: string | null,
      image: string,
      category: string,
      rating: number | null,
      userName: string,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateMealMutationVariables = {
  input: UpdateMealInput,
  condition?: ModelMealConditionInput | null,
};

export type UpdateMealMutation = {
  updateMeal:  {
    __typename: "Meal",
    id: string,
    date: string,
    userName: string,
    type: string,
    items:  Array< {
      __typename: "Item",
      id: string,
      name: string,
      description: string | null,
      image: string,
      category: string,
      rating: number | null,
      userName: string,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteMealMutationVariables = {
  input: DeleteMealInput,
  condition?: ModelMealConditionInput | null,
};

export type DeleteMealMutation = {
  deleteMeal:  {
    __typename: "Meal",
    id: string,
    date: string,
    userName: string,
    type: string,
    items:  Array< {
      __typename: "Item",
      id: string,
      name: string,
      description: string | null,
      image: string,
      category: string,
      rating: number | null,
      userName: string,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetItemQueryVariables = {
  id: string,
};

export type GetItemQuery = {
  getItem:  {
    __typename: "Item",
    id: string,
    name: string,
    description: string | null,
    image: string,
    category: string,
    rating: number | null,
    userName: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListItemsQueryVariables = {
  filter?: ModelItemFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListItemsQuery = {
  listItems:  {
    __typename: "ModelItemConnection",
    items:  Array< {
      __typename: "Item",
      id: string,
      name: string,
      description: string | null,
      image: string,
      category: string,
      rating: number | null,
      userName: string,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetMealQueryVariables = {
  id: string,
};

export type GetMealQuery = {
  getMeal:  {
    __typename: "Meal",
    id: string,
    date: string,
    userName: string,
    type: string,
    items:  Array< {
      __typename: "Item",
      id: string,
      name: string,
      description: string | null,
      image: string,
      category: string,
      rating: number | null,
      userName: string,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListMealsQueryVariables = {
  filter?: ModelMealFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListMealsQuery = {
  listMeals:  {
    __typename: "ModelMealConnection",
    items:  Array< {
      __typename: "Meal",
      id: string,
      date: string,
      userName: string,
      type: string,
      items:  Array< {
        __typename: "Item",
        id: string,
        name: string,
        description: string | null,
        image: string,
        category: string,
        rating: number | null,
        userName: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateItemSubscription = {
  onCreateItem:  {
    __typename: "Item",
    id: string,
    name: string,
    description: string | null,
    image: string,
    category: string,
    rating: number | null,
    userName: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateItemSubscription = {
  onUpdateItem:  {
    __typename: "Item",
    id: string,
    name: string,
    description: string | null,
    image: string,
    category: string,
    rating: number | null,
    userName: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteItemSubscription = {
  onDeleteItem:  {
    __typename: "Item",
    id: string,
    name: string,
    description: string | null,
    image: string,
    category: string,
    rating: number | null,
    userName: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateMealSubscription = {
  onCreateMeal:  {
    __typename: "Meal",
    id: string,
    date: string,
    userName: string,
    type: string,
    items:  Array< {
      __typename: "Item",
      id: string,
      name: string,
      description: string | null,
      image: string,
      category: string,
      rating: number | null,
      userName: string,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateMealSubscription = {
  onUpdateMeal:  {
    __typename: "Meal",
    id: string,
    date: string,
    userName: string,
    type: string,
    items:  Array< {
      __typename: "Item",
      id: string,
      name: string,
      description: string | null,
      image: string,
      category: string,
      rating: number | null,
      userName: string,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteMealSubscription = {
  onDeleteMeal:  {
    __typename: "Meal",
    id: string,
    date: string,
    userName: string,
    type: string,
    items:  Array< {
      __typename: "Item",
      id: string,
      name: string,
      description: string | null,
      image: string,
      category: string,
      rating: number | null,
      userName: string,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
