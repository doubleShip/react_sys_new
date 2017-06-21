export const allMenu = [
  {
    name: '首页',
    url: 'index',
    icon: 'home',
  }, {
    name: '表单模块',
    url: 'forms',
    icon: 'bars',
    children: [
      { name: 'Table', url: 'table' },
    ]
  }, {
    name: '工具模块',
    url: 'tool',
    icon: 'tool',
    children: [
      { name: 'Tab切换', url: 'tools' },
      { name: '富文本编辑器', url: 'editor' },
      { name: '待办事项', url: 'todoList' },
    ],
  }, {
    name: '画廊模块',
    url: 'pic',
    icon: 'edit',
    children: [
      { name: '时光相片', url: 'album' },
    ],
  }, {
    name: '动画',
    url: 'follow',
    icon: 'heart-o',
  }]