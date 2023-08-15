import { SafeAreaProvider } from 'react-native-safe-area-context';

import AppNavigation from './src/navigation/appNavigation';
import CurrentLocationProvider from './src/utils/CurrentLocationProvider';
import CategoryProvider from './src/utils/CategoryProvider';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import { StripeProvider } from '@stripe/stripe-react-native';

export default function App() {
    return (
        <StripeProvider publishableKey='pk_test_51NfCJkBTNMQmQeonzS1LT7QN7KsJ3K2T7xOdvTS6N6krKXoO8vp1rNyR3j0rJ4xARPDir4IoYHPaC0A08FzjRu5s006z4ucj8X'>
            <Provider store={store}>
                <SafeAreaProvider>
                    <CategoryProvider>
                        <CurrentLocationProvider>
                            <AppNavigation />
                        </CurrentLocationProvider>
                    </CategoryProvider>
                </SafeAreaProvider>
            </Provider>
        </StripeProvider>
    );
}
