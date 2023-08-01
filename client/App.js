import { SafeAreaProvider } from 'react-native-safe-area-context';

import AppNavigation from './src/navigation/appNavigation';
import CurrentLocationProvider from './src/utils/CurrentLocationProvider';
import RestaurantsProvider from './src/utils/RestaurantsProvider';

export default function App() {
    return (
        <SafeAreaProvider>
            <RestaurantsProvider>
                <CurrentLocationProvider>
                    <AppNavigation />
                </CurrentLocationProvider>
            </RestaurantsProvider>
            {/* <CurrentLocationProvider>
                <AppNavigation />
            </CurrentLocationProvider> */}
        </SafeAreaProvider>
    );
}
