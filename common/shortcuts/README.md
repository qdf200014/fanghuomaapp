
该方法只在安卓机型实现！！！

import { addShortcuts, removeAll } from '../../utils/shortcuts.js'

// js h5+ 模式创建
let res = addShortcuts([{
		id: 'test', //必填,不能重复
		icon: `file://${plus.io.convertLocalFileSystemURL( '/static/logo.png' )}`, //本地图片,要使用平台绝对路径
		path: '/pages/test/test', //选填,跳转的页面路径
		shortLabel: '', //选填
		title: 'test页' //必填
	},
	{
		id: 'home',
		icon: `file://${plus.io.convertLocalFileSystemURL( '/static/logo.png' )}`, //本地图片,要使用平台绝对路径
		path: '/pages/home/home',
		shortLabel: '',
		title: 'home页'
	}
]);

// 重新覆盖即为修改

// 移除
let res = removeAll();

返回值Boolean   [true success|false fail];

所有方法均为同步方法