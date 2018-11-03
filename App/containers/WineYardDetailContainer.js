import { connect } from 'react-redux'
import { compose } from 'redux'
import * as module from '../modules/store'
import WineYardDetail from '../components/WineYardDetail'

const mapStateToProps = (state, ownProps) => ({
    wines: module.getWines(state)
})

const mapDispatchToProps = dispatch => ({
    onMount: () => {
        
    },
    addPath: path => {
       
    }
})

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(WineYardDetail)
