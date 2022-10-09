import m from "mithril";
import Stream from "mithril/stream";

let QUERY_URL = "https://api.urfonline.com/graphql";

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
        })
            .then((res) => res.errors ? error(res.errors[0]) : result(res.data))
            .catch((err) => error(err));
    }

    return { result, run, error };
}
