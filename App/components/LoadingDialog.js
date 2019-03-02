import React from 'react'
import PropTypes from 'prop-types'
import { View, ActivityIndicator, StyleSheet, Modal,Text } from 'react-native'


export default class LoadingDialog extends React.Component {
    static propTypes = {
        text: PropTypes.string
    }

    render() {
        return <Modal animationType="fade"
            transparent={true}
            presentationStyle='overFullScreen'
            onRequestClose={() => { }}><View style={styles.loading}>
                <ActivityIndicator size="large" color="#1D386D" />
                <Text style={{fontFamily: 'IBMPlexSans'}}>
                    {this.props.text}
                </Text>
            </View></Modal>
    }
}

const styles = StyleSheet.create({

    loading: {
        backgroundColor: 'rgba(255,255,255,0.75)',
        position: 'absolute',
        flex: 1,
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
})
