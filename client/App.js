import { SafeAreaProvider } from 'react-native-safe-area-context';

import AppNavigation from './src/navigation/appNavigation';
import CurrentLocationProvider from './src/utils/CurrentLocationProvider';
import RestaurantsProvider from './src/utils/RestaurantsProvider';
import { Provider } from 'react-redux';

import { store } from './src/store/store';

export default function App() {
    return (
        <Provider store={store}>
            <SafeAreaProvider>
                <RestaurantsProvider>
                    <CurrentLocationProvider>
                        <AppNavigation />
                    </CurrentLocationProvider>
                </RestaurantsProvider>
            </SafeAreaProvider>
        </Provider>
    );
}
