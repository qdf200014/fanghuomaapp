// 检查图片是否能正常访问， 不能替换一个默认的图片

// 检查头像图片是否正常访问
// __src 要检查的图片地址
// defaultImg 要替换的默认图片地址， 不填则不进行替换

export function checkAvatarImgSrc(__src, defaultImg) {
	let temp_src = ''
	try {
		if (typeof __src !== 'string' || (defaultImg && typeof defaultImg !== 'string')) {
			console.log('传入的类型错误，不为string', __src, defaultImg);
			return temp_src
		}
		temp_src = __src
		// console.log('核查的图片地址', __src);


		return new Promise(function(resolve, reject) {
			
			if (!imageUrl(__src)) {
				// console.log('此图片的地址不对');
				if (defaultImg) {
					temp_src = defaultImg
				}
				reject({'img': temp_src})
				return ;
			}
			
			// 判断图片是否正常
			uni.getImageInfo({
				src: __src,
				success: (res) => {
					console.log(res);
					resolve({res, 'img': temp_src});
				},
				fail: (err) => {
					console.log(err);
					if (defaultImg) {
						temp_src = defaultImg
					}
					reject({err, 'img': temp_src})
				},
				complete: (e) => {
					// console.log(e);
					// console.log('11111');
				}
			})
		})
	} catch (e) {
		//TODO handle the exception
		console.log('checkAvatarImgSrc 方法出错', e);
	}
}

// 检查图片的地址是否携带http
function imageUrl(url) {
	let str = RegExp('http')
	return str.test(url)
}
