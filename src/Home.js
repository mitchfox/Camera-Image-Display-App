import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';

export default class Home extends React.Component {

    static navigationOptions = {
        title: "Photo Clicker",
    }

    render() {

        let photo = this.props.navigation.getParam("photo", "empty");

        return (
            <View style={styles.container}>
                <Image
                    resizeMode="center"
                    style={styles.imagePlaceHolder}
                    source={
                        photo === "empty" ? require('./images/placeholder.png') : photo
                    }
                />
                <Button
                    title={"Take Photo"}
                    style={styles.takePhotoButton}
                    onPress={() => {
                        this.props.navigation.navigate("CameraScreen");
                    }}
                />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    imagePlaceHolder: {
        width: 300,
        height: 400,
        marginLeft: 40,
        marginRight: 40,
        alignItems: 'center',
        marginTop: 40,
        shadowColor: '#dbdbdb',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 5,
    },
    takePhotoButton: {
        paddingHorizontal: 25,
        paddingVertical: 15,
    },


});
