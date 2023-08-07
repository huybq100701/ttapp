import React, { useState, useEffect, useRef, Fragment } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Button } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

import ButtonCamera from '../utils/button';

export default function CameraScreen({ navigation, route }) {
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [image, setImage] = useState(null);
    const [type, setType] = useState(CameraType.back);
    const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
    // const [mediaType, setMediaType] = useState(Camera.Constants.MediaType.photo);
    const cameraRef = useRef(null);
    const { setImageUri } = route.params;

    useEffect(() => {
        (async () => {
            MediaLibrary.requestPermissionsAsync();
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraStatus.status === 'granted');
        })();
    });

    const takePicture = async () => {
        if (cameraRef) {
            try {
                const data = await cameraRef.current.takePictureAsync();
                setImage(data.uri);
            } catch (error) {
                console.log(error);
            }
        }
    };

    const savePicture = async () => {
        if (image) {
            try {
                setImageUri(image);
                navigation.goBack();
            } catch (error) {
                console.log(error);
            }
        }
    };

    if (hasCameraPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={[styles.container]}>
            {!image ? (
                <Fragment>
                    <View style={styles.head}></View>
                    <Camera style={styles.camera} type={type} flashMode={flashMode} ref={cameraRef}></Camera>
                </Fragment>
            ) : (
                <Fragment>
                    <View style={styles.head}></View>
                    <Image source={{ uri: image }} style={styles.camera} />
                </Fragment>
            )}
            <View style={styles.takePicture}>
                {image ? (
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: '100%',
                        }}
                    >
                        <ButtonCamera title={'Re-take'} icon="retweet" onPress={() => setImage(null)} />
                        <ButtonCamera title={'Save'} icon="check" onPress={savePicture} />
                    </View>
                ) : (
                    <>
                        <ButtonCamera
                            icon="retweet"
                            onPress={() => {
                                setType(type === CameraType.back ? CameraType.front : CameraType.back);
                            }}
                        />
                        <TouchableOpacity style={styles.take} onPress={takePicture}></TouchableOpacity>
                        <ButtonCamera
                            color={flashMode === Camera.Constants.FlashMode.off ? 'gray' : '#f1f1f1'}
                            icon="flash"
                            onPress={() => {
                                setFlashMode(
                                    flashMode === Camera.Constants.FlashMode.off
                                        ? Camera.Constants.FlashMode.on
                                        : Camera.Constants.FlashMode.off,
                                );
                            }}
                        />
                    </>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    camera: {
        flex: 1,
        justifyContent: 'flex-end',
        width: '100%',
        justifyContent: 'flex-start',
    },
    takePicture: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: '#000',
        alignItems: 'center',
        paddingTop: 30,
        paddingBottom: 80,
        paddingHorizontal: 40,
    },
    take: {
        width: 70,
        height: 70,
        borderRadius: 70,
        backgroundColor: '#fff',
        shadowColor: '#ccc',
    },
    head: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 80,
        paddingBottom: 30,
        paddingHorizontal: 30,
        backgroundColor: '#000',
    },
});
