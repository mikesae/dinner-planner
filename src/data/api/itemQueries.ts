import { API, graphqlOperation } from 'aws-amplify';
import { updateItem } from 'data/graphql/mutations';
import * as queries from 'data/graphql/queries';
import { ModelSortDirection } from './API';

export async function getSortedItems(userName: string, category: string) {
  const filter = {
    category: {
      eq: category,
    },
  };
  const items = await API.graphql({
    query: queries.itemsByName,
    variables: {
      userName: userName,
      category: category,
      filter: filter,
      sortDirection: ModelSortDirection.ASC,
      limit: 10000, // use a large number; graphql will stop even searching if not large enough
      nextToken: null,
    },
  });
  // @ts-ignore
  return items.data.itemsByName.items;
}

export async function getAllSortedItems(userName: string) {
  const items = await API.graphql({
    query: queries.itemsByName,
    variables: {
      userName: userName,
      sortDirection: ModelSortDirection.ASC,
      limit: 10000, // use a large number; graphql will stop even searching if not large enough
      nextToken: null,
    },
  });
  // @ts-ignore
  return items.data.itemsByName.items;
}

export async function getItem(id: string) {
  const result: any = await API.graphql({
    query: queries.getItem,
    variables: {
      id: id,
    },
  });
  return result.data.getItem;
}

export async function setItem(item: any) {
  await API.graphql(
    graphqlOperation(updateItem, {
      input: { id: item.id, category: item.category, name: item.name, description: item.description, image: item.image },
    })
  );
}
