import axios from 'axios';

import { useEffect, useState, forwardRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BASE_API } from "../../constants";

import { loadData } from "../../thunks/load-data";
import { getAppClaims, getOptions } from "../../selectors";
import { Snackbar, Button, Menu, MenuItem } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import Fade from '@mui/material/Fade';
import { grey, blue } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


import styles from './home-page.css';

const theme = createTheme({
    palette: {
      primary: {
        main: grey[900],
      },
      secondary: {
        main: blue[500],
      },
    }
  });

export default function HomePage() {
    const dispatch = useDispatch();
    const claims = useSelector(getAppClaims) || {};
    const options = useSelector(getOptions) || [];

    const [menuOpen, setMenuOpen] = useState(null)
    const [snackbarShow, setSnackbarShow] = useState(false)
    const [selectedMenu, setSelectedMenu] = useState(null)
    const [menuSelections, setMenuSelections] = useState([])

    const isMenuOpen = Boolean(menuOpen)

    useEffect(() => {
        dispatch(loadData())
    }, []);

    useEffect(() => {
        if (Object.entries(claims).length !== 0) {
            const newSelections = []
            claims.line_items.map((obj, i) => {
                newSelections.push({id: i, claim_type: obj.claim_line_item_type, decision: obj.decision})
            })
            setMenuSelections(newSelections)
        }
    }, [claims])

    const handleMenuOpen = (event, type) => {
        setSelectedMenu(type)
        setMenuOpen(event.currentTarget);
    }

    const handleClose = (event) => {
        const selectedOption = event.target.innerText
        menuSelections.map((claimRow, index) => {
            if (claimRow.claim_type === selectedMenu) {
                let selections = [...menuSelections]
                let relevantSelection = {...selections[index]}
                relevantSelection.decision = selectedOption
                selections[index] = relevantSelection
                setMenuSelections(selections)
            }
        })
        setMenuOpen(null);
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setSnackbarShow(false);
      };
    

    const saveLineItemDecisions = () => {
        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        return axios.post(`${BASE_API}/decision_options/set`, menuSelections, { headers })
          .then((res) => {
              if (res.status == 200) {
                setSnackbarShow(true);
              }
          })
    }

    const Alert = forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
      });

    return (
        <div className={styles.container}>
            <div className={styles.home_page_info_container}>
                <div>
                    <p><b>Customer</b>: Paige Davenport</p>
                    <p>PKN690800</p>
                    <p><b>Claim</b>: {claims.id}</p>
                </div>
                <Button
                    style={{float: 'right', margin: 'auto 0'}}
                    component={Link}
                    to="/utilization"
                    variant='contained'
                    endIcon={<ArrowForwardIosIcon/>}
                    >
                        Utilization
                </Button>
            </div>
            <hr />
            <div className={styles.home_page_claim_info}>
                <p style={{paddingRight: '10px'}}><b>Claim Type:</b> {claims.claim_type}</p>
                <p><b>Claimed Amount:</b> {'$' + claims.amount_claimed}</p>
            </div>
            <p style={{ marginTop: '80px' }}><b>Line Items:</b></p>
            <ThemeProvider theme={theme}>
            <div className={styles.table_container}>
                <table style={{borderCollapse: 'collapse'}}>
                    <thead>
                        <tr>
                            <th className={styles.home_page_th}>Type</th>
                            <th className={styles.home_page_th}>Qty</th>
                            <th className={styles.home_page_th}>Decision</th>
                            <th className={styles.home_page_th}>Amount Claimed</th>
                        </tr>
                    </thead>
                    <tbody>
                    {claims.line_items && options !== [] ? claims.line_items.map((item, index) => (
                        <tr key={index} id={item.claim_line_item_type}>
                            <td className={styles.home_page_td}>{item.claim_line_item_type}</td>
                            <td className={styles.home_page_td}>{item.quantity}</td>
                            <td className={styles.decision_cell}>
                                <Button
                                    color="primary"
                                    id="basic-button"
                                    size="big"
                                    style={{width: '100%', justifyContent: 'space-between'}}
                                    onClick={(event) => handleMenuOpen(event, item.claim_line_item_type)}
                                    endIcon={<KeyboardArrowDownIcon />}
                                    >
                                <span>{menuSelections.map((select) => {
                                    if (select.claim_type === item.claim_line_item_type) {
                                        return select.decision
                                    }
                                })}</span>
                                </Button>
                                <Menu
                                    anchorEl={menuOpen}
                                    open={isMenuOpen}
                                    TransitionComponent={Fade}
                                >
                                    {options.map((option, i) => {
                                        return <MenuItem 
                                            key={i}
                                            onClick={handleClose}>
                                                {option.option}
                                            </MenuItem>
                                    })}
                                </Menu>
                            </td>
                            <td className={styles.home_page_td}>{'$'+item.amount_claimed}</td>
                        </tr>
                    )) : null}
                    </tbody>
                </table>
                
                <Button variant="contained"
                    color="secondary"
                    style={{float: 'right', margin: '10px 0'}}
                    onClick={saveLineItemDecisions}>SAVE</Button>
            </div>
            </ThemeProvider>
            <Snackbar
                open={snackbarShow}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    Decisions successfully updated!
                </Alert>
            </Snackbar>
        </div>
    );
}