// 引入dayjs 过滤时间
const dayjs = require('dayjs')
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)
require('dayjs/locale/zh-cn')

let useDayjs = {
	// 只友好化显示24小时内的日期
	formatRelative24(time) {
		if (!time) {
			return null
		}
		if (dayjs(time).isAfter(dayjs().subtract(24, 'hour'))) {
			return dayjs(time).locale('zh-cn').fromNow()
		} else {
			return dayjs(time).format('YYYY/MM/DD HH:mm')
		}
	},
	// 普通格式化时间
	defaultFormat(time) {
		if (!time) {
			return null
		}
		return dayjs(time).format('YYYY/MM/DD HH:mm')
	},
	// 聊天使用的格式格式化时间
	// 60秒内的时间不显示日期, 超过60秒 但小于24小时  显示3分钟前格式  超过24小时 显示完整的日期
	formatChatItemTime(time) {
		if (!time) {
			return null
		}
		
		if (dayjs(time).isAfter(dayjs().subtract(1, 'minute'))) {
			return ''
		} else {
			return this.formatRelative24(time)
		}
		
	},
	// 会话使用的格式格式化时间
	// 60秒内的时间显示刚刚, 超过60秒 但小于24小时  显示3分钟前格式  超过24小时 显示完整的日期
	formatSessionItemTime(time) {
		if (!time) {
			return null
		}
		
		if (dayjs(time).isAfter(dayjs().subtract(1, 'minute'))) {
			return '刚刚'
		} else {
			return this.formatRelative24(time)
		}
		
	},
	
	// 通话时间的计时器 格式化 传入通话的秒数 转化为 00：00
	foramtCallTime(time) {
		if (!time) {
			return ''
		}
		
		return dayjs('2000/01/01').second(time).format('mm:ss')
	}
}

export default useDayjs