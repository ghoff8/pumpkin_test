import { Redirect, Route, Switch } from 'react-router-dom';
import HomePage from "../../view/home-page/home-page";

function MainSwitch() {
    return (
        <Switch>
            <Route
                path={'/'}
                render={() => <HomePage />}
            />

            <Redirect to={'/'} />
        </Switch>
    );
}

export default MainSwitch;
