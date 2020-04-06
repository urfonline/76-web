const initialState = {
    selectedEpisode: null,
    shouldPlay: false,
    shouldSeek: false,
    audioState: "pending",
    elapsed: 0,
    duration: 0,
};

export default function playerReducer(state = initialState, action) {
    switch (action.type) {
        case "SET_EPISODE":
            return {
                ...state,
                selectedEpisode: action.episode,
                shouldPlay: false,
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
                elapsed: action.to,
            };
        case "SEEK_DONE":
            return {
                ...state,
                shouldSeek: false,
            };
        case "AUDIO_STATE_CHANGE":
            return {
                ...state,
                audioState: action.audioState,
            };
        case "AUDIO_TIME_UPDATE":
            return {
                ...state,
                elapsed: action.elapsed,
                duration: action.duration,
            };
        default:
            return state;
    }
}
