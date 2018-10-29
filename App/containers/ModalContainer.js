import { connect } from 'react-redux'
import { compose } from 'redux'
import Modal from '../components/Modal'
import * as module from '../modules/store'

const mapStateToProps = (state) => ({
    countries: module.getCountries(state),
    path: module.getPath(state)
})

const mapDispatchToProps = (dispatch) => ({
    onMount: () => {
        module.fetchDataThunk(dispatch)
    },
    addPath: path => {
        module.addPath(dispatch, path)
    }
})

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(Modal)
