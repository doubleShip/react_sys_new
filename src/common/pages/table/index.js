import React from 'react'
import { Button, message, Modal } from 'antd'
import SearchBar from 'components/searchbar'
import Table from 'components/table'
import { FormModal } from 'components/modalForm'
import { connect } from 'react-redux'
import { fetchData } from 'reducers/fetch'
import { TYPES as TT} from 'reducers/table'
import pureRender from 'hoc/pureRender'
import { HTTP_SERVER } from 'config'
import './index.less'
import moment from 'moment'
import {
    musicKindList,
    languageKindList,
    publishCountry
} from '../../utils/config'

require('es6-promise').polyfill();

const confirm = Modal.confirm;

const mapStateToProps = state => {
    return {
        song_list : state.tableState.get('song_list'),
        searchFields : state.tableState.searchFields,
    }
};
//
//const mapDispatchToProps = dispatch => ({
//	fetchData: bindActionCreators(fetchData, dispatch)
//});

@connect(mapStateToProps)
@pureRender

export default class Music extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            item: {},
            modalShow: false,
            modalShowEdit: false,
        }
        this.add = this.add.bind(this)
        this.onOk = this.onOk.bind(this)
        this.onCancel = this.onCancel.bind(this)
        this.onOkEdit = this.onOkEdit.bind(this)
        this.onCancelEdit = this.onCancelEdit.bind(this)
        this.progressData = this.progressData.bind(this)
        this.getTableData = this.getTableData.bind(this)
        this.onSearch = this.onSearch.bind(this)
    }

    // 处理表数据
    progressData = () => {
        const { song_list, searchFields } = this.props;

        if(song_list.size === 0) {
            return [];
        }
        const songArray = [];
        let songList = song_list.toJS();
        if (searchFields && searchFields.country) { // 发行国家搜索
            songList = songList.filter(ele => ele.country === publishCountry.find(t => t.value === parseInt(searchFields.country)).mean)
        }
        if (searchFields && searchFields.language) { // 歌曲语种搜索
            songList = songList.filter(ele => ele.language === languageKindList.find(t => t.value === parseInt(searchFields.language)).mean)
        }
        if (searchFields && searchFields.start) { // 发行时间段收索
            songList = songList.filter(ele => moment(ele.publishtime) >= moment(searchFields.start) && moment(ele.publishtime) <= moment(searchFields.end))
        }

        for (let i = 0; i < songList.length; i++) {
            songArray.push({
                title: songList[i].title,
                author: songList[i].author,
                country: songList[i].country,
                language: songList[i].language,
                publishtime: songList[i].publishtime,
            })
        }
        return songArray;
    }

    getTableData(typeId) {
        this.props.dispatch(fetchData({
            url : HTTP_SERVER.getMusicList.url.formatHttpUrl({typeId:typeId}),
            method : HTTP_SERVER.getMusicList.method,
            //successInfo : "信息请求成功",
            showLoading : true,
            successAction : TT.SET_MUSIC_LIST
        }))
    }

    componentDidUpdate() {
    }

    componentDidMount() {
        this.getTableData(2)// 默认是热歌版
    }

    onSearch = (searchFields) => {
        const typeId = searchFields.type ? searchFields.type : 2;
        this.getTableData(typeId)
    }

    searchFields = () => {
        return [{
            title: '类型',
            key: 'type',
            type: 'select',
            defaultValue: 2,
            onChange: (value) => this.getTableData(value),
            items: () => musicKindList.map(ele => ({
                value: ele.value,
                mean: ele.mean
            })),
        }, {
            title: '发行国家',
            key: 'country',
            type: 'select',
            defaultValue: '全部',
            items: () => [{
                value: 0,
                mean: '全部'
            }].concat(publishCountry.map(ele => ({
                value: ele.value,
                mean: ele.mean
            }))),
        }, {
            title: '歌曲语种',
            key: 'language',
            type: 'select',
            defaultValue: '全部',
            items: () => [{
                value: 0,
                mean: '全部'
            }].concat(languageKindList.map(ele => ({
                value: ele.value,
                mean: ele.mean
            }))),
        }, {
            title: '发行时间段',
            key: ['start', 'end'],
            type: 'rangePicker',
            width: 200
        }]
    }

    tableHeader = () => {
        return [{
            dataIndex: 'title',
            title: '歌曲名',
            width: 200,
            // render: (text, record) => {
            // }
        }, {
            dataIndex: 'author',
            title: '歌手',
            width: 200,
        }, {
            dataIndex: 'country',
            title: '发行国家',
            width: 200,
        }, {
            dataIndex: 'language',
            title: '语种',
            width: 200,
        }, {
            dataIndex: 'publishtime',
            title: '发行时间',
            width: 200,
        }, ]
    }

    add() {
        this.setState({
            modalShow: true
        })
    }

    onOk(param) {
        message.success('添加成功')
        this.onCancel()
    }

    onCancel() {
        this.setState({
            modalShow: false
        })
    }

    onOkEdit(param) {
        this.setState({
            modalShowEdit: false
        })
        message.success('编辑成功')
    }

    onCancelEdit() {
        this.setState({
            modalShowEdit: false
        })
    }

    tableAction = (actionKey, item) => {
        if (actionKey === 'edit') {
            this.setState({
                item: item,
                modalShowEdit: true
            })
        } else if (actionKey === 'delete') {
            confirm({
                title: '提示',
                content: '确定删除吗',
                onOk: () => {
                    message.success('删除成功')
                },
                onCancel() {}
            })
        }
    }

    fields = () => {
        return [{
            label: '歌曲名',
            type: 'input',
            name: 'title',
            width: 100,
            options: {
                rules: [{
                    required: true,
                    message: '歌曲名必输!',
                }]
            }
        }, {
            label: '歌手名',
            type: 'input',
            name: 'author',
            width: 100,
            options: {
                rules: [{
                    required: true,
                    message: '歌手必输!',
                }]
            }
        }, {
            label: '发行国家',
            type: 'select',
            name: 'country',
            items: () => publishCountry.map(ele => ({
                key: ele.value,
                value: ele.mean
            })),
            options: {
                rules: [{
                    required: true,
                    message: '发行国家必输!',
                }]
            }
        }, {
            label: '歌曲语种',
            type: 'select',
            name: 'language',
            items: () => languageKindList.map(ele => ({
                key: ele.value,
                value: ele.mean
            })),
            options: {
                rules: [{
                    required: true,
                    message: '语种必输!',
                }]
            }
        }, {
            label: '发行时间',
            type: 'datetime',
            name: 'publishTime',
            options: {
                rules: [{
                    required: true,
                    message: '发行时间必输!',
                }]
            }
        }]
    }

    fieldsEdit = () => {
        const item = this.state.item
        return [{
            label: '歌曲名',
            type: 'input',
            name: 'title',
            items: item.title,
            options: {
                initialValue: item.title,
                rules: [{
                    required: true,
                    message: '歌曲名必输!',
                }]
            }
        }, {
            label: '歌手名',
            type: 'input',
            name: 'author',
            options: {
                initialValue: item.author,
                rules: [{
                    required: true,
                    message: '歌手必输!',
                }]
            }
        }, {
            label: '发行国家',
            type: 'select',
            name: 'country',
            items: () => publishCountry.map(ele => ({
                key: ele.value,
                value: ele.mean
            })),
            options: {
                initialValue: item.country,
                rules: [{
                    required: true,
                    message: '发行国家必输!',
                }]
            }
        }, {
            label: '歌曲语种',
            type: 'select',
            name: 'language',
            items: () => languageKindList.map(ele => ({
                key: ele.value,
                value: ele.mean
            })),
            options: {
                initialValue: item.language,
                rules: [{
                    required: true,
                    message: '语种必输!',
                }]
            }
        }, {
            label: '发行时间',
            type: 'datetime',
            name: 'publishTime',
            options: {
                initialValue: moment(item.publishtime),
                rules: [{
                    required: true,
                    message: '发行时间必输!',
                }]
            }
        }]
    }

    render() {
        return (
            <div id="wrap">
                <SearchBar
                    onSubmit={this.onSearch}
                    fields={this.searchFields()}
                />
                <div className="tableBox">
                    <Button onClick={this.add} className="addButton">添加</Button>
                    <div style={{ paddingTop: 43 }}>
                        <Table
                            onCtrlClick={ this.tableAction }
                            pagination={ true }
                            pageSize={10}
                            header={ this.tableHeader() }
                            data={ this.progressData() }
                            action={row => [{
                                key: 'edit',
                                name: '修改',
                                color: 'blue',
                                icon: 'edit',
                            }, {
                                key: 'delete',
                                name: '删除',
                                color: 'red',
                                icon: 'delete'
                            }]}
                            scroll={{y: 385 }}
                        />
                    </div>
                </div>
                <FormModal
                    modalKey="add"
                    visible={this.state.modalShow}
                    title="添加音乐"
                    fields={this.fields()}
                    onOk={this.onOk}
                    onCancel={this.onCancel}
                    okText="保存"
                />
                <FormModal
                    modalKey="Edit"
                    visible={this.state.modalShowEdit}
                    title="修改音乐"
                    fields={this.fieldsEdit()}
                    onOk={this.onOkEdit}
                    onCancel={this.onCancelEdit}
                    okText="保存"
                />
            </div>
        )
    }
}