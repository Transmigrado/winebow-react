import { connect } from 'react-redux'
import { compose } from 'redux'
import Modal from '../components/Modal'
import * as module from '../modules/store'

const mapStateToProps = (state) => ({
    countries: module.getCountries(state)
})

const mapDispatchToProps = (dispatch) => ({
    onMount: () => {
        module.fetchDataThunk(dispatch)
    }
})

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(Modal)
