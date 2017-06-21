import React from 'react';
import { Route } from 'react-router-dom'
import { Layout } from 'antd'
import './content.less'
import index from 'pages/index'
import follow from 'pages/follow'
import Tools from 'pages/tools'
import Table from 'pages/table'
import Album from 'pages/album'
import Editor from 'pages/editor'
import TodoList from 'pages/todoList'

const { Content } = Layout

export default class Contents extends React.Component {
  render() {
    return (
      <Content className="content">
        <Route path="/index" component={index} />
        <Route path="/follow" component={follow} />
        <Route path="/tools" component={Tools} />
        <Route path="/table" component={Table} />
        <Route path="/album" component={Album} />
        <Route path="/editor" component={Editor} />
        <Route path="/todoList" component={TodoList} />
      </Content>
    );
  }
}