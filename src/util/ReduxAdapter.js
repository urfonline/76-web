import m from "mithril";
import Stream from "mithril/stream";
import {applyMiddleware, combineReducers, createStore as createReduxStore} from "redux";

export const globalStore = Stream(null);

export const createReducer = (initialState, handlers) =>
    (state = initialState, action) => {
        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action);
        } else {
            return state;
        }
    };

export const defaultMapStateToProps = (state, props) => state;

export function connect(mapStateToProps, mapActionCreators = {}) {
    return WrappedComponent => vnode => {
        let store = globalStore();
        let state = Stream({});

        let ownProps = vnode.attrs || {};
        let unsubscribe = store.subscribe(() => {
            state(mapStateToProps(store.getState(), ownProps));
            m.redraw();
        });

        return {
            onremove(vnode) {
                unsubscribe();
            },

            view(vnode) {
                return m(WrappedComponent, {
                    ...state(),
                    ...vnode.attrs,
                    dispatch: store.dispatch,
                }, vnode.children);
            }
        }
    }
}

export function createStore(reducers, initialState = {}, middleware = []) {
    globalStore(
        createReduxStore(
            combineReducers(reducers),
            initialState,
            applyMiddleware(...middleware)
        )
    );

    return globalStore();
}
