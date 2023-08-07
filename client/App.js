import { SafeAreaProvider } from 'react-native-safe-area-context';

import AppNavigation from './src/navigation/appNavigation';
import CurrentLocationProvider from './src/utils/CurrentLocationProvider';
import RestaurantsProvider from './src/utils/RestaurantsProvider';
import CategoryProvider from './src/utils/CategoryProvider';
import { Provider } from 'react-redux';
import { store } from './src/store/store';

export default function App() {
    return (
        <Provider store={store}>
            <SafeAreaProvider>
                <CategoryProvider>
                    <RestaurantsProvider>
                        <CurrentLocationProvider>
                            <AppNavigation />
                        </CurrentLocationProvider>
                    </RestaurantsProvider>
                </CategoryProvider>
            </SafeAreaProvider>
        </Provider>
    );
}
