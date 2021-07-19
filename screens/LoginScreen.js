import React, { Component } from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'
import * as Google from 'expo-google-app-auth';
import firebase from 'firebase';
export class LoginScreen extends Component {

    isUserEqual = (googleUser, firebaseUser) => {
        if (firebaseUser) {
            var providerData = firebaseUser.providerData;
            for (var i = 0; i < providerData.length; i++) {
                if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
                    providerData[i].uid === googleUser.getBasicProfile().getId()) {
                    return true;
                }
            }
        }
        return false;
    }

    onSignIn = (googleUser) => {
        console.log('Google Auth Response', googleUser);
        var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
            unsubscribe();
            if (!this.isUserEqual(googleUser, firebaseUser)) {
                var credential = firebase.auth.GoogleAuthProvider.credential(
                    googleUser.idToken, googleUser.accessToken);
                firebase.auth().signInWithCredential(credential)
                    .then(res = (result) => {

                        firebase.database()
                            .ref('/users/' + result.user.uid)
                            .set({
                                gmail: result.user.email,
                                profilePicture: result.additionalUserInfo.ptofile.picture
                            })
                    })
                    .catch((error) => {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        var email = error.email;
                        var credential = error.credential;
                    });
            
                } else {

                console.log('User already signed-in Firebase.');
            
            }
        });
    }

    signInWithGoogleAsync = async () => {
        try {
            const result = await Google.logInAsync({
                behavior: 'web',
                //androidClientId: 'YOUR_CLIENT_ID_HERE',
                iosClientId: '532640532418-8etm53k0oi3t8p5cv59jmlulgneb4is2.apps.googleusercontent.com',
                scopes: ['profile', 'email'],
            });

            if (result.type === 'success') {


                this.onSignIn(result)


                return result.accessToken;
            } else {
                return { cancelled: true };
            }
        } catch (e) {
            alert(e)
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
