/**
 * 文件上传api
 */
import {
	http
} from '@/request/index.js';

export default {
	// 多文件上传
	"multifileupload": (data, files) => {
		console.log('files_', files);
		return http.middleware({
			method: 'UPLOAD',
			url: '/api/localfiles/multifileupload',
			name:'file',
			files,
			formData:data
		})
	},
}