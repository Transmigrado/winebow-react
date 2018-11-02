import { connect } from 'react-redux'
import { compose } from 'redux'
import * as module from '../modules/store'
import RegionDetail from '../components/RegionDetail'

const mapStateToProps = (state, ownProps) => ({
    wineries: module.getWineries(state)
})

const mapDispatchToProps = dispatch => ({
    onMount: () => {
        
    },
    addPath: path => {
       
    }
})

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(RegionDetail)
