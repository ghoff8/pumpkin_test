import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import loadData from "../../thunks/load-data";
import { getAppClaims } from "../../selectors";

import styles from './home-page.css';

export default function HomePage() {
    const dispatch = useDispatch();
    const claims = useSelector(getAppClaims) || {};

    useEffect(() => {
        dispatch(loadData());
    }, []);

    return (
        <div className={styles.container}>
            <p>Customer: Paige Davenport</p>
            <p>PKN690800</p>
            <p>Claim: {claims.id}</p>

            <hr />

            <p><b>Claim Type:</b></p>
            <p>{claims.type}</p>

            <p><b>Claimed Amount:</b></p>
            <p>{claims.amount_claimed}</p>

            <p style={{ marginTop: '80px' }}><b>Line Items:</b></p>
            <table>
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Qty</th>
                        <th>Amount Claimed</th>
                    </tr>
                </thead>
                <tbody>
                {claims.line_items ? claims.line_items.map((item, index) => (
                    <tr key={index}>
                        <td>{item.type}</td>
                        <td>{item.quantity}</td>
                        <td>{item.amount_claimed}</td>
                    </tr>
                )) : null}
                </tbody>
            </table>
        </div>
    );
}