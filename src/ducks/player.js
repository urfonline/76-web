const initialState = {
    selectedEpisode: null,
    shouldPlay: false,
    shouldSeek: false,
    shouldRestore: true,
    audioState: "pending",
    target: 0,
};

export default function playerReducer(state = initialState, action) {
    switch (action.type) {
        case "SET_EPISODE":
            return {
                ...state,
                selectedEpisode: action.episode,
                shouldPlay: false,
                shouldRestore: true,
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
            };
        case "RESTORE_POSITION":
            return {
                ...state,
                shouldSeek: true,
                shouldRestore: false,
                target: action.to,
            };
        case "AUDIO_STATE_CHANGE":
            return {
                ...state,
                audioState: action.audioState,
            };
        default:
            return state;
    }
}
