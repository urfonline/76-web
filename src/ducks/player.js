const initialState = {
    selectedEpisode: null,
    shouldPlay: false,
    shouldSeek: false,
    shouldRestore: false,
    shouldPlayAfterSeek: false,
    isLoading: false,
    target: 0,
};

export default function playerReducer(state = initialState, action) {
    switch (action.type) {
        case "SET_EPISODE":
            return {
                ...state,
                selectedEpisode: action.episode,
                shouldPlay: false,
                shouldPlayAfterSeek: true,
                isLoading: true,
            };
        case "READY":
            return {
                ...state,
                shouldRestore: true,
                isLoading: false,
            };
        case "PLAY":
            return {
                ...state,
                shouldPlay: true,
            };
        case "PAUSE":
            return {
                ...state,
                shouldPlay: false,
            };
        case "TOGGLE":
            return {
                ...state,
                shouldPlay: !state.shouldPlay,
            };
        case "SEEK":
            return {
                ...state,
                shouldSeek: true,
                target: action.to,
            };
        case "SEEK_DONE":
            return {
                ...state,
                shouldSeek: false,
                shouldPlay: state.shouldPlayAfterSeek ? true : state.shouldPlay,
                shouldPlayAfterSeek: false,
            };
        case "RESTORE_POSITION":
            return {
                ...state,
                shouldSeek: true,
                shouldRestore: false,
                target: action.to,
            };
        case "DONE":
            return {
                ...state,
                shouldPlay: false,
                shouldSeek: true,
                target: 0,
            };
        default:
            return state;
    }
}
