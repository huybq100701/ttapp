import AppNavigation from './src/navigation/appNavigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
    return (
        <SafeAreaProvider>
            <AppNavigation /> 
        </SafeAreaProvider>
       
    );
}