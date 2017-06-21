import React from 'react'
import { connect } from 'react-redux'
import { actions } from 'reducers/todoList'
import FilterLink from './filterLink'
import './index.less'

let nextTodoId = 0;

const mapStateToProps = state => {
    return {
        todoList: state.todoState.todo,
        visibilityFilter: state.todoState.filter,
    }
}

@connect(mapStateToProps)

export default class todoList extends React.Component {
    submit = (e) => {
        e.preventDefault()
        if(!this.input.value.trim()){
            return
        }
        this.props.dispatch(actions.addTodo({
            id: nextTodoId++,
            text: this.input.value,
        }))
        this.input.value = ''
    }

    render() {
        const todoList = this.props.todoList
        const visibilityFilter = this.props.visibilityFilter
        let todos = todoList
        if (visibilityFilter === 'SHOW_COMPLETED') {
            todos = todoList.filter(t => t.completed)
        } else if (visibilityFilter === 'SHOW_ACTIVE') {
            todos = todoList.filter(t => !t.completed)
        }
        console.log(todos)
        return (
            <div className="todo-box">
                <div className="todo-innerBox">
                    <div className="todo-tab">
                        <FilterLink filter="SHOW_ALL" name="全部任务"></FilterLink>
                        <FilterLink filter="SHOW_ACTIVE" name="待办任务"></FilterLink>
                        <FilterLink filter="SHOW_COMPLETED" name="已完成任务"></FilterLink>
                    </div>
                    <ul className="list-group">
                        {
                            todos.map(todo =>
                            <li className="todo-list_li" key={todo.id} style={{ textDecoration:todo.completed ? "line-through" : "none" }}>
                                <input type="checkbox" className="check-box" checked={todo.completed} onClick={ e => this.props.dispatch(actions.toggleTodo({
                                    id: todo.id,
                                }))} />
                                {todo.text}
                                <button className="todo-list_del" onClick={e => this.props.dispatch(actions.delTodo({
                                    id: todo.id,
                                })) }>删除</button>
                            </li>)
                        }
                    </ul>
                    <form onSubmit={this.submit} className="todo-add">
                        <input placeholder="你想做点什么" ref={r =>this.input = r} className="todo-input" />
                        <button type="submit" className="todo-btn">添加任务</button>
                    </form>
                </div>
            </div>
        )
    }
}