import React from 'react';
import { Row, Col, Card, Timeline, Icon } from 'antd';
import EchartsViews from './EchartsViews';
import EchartsProjects from './EchartsProjects';

import b1 from 'images/minren.jpg';
import b2 from 'images/zuozu.jpg';
import b3 from 'images/xiaoying.jpg';
import b4 from 'images/chutian.jpg';

import './index.less'

export default class index extends React.Component {
    render() {
        return (
            <div>
                <Row gutter={10}>
                    <Col span={24}>
                        <div className="cloud-box">
                            <Card className={'no-padding'}>
                                <EchartsProjects />
                            </Card>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className="cloud-box">
                            <Card>
                                <div className="pb-m">
                                    <h3>更新日志</h3>
                                </div>
                                <a className="card-tool"><Icon type="sync" /></a>
                                <Timeline>
                                    <Timeline.Item color="#108ee9">
                                        <p>项目完成</p>
                                    </Timeline.Item>
                                    <Timeline.Item color="green">重改结构,加入配置</Timeline.Item>
                                    <Timeline.Item color="green">引人HOC,优化性能</Timeline.Item>
                                    <Timeline.Item color="green">引人immutable</Timeline.Item>
                                    <Timeline.Item color="green">引人Saga,调整异步请求模式</Timeline.Item>
                                    <Timeline.Item color="green">更改store,加入debug功能</Timeline.Item>
                                    <Timeline.Item color="green">引入react-router-redux</Timeline.Item>
                                    <Timeline.Item color="green">引人Duck模式,项目易维护</Timeline.Item>
                                    <Timeline.Item color="green">引人Redux,Fetch</Timeline.Item>
                                    <Timeline.Item color="green">引人Less,React-Router</Timeline.Item>
                                    <Timeline.Item color="green">初始化项目</Timeline.Item>
                                </Timeline>
                            </Card>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className="cloud-box">
                            <Card>
                                <div className="pb-m">
                                    <h3>访问量统计</h3>
                                    <small>最近7天用户访问量</small>
                                </div>
                                <a className="card-tool"><Icon type="sync" /></a>
                                <EchartsViews />
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}