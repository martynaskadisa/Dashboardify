import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'

import { ValidationAPI } from 'api'
import { ModalsActions, DashboardsActions } from 'actions'

class CreateDashboardModal extends React.Component {
  constructor () {
    super()

    this.state = {
      nameError: ''
    }

    this.handleClose = this.handleClose.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleCreateDashboard = this.handleCreateDashboard.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  handleKeyPress (e) {
    if (e.key === 'Enter') {
      this.handleCreateDashboard()
    }
  }

  handleCreateDashboard () {
    let { dispatch } = this.props
    let { value: name } = this.refs.name.input

    let validation = ValidationAPI.validateName(name)

    if (validation.length < 1) {
      dispatch(DashboardsActions.createDashboard(name))
      this.handleClose()
    } else {
      this.setState({nameError: validation})
    }
  }

  handleNameChange () {
    let { value: name } = this.refs.name.input

    this.setState({
      nameError: ValidationAPI.validateName(name)
    })
  }

  handleClose () {
    let { dispatch } = this.props

    dispatch(ModalsActions.closeCreateDashboardModal())
  }

  render () {
    const actions = [
      <FlatButton
        label='Cancel'
        primary={false}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label='Create'
        primary
        onTouchTap={this.handleCreateDashboard}
      />
    ]

    let { open } = this.props

    return (
      <Dialog
        title='Create a new dashboard'
        actions={actions}
        modal={false}
        open={open}
        onRequestClose={this.handleClose}
      >
        <TextField
          floatingLabelText='Dashboard name'
          hintText='E. g. Rebel news'
          ref='name'
          fullWidth
          errorText={this.state.nameError}
          onChange={this.handleNameChange}
          onKeyPress={this.handleKeyPress}
        />
      </Dialog>
    )
  }
}

CreateDashboardModal.propTypes = {
  open: PropTypes.bool,
  dispatch: PropTypes.func
}

export default connect(
  (state) => state.modals.createDashboardModal
)(CreateDashboardModal)
