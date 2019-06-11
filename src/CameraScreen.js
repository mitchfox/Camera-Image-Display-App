import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { FontAwesome } from '@expo/vector-icons';

export default class CameraScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasCameraPermission: null,
            type: Camera.Constants.Type.back,
            isFlashOn: Camera.Constants.FlashMode.off
        };
    }

    static navigationOption = {
        title: "Camera"
    };


    // Ask for Permission
    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermission: status === "granted"
        });
    }

    // Flip Camera
    flipCamera = () => {
        this.setState({
            type: 
            this.state.type === Camera.Constants.Type.back 
            ? Camera.Constants.Type.front
            : Camera.Constants.Type.back
        });
    }

    // Flashlight
    toggleFlashLight = () => {
        this.setState({
            isFlashOn: 
            this.state.isFlashOn === Camera.Constants.Type.FlashMode.off
            ? Camera.Constants.Type.FlashMode.on 
            : Camera.Constants.Type.FlashMode.off
        });
    }

    // Take Picture -> Send to Home Screen

    takePicture = async () => {
        if (this.camera) {
            let photo = await this.camera.takePictureAsync();
            this.props.navigation.navigate("Home", {photo: photo});
        }
    }
    


    render() {
        const { hasCameraPermission } = this.state;

        if (hasCameraPermission === null) {
            return (
            <View>
                <Text>Camera Loading...</Text>
            </View>
            )
        } else if (hasCameraPermission === false) {
            return (
            <View>
                <Text>Please Accept Camera Permission to use Camera</Text>
            </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <Camera
                    style={styles.cameraView}
                    type={this.state.type}
                    flashMode={this.state.isFlashOn}
                    ref={ref => {
                        this.camera = ref;
                    }}
                    >
                    <View style={styles.actionContainer}> 
                    <TouchableOpacity 
                    style={styles.iconHolder}
                    onPress={ () => {
                        this.toggleFlashLight()}}
                    >
                        <FontAwesome
                        name="flash"
                        size={35}
                        style={styles.icon}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconHolder}
                    onPress={ () => {
                        this.takePicture()}}>
                        <FontAwesome
                        name="circle"
                        size={35}
                        style={styles.icon}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconHolder}
                    onPress={ () => {
                        this.flipCamera()}}>
                        <FontAwesome
                        name="camera"
                        size={35}
                        style={styles.icon}
                        />
                    </TouchableOpacity>    
                    </View>
                    </Camera>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
    },
    actionContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent'
    },
    cameraView: {
        flex: 1
    },
    iconHolder: {
        flex: 1,
        alignItems: 'center',
        alignSelf: 'flex-end',
    },
    icon: {
        marginBottom: 10,
        color: '#FFF',
    }
});
