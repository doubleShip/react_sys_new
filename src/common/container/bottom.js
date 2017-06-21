import React from 'react'
import { Layout } from 'antd'
import './bottom.less'

const { Footer } = Layout

export default class Bottom extends React.Component {
    //constructor(props) {
    //    super(props)
    //}

    // 组件将要死亡时清除计时器，不清除也可以
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <Footer className="footer animated bounceInLeft">
                <span className="me">© 2017 管理系统</span>
            </Footer>
        );
    }
}