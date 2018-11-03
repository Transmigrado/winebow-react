import { connect } from 'react-redux'
import { compose } from 'redux'
import * as module from '../modules/store'
import WineYardDetail from '../components/WineYardDetail'

const mapStateToProps = (state, ownProps) => ({
    wines: module.getWines(state, ownProps.item)
})

const mapDispatchToProps = dispatch => ({
    onMount: () => {
        
    }
})

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(WineYardDetail)
