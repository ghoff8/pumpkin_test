import axios from 'axios';

import { BASE_API } from "../constants";
import { setAppClaims, setDecisionOptions, setPlans } from "../state";

function loadData() {
    return (dispatch) => {
        const claimsRequest = axios.get(`${BASE_API}/claims`)
        const optionsRequest = axios.get(`${BASE_API}/decision_options`)
        return axios.all([claimsRequest, optionsRequest])
            .then(axios.spread((...responses) => {
                dispatch(setAppClaims(responses[0].data.body.data[0]))
                dispatch(setDecisionOptions(responses[1].data.body.data))
            }))
    }
}

function loadPlansData() {
    return (dispatch) => {
        return axios.get(`${BASE_API}/plans`).then(response => {
            dispatch(setPlans(response.data.body.data))
        })
    }
}

export { loadData, loadPlansData }