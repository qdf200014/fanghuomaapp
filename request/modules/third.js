const MOJI_CODE = `b3522d79ecf74334b244031dde81db4b`;
const MOJI_BASEURL = 'https://aliv1.mojicb.com';
const MOJI_TOKEN = {
	'/whapi/json/aliweather/limit':'c712899b393c7b262dd7984f6eb52657',	// 限行数据
	'/whapi/json/aliweather/briefforecast6days':'0f9d7e535dfbfad15b8fd2a84fee3e36',	// 精简预报6天
	'/whapi/json/aliweather/briefcondition': 'a231972c3e7ba6b33d8ec71fd4774f5e',	// 精简实况
	'/whapi/json/aliweather/aqi':'6e9a127c311094245fc1b2aa6d0a54fd',	// 空气质量指数
	'/whapi/json/aliweather/alert':'d01246ac6284b5a591f875173e9e2a18'	// 天气预警
	
};
let MOJI = {};
for (let moji_path in MOJI_TOKEN) {
	let token = MOJI_TOKEN[moji_path],
		_path = moji_path.split('/');
	let name = _path[_path.length - 1];
	MOJI['moji_'+name] = (data)=>{
		data.token = token;
		let params = [];
		for (let key in data) {
			params.push(key+'='+data[key]);
		}
		let url = MOJI_BASEURL + moji_path + '?' + params.join('&'),
		header = {
			'Authorization':`APPCODE ${MOJI_CODE}`,
			'Content-Type':'application/json; charset=UTF-8'
		},
		method = 'POST';
		return uni.request({
			url,
			// data,
			header,
			method
		})
	}
}
export default {
	test1:(params)=>{
		console.log('params', params);
		return uni.request({
		        url: 'http://wthrcdn.etouch.cn/weather_mini',
				data : params,
				method:'GET'
		    })
	},
	...MOJI
}