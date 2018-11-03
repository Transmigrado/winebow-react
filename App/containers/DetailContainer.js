import { connect } from 'react-redux'
import { compose } from 'redux'
import * as module from '../modules/store'
import Detail from '../components/Detail'

const mapStateToProps = (state, ownProps) => ({
    regions: module.getRegionsFilter(state, ownProps.item),
    wineries: module.getWineries(state)
})

const mapDispatchToProps = dispatch => ({
    onMount: () => {
        
    }
})

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(Detail)
