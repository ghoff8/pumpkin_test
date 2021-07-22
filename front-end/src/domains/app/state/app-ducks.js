const SET_APP_CLAIMS = 'app/SET_APP_CLAIMS';

const appInitialState = {
    claims: null,
};

export default function appReducer(state = appInitialState, { payload, type } = {}) {
    switch (type) {
        case SET_APP_CLAIMS:
            return { ...state, claims: payload };

        default:
            return state;
    }
}

export function setAppClaims(payload) {
    return {
        type: SET_APP_CLAIMS,
        payload,
    };
}