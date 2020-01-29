import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main';
import Profiles from './pages/Profile';

const Routes = createAppContainer(
    createStackNavigator({
        Main,
        Profiles
    })
);

export default Routes;