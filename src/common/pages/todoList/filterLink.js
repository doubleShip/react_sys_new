import React from 'react'
import { connect } from 'react-redux'
import { actions } from 'reducers/todoList'
import './index.less'

const mapStateToProps = state => {
    return {
        visibilityFilter: state.todoState.filter,

    }
}

@connect(mapStateToProps)

export default class FilterLink extends React.Component {
  onClick = () => {
    this.props.dispatch(actions.setVisibility(this.props.filter))
  }

  render() {
    const { name,filter } = this.props
    const active = this.props.visibilityFilter === filter
    return (
      <div className="todo-tab_item">
        <a style={{ color: active? '#f01414' : '#4d555d' }} onClick={this.onClick}>{name}</a>
      </div>
    )
  }
}