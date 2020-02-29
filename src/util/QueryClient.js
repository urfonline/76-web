import m from "mithril";
import Stream from "mithril/stream";

let QUERY_URL = "http://esther.local:8000/graphql";

export function useQuery(query, variables = {}) {
    let result = Stream({});
    let error = Stream(null);

    function run() {
        m.request({
            method: "POST",
            url: QUERY_URL,
            body: {
                query: query.loc.source.body,
                operationName: query.definitions[0].name.value,
                variables: variables,
            },
            responseType: "json",
            deserialize: res => res.data
        })
            .then((data) => result(data))
            .catch((err) => error(err));
    }

    return [result, run, error];
}
