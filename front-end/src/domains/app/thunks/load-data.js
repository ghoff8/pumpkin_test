import axios from 'axios';

import { BASE_API } from "../constants";
import { setAppClaims } from "../state";

const HARD_CODED_DATA = {
    type: 'prevent',
    id: 12620,
    amount_claimed: 800,
    line_items: [
        {
            type: 'Vaccine',
            quantity: 3,
            amount_claimed: 200,
        },
        {
            type: 'Wellness Exams',
            quantity: 1,
            amount_claimed: 200,
        },
        {
            type: 'Blood Test',
            quantity: 2,
            amount_claimed: 200,
        },
        {
            type: 'Fecal "Poop" Test',
            quantity: 1,
            amount_claimed: 200,
        }
    ]
};

export default function loadData() {
    return (dispatch) => {
        return axios
            .get(`${BASE_API}/claims`)
            .then((data) => dispatch(setAppClaims(data)));
            // .catch(() => {
            //     dispatch(setAppClaims(some error?));
            // });
        // dispatch(setAppClaims(HARD_CODED_DATA));
    }
}