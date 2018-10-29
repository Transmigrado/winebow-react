import { connect } from 'react-redux'
import { compose } from 'redux'
import * as module from '../modules/store'
import Detail from '../components/Detail'

const mapStateToProps = (state, ownProps) => ({
    regions: module.getRegions(state, ownProps.path[1])
})

const mapDispatchToProps = (dispatch) => ({
    onMount: () => {
        
    },
    addPath: path => {
       
    }
})

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(Detail)
