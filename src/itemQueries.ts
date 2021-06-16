import {API} from "aws-amplify";
import * as queries from "./graphql/queries";
import {ModelSortDirection} from "./API";

export async function getSortedItems(userName: string, category: string) {
    const filter = {
        category: {
            eq: category
        }
    };
    const items = await API.graphql({
        query: queries.itemsByName,
        variables: {
            userName: userName,
            category: category,
            filter: filter,
            sortDirection: ModelSortDirection.ASC
        }});
    // @ts-ignore
    return items.data.itemsByName.items;
}

export async function getItem(id: string) {
    const result:any = await API.graphql({
        query: queries.getItem,
        variables: {
            id: id
        }
    });
    return result.data.getItem;
}