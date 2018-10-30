import React from 'react'
import PropTypes from 'prop-types'
import { View, ViewPropTypes, TextInput, StyleSheet } from 'react-native'


export default class InputText extends React.Component {
    static propTypes = {
        unmaskLabel: PropTypes.string,
        maskLabel: PropTypes.string,
        style: ViewPropTypes.style,
        onChangeText: PropTypes.func,
        value: PropTypes.string,
        placeholder: PropTypes.string
    }
    static defaultProps = {
        unmaskLabel: 'Show',
        maskLabel: 'Hide',
        placeholder: ''
    }

    state = {
        maskPassword: true,
        value: '',
        selection: { start: 0, end: 0 }

    }

    componentDidMount() {
        const { value } = this.props
        if (value !== undefined) {
            this.setState({ value })
        }
    }

    togglePasswordMask = () => {
        const { maskPassword } = this.state
        if (!maskPassword) {
            this.secureTextInputRef.focus()
        } else {
            this.textInputRef.focus()
        }
        this.setState({ maskPassword: !maskPassword })
    }

   

    onChangeText = value => {
       
    }

    render() {
        const { placeholder } = this.props
        const { maskPassword, selection, value } = this.state
        const showSecureText = Number(maskPassword)
        const showNotSecureText = 1 - showSecureText

    
        const { unmaskLabel, maskLabel, style, ...inputProps } = this.props
       

        return <View  style={styles.inputContainer }>
                <TextInput
                    underlineColorAndroid='transparent'
                    {...inputProps}
                    style={styles.input}
                    autoCapitalize="none"
                    secureTextEntry={false}
                    autoFocus={false}
                    blurOnSubmit={false}
                    onChangeText={this.onChangeText}
                    placeholder={placeholder}
                    ref={ref => this.textInputRef = ref}
                />
                 <View style={styles.bottomLine}></View>
            </View>
          

    }
}

const styles = StyleSheet.create({
    inputContainer: {
        backgroundColor: 'white',
        bottom: 5,
        left: 0,
        padding: 0,
        right: 50,
    },
    input: {
        fontSize: 20,
        color: '#696969',
        padding: 0,
    },

    bottomLine:{
        width:'100%',
        borderBottomColor: '#bbb',
        marginTop:10,
        borderBottomWidth: StyleSheet.hairlineWidth,
    }
})