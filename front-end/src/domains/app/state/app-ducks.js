const SET_APP_CLAIMS = 'app/SET_APP_CLAIMS';
const SET_DECISION_OPTIONS = 'app/SET_DECISION_OPTIONS';
const SET_PLANS = 'app/SET_PLANS';

const appInitialState = {
    claims: null,
    options: null,
    plans: null
};

export default function appReducer(state = appInitialState, { payload, type } = {}) {
    switch (type) {
        case SET_APP_CLAIMS:
            return { ...state, claims: payload };

        case SET_DECISION_OPTIONS:
            return { ...state, options: payload}
        
        case SET_PLANS:
            return { ...state, plans: payload}

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

export function setDecisionOptions(payload) {
    return {
        type: SET_DECISION_OPTIONS,
        payload
    }
}
export function setPlans(payload) {
    return {
        type: SET_PLANS,
        payload
    }
}