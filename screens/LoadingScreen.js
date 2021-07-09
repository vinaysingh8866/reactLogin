import React, { Component } from 'react'
import { Text, View, ActivityIndicator } from 'react-native'
import firebase from 'firebase'

export class LoadingScreen extends Component {



    componentDidMount() {
        this.checkIfLoggedIn();
    }

    checkIfLoggedIn = () => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {

                this.props.navigation.navigate('DashboardScreen')

            } else {

                this.props.navigation.navigate('LoginScreen')

            }
        }.bind(this))
    }

    render() {
        return (
            <View>
                <ActivityIndicator />
            </View>
        )
    }
}

export default LoadingScreen
