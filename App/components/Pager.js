import { View, Text, Image} from 'react-native'
import React, {Component} from 'react'
import { IndicatorViewPager, PagerDotIndicator} from 'rn-viewpager'
import PropTypes from 'prop-types'

export default class Pager extends Component {

    static propTypes = {
        images: PropTypes.array
     }

     renderImage = image => {
         return <View key={image.url} style={{backgroundColor:'white'}}>
         <Image
style={{width: '100%', height: '100%'}}
source={{uri:image.url}}
/>  
    </View>
     }

    render() {

        const { images } = this.props

        return <View style={{flex:1, height:200}}>
                <IndicatorViewPager
                    style={{height:200}}
                    indicator={this._renderDotIndicator(images.length)}
                >
                    {images.map(this.renderImage)}
                    
                </IndicatorViewPager>

            
            </View>
    }

    _renderDotIndicator(count) {
        return <PagerDotIndicator pageCount={count} />
    }
    
    

}