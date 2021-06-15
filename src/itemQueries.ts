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