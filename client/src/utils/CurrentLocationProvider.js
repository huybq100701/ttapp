import React, { useState } from 'react';
import { currentLocationContext } from './Context';

export default function CurrentLocationProvider({ children }) {
    const initialCurrentLocation = {
        streetName: 'Hanoi',
        gps: {
            latitude: 21.019835,
            longitude: -254.215683,
        },
    };

    const [currentLocation, setCurrentLocation] = useState(initialCurrentLocation);

    return <currentLocationContext.Provider value={currentLocation}>{children}</currentLocationContext.Provider>;
}
