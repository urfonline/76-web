const initialState = {
    selectedEpisode: null,
    shouldPlay: false,
    audioState: "pending",
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
        case "AUDIO_STATE_CHANGE":
            return {
                ...state,
                audioState: action.audioState,
            };
        default:
            return state;
    }
}
