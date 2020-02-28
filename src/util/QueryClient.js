import m from "mithril";
import Stream from "mithril/stream";

let QUERY_URL = "http://esther.local:8000/graphql";

export function useQuery(query) {
    let stream = Stream({});

    function run() {
        m.request({
            method: "POST",
            url: QUERY_URL,
            body: {
                query: query.loc.source.body,
                operationName: query.definitions[0].name.value,
            },
            responseType: "json",
            deserialize: res => res.data
        }).then((data) => stream(data));
    }

    return [stream, run];
}
