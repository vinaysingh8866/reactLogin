import React, { Component } from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'

export class LoginScreen extends Component {


    signInWithGoogleAsync = async () => {
        try {
            const result = await Google.logInAsync({
                behavior: 'web',
                //androidClientId: 'YOUR_CLIENT_ID_HERE',
                iosClientId: '532640532418-8etm53k0oi3t8p5cv59jmlulgneb4is2.apps.googleusercontent.com',
                scopes: ['profile', 'email'],
            });

            if (result.type === 'success') {
                return result.accessToken;
            } else {
                return { cancelled: true };
            }
        } catch (e) {
            return { error: true };
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <Button
                    title='Sign In With Google'
                    onPress={() => this.signInWithGoogleAsync()} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default LoginScreen
