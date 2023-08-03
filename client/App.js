import { SafeAreaProvider } from 'react-native-safe-area-context';

import AppNavigation from './src/navigation/appNavigation';
import CurrentLocationProvider from './src/utils/CurrentLocationProvider';
import RestaurantsProvider from './src/utils/RestaurantsProvider';
import CategoryProvider from './src/utils/CategoryProvider';

export default function App() {
    return (
        <SafeAreaProvider>
            <CategoryProvider>
                <RestaurantsProvider>
                    <CurrentLocationProvider>
                        <AppNavigation />
                    </CurrentLocationProvider>
                </RestaurantsProvider>
            </CategoryProvider>
        </SafeAreaProvider>
    );
}
