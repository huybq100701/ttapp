import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AppNavigation from './src/navigation/appNavigation';
import CurrentLocationProvider from './src/utils/CurrentLocationProvider';
import CategoryProvider from './src/utils/CategoryProvider';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import { StripeProvider } from '@stripe/stripe-react-native';

export default function App() {
    return (
        <Provider store={store}>
            <SafeAreaProvider>
                <CategoryProvider>
                    <CurrentLocationProvider>
                        <GestureHandlerRootView style={{ flex: 1 }}>
                            <AppNavigation />
                        </GestureHandlerRootView>
                    </CurrentLocationProvider>
                </CategoryProvider>
            </SafeAreaProvider>
        </Provider>
    );
}
