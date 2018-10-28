import { View, Text, Image} from 'react-native';
import React, {Component} from 'react';
import { IndicatorViewPager, PagerDotIndicator} from 'rn-viewpager';

export default class Pager extends Component {
    render() {
        return (
            <View style={{flex:1}}>
                <IndicatorViewPager
                    style={{height:200}}
                    indicator={this._renderDotIndicator()}
                >
                    <View style={{backgroundColor:'cadetblue'}}>
                         <Image
                style={{width: '100%', height: '100%'}}
                source={require('./assets/chile.jpg')}
                />  
                    </View>
                    <View style={{backgroundColor:'cornflowerblue'}}>
                    <Image
                style={{width: '100%', height: '100%'}}
                source={require('./assets/chile.jpg')}
                />  
                    </View>
                    <View style={{backgroundColor:'#1AA094'}}>
                    <Image
                style={{width: '100%', height: '100%'}}
                source={require('./assets/chile.jpg')}
                />  
                    </View>
                </IndicatorViewPager>

            
            </View>
        );
    }

    _renderDotIndicator() {
        return <PagerDotIndicator pageCount={3} />;
    }
    
    

}