import { useEffect } from 'react';
import { useDispatch, useSelector} from "react-redux";
import { Link } from "react-router-dom";
import { getAppClaims, getPlans } from '../../selectors';
import { loadPlansData, loadData } from "../../thunks/load-data";
import { Button} from '@mui/material';

import styles from './utilization-page.css';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export default function UtilizationPage() {
    const dispatch = useDispatch();
    const plans = useSelector(getPlans) || [];
    const claims = useSelector(getAppClaims) || {};

    useEffect(() => {
        dispatch(loadPlansData())
        dispatch(loadData())
    }, []);

    return (
        <div className={styles.container}>
            
            <h1 className={styles.profile_heading}>Bella's Profile</h1>
            <div className={styles.profile_info}>
                <div className={styles.profile_heading_info}>
                    <p style={{padding: '0 10px'}}><b>Birthday</b>: 6/15/2018</p>
                    <p style={{padding: '0 10px'}}><b>Weight</b>: 16 lbs.</p>
                </div>
                <Button
                        style={{margin: 'auto 0'}}
                        component={Link}
                        to="/"
                        variant='contained'
                        startIcon={<ArrowBackIosIcon/>}
                        >
                        Home
                    </Button>
            </div>
            <hr />
            <br/>
            <div className={styles.utilization_container}>
                <h2 className={styles.profile_heading}>Track Benefits</h2>
                {plans.length !== 0 ?
                <table className={styles.utilization_table}>
                    <thead >
                        <tr>
                            <th className={styles.utilization_table_th}>Preventative Essentials</th>
                            <th className={styles.utilization_table_th}>Benefits</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className={styles.utilization_table_td}>Vaccines</td>
                            <td className={styles.utilization_table_td}>
                                {plans[0].vaccine_util + ' of ' + plans[0].vaccines}
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.utilization_table_td}>Wellness Exams</td>
                            <td className={styles.utilization_table_td}>
                                {plans[0].wellness_exam_util + ' of ' + plans[0].wellness_exam}
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.utilization_table_td}>Blood Tests</td>
                            <td className={styles.utilization_table_td}>
                                {plans[0].blood_test_util + ' of ' + plans[0].blood_test}
                            </td>
                        </tr>
                    </tbody>
                </table> : null}
            </div>
        </div>
    );
}