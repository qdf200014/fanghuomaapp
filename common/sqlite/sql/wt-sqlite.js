const AUTOCLOSE = false;
const config = {
	name:'forestfire',
	path:'forestfire'
}
export class wtSql {
	constructor(arg) {
		
		if(plus){
			this.init(arg);
		} else {
			console.error('sqlite fail : dont use sqlite if not App!')
		}
	}
	init(options) {
		options = options || {};
		options = Object.assign({}, options, config);
		if (undefined == options || null == options || '' == options) return false;
		this.dispose(options);
		this.$tableList = [];
		plus.sqlite.openDatabase({
			name: this.$db,
			path: this.$path,
			success: (e) => {},
			fail: (e) => {
				console.log('openDB_fail:', JSON.stringify(e));
			}
		});
		return this;
	}
	getAdmin() {
		return this;
	}
	// 检查是否存在某张表
	isTable(tabName) {
		return new Promise((resolve, reject)=>{
			if(this.$tableList.findIndex(a=> a == tabName)>=0){
				return resolve({isTable:true})
			} else {
				return this.select(`SELECT * FROM sqlite_master `).then(res=>{
					this.$tableList = res.map(item=>item.name);
					if(this.$tableList.findIndex(a=> a == tabName)>=0){
						return resolve({isTable:true});
					}
					return resolve({isTable:false})
				})
				.catch(err=>{
					reject(err)
				});
			}
		})
	}
	dispose(options) {
		let _this = this;
		if (options.hasOwnProperty('name')) {
			_this.$db = options.name;
			_this.$name = options.name;
			_this.$path = options.hasOwnProperty('path') ? `_doc/${options.path}/${_this.$db}.db` : `_doc/${_this.$db}.db`;
		} else {
			console.error('please set db name!');
			return false;
		}
		this.$database = options.tableName || _this.$name;
		this.$autoClose = AUTOCLOSE;
	}
	autoClose(auto, run) {
		this.$autoClose = auto;
		run ?
			this.close() :
			this.open();
	}
	table(tableName) {
		this.$database = tableName || this.$database;
		return this;
	}
	open() {
		if (this.isOpen()) {
			return false
		};
		let _this = this;
		return new Promise((resolve, reject)=>{
			plus.sqlite.openDatabase({
				name: _this.$db,
				path: _this.$path,
				success: (e) => {
					resolve(e)
				},
				fail: (e) => {
					reject(e);
				}
			});
		})
	}
	isOpen() {
		return plus.sqlite.isOpenDatabase({
			name: this.$db,
			path: this.$path
		});
	}
	close() {
		// console.log(this.isOpen());
		if (!this.isOpen()) {
			return false
		};
		return Promise((resolve, reject)=>{
			plus.sqlite.closeDatabase({
				name: this.$db,
				success: (e) => {
					console.log('closeDatabase success!');
					resolve(e)
				},
				fail: (e) => {
					reject(e)
				}
			});
		})
	}
	createTable() {
		let tabName = null,
			option = {},
			callback = () => {};
		for (let i = 0; i < arguments.length; i++) {
			switch (typeof arguments[i]) {
				case 'number':

					break;
				case 'boolean':
					break;
				case 'string':
					tabName = arguments[i];
					break;
				case 'function':
					callback = arguments[i];
					break;
				case 'object':
					option = arguments[i];
					break;
				case 'undefined':

					break;
				default:
					break;
			}
		}
		this.$database = tabName || this.$database;
		if (tabName == undefined || tabName == null || tabName == '') {
			console.error('please set tableName!');
			return false;
		}
		if (option == undefined || option == null || typeof option != 'object') {
			console.error('please set tableOption!');
			return false;
		}
		let sqlArr = [];
		for (let key in option) {
			sqlArr.push(this.keyword(key) + ` ` + option[key]);
		}
		// console.log(`create table if not exists ${this.$database}(${sqlArr.join(",")})`); 
		// return false;
		return new Promise((resolve, reject)=>{
			plus.sqlite.executeSql({
				name: this.$db,
				sql: `create table if not exists ${this.$database}(${sqlArr.join(",")})`,
				success: (e) => {
					callback(tabName);
					this.isTable(tabName);
					resolve({tabName, message:e})
				},
				fail: (e) => {
					reject(e)
				}
			});
		})
	}
	drop() {
		let tabName = this.$database,
			callback = (e) => {
				let drop_index = this.$tableList.findIndex(a=> a == tabName);
				this.$tableList.splice(drop_index, 1);
			};
		for (let key in arguments) {
			switch (typeof arguments[key]) {
				case 'string':
					tabName = arguments[key];
					break;
				case 'function':
					break;
				default:
					break;
			}
		}
		if (tabName == null || tabName == undefined || tabName == '') {
			console.error('please set tabName!');
			return false
		};
		return this.execute(`DROP TABLE IF EXISTS ${tabName}`, callback)
	}
	add() {
		let arg = this.handleArguments(arguments) || {};
		let insertType = `insert`,
			option = {},
			keyStr = ``,
			valStr = ``,
			batchStr = ``,
			callback = null,
			addArr = arg.arr ? arg.arr[0] : [],
			tab = arg.str ? arg.str[0] : this.$database,
			ob = arg.obj ? arg.obj[0] : null,
			fun = arg.fun ? arg.fun : () => {},
			num = arg.num ? arg.num[0] : 1;
		this.$database = tab;
		option = ob;
		callback = fun;
		
		switch (num){
			case 0:
				break;
			case 1:
			insertType = `insert or replace`;	//如果不存在就插入，存在就更新
				break;
			case 2:
			insertType = `insert or ignore`;	//如果不存在就插入，存在就忽略
				break;
			default:
				break;
		}
		
		if ((option == null && !addArr.length) || tab == '') {
			console.error('add options error! dont find data for argument!');
			return false;
		}
		if (option == null) {
			option = addArr[0];
			// addArr.shift();	会修改元数据
		}
		for (let keyTemp in option) {
			switch (typeof option[keyTemp]) {
				case 'number':
					keyStr += `,${this.keyword(keyTemp)}`;
					valStr += `,${option[keyTemp]}`;
					break;
				case 'boolean':
					keyStr += `,${this.keyword(keyTemp)}`;
					valStr += `,${option[keyTemp]?'1':'0'}`;
					break;
				case 'string':
					keyStr += `,${this.keyword(keyTemp)}`;
					valStr += `,'${option[keyTemp]}'`;
					break;
				case 'function':
					callback = option[key];
					break;
				case 'object':
					keyStr += `,${this.keyword(keyTemp)}`;
					valStr += `,'${JSON.stringify(option[keyTemp])}'`;
					break;
				case 'undefined':
					keyStr += `,${this.keyword(keyTemp)}`;
					valStr += `,null`;
					break;
				default:
					break;
			}
		}
		for (let i = 1, len = addArr.length; i < len; i++) {
			let addArrI = addArr[i],
				tempStr = ',(';
			for (let keyTemp in addArrI) {
				switch (typeof addArrI[keyTemp]) {
					case 'number':
						tempStr += `,${addArrI[keyTemp]}`;
						break;
					case 'boolean':
						tempStr += `,'${addArrI[keyTemp]?'1':'0'}'`;
						break;
					case 'string':
						tempStr += `,'${addArrI[keyTemp]}'`;
						break;
					case 'function':

						break;
					case 'object':
						tempStr += `,'${JSON.stringify(addArrI[keyTemp])}'`;
						break;
					case 'undefined':
						tempStr += `,null`;
						break;
					default:
						break;
				}
			}
			batchStr += (tempStr.replace(/,\(,/, ',(') + ')');
		}
		return this.execute(
			`${insertType} into ${this.$database} (${keyStr.replace(/,/, '')}) values(${valStr.replace(/,/, '')}) ${batchStr}`,
			callback);
	}
	del() {
		return this.execute(`delete from ${this.$database} where ${arguments[0]} = ${arguments[1]}`, arguments[2]);
	}
	remove() {
		let tabName = '',
			callback = null,
			option = {},
			update = false;
		for (let i = 0; i < arguments.length; i++) {
			switch (typeof arguments[i]) {
				case 'string':
					this.$database = arguments[i];
					break;
				case 'function':
					callback = arguments[i];
					break;
				case 'boolean':
					update = arguments[i];
					break;
				case 'object':
					option = arguments[i];
					option.table ?
						(this.$database = option.table) :
						'';
					option.callback ?
						(callback = option.callback) :
						'';
					break;
				default:
					break;
			}
		}
		tabName = this.$database;
		let keyStr = ``,
			valStr = ``,
			keyArr = null;
		for (let key in option) {
			keyArr = (key.split('-')[1]) ? ((key.split('-')[1] == 'a') ? ('>') : ('<')) : ('=');
			switch (typeof option[key]) {
				case 'number':
					valStr = `,${this.keyword(key.split('-')[0])} ${keyArr} ${option[key]}`;
					break;
				case 'boolean':
					valStr += `,${this.keyword(key)} ${keyArr} "${option[key]?'1':'0'}"`;
					break;
				case 'string':
					valStr += `,${this.keyword(key)} ${keyArr} "${option[key]}"`;
					break;
				case 'function':
					callback = option[key];
					break;
				case 'object':
					valStr += `,${this.keyword(key)} ${keyArr} "${JSON.stringify(option[key])}"`;
					break;
				case 'undefined':
					valStr += `,${this.keyword(key)} ${keyArr} null`;
					break;
				default:
					break;
			}
		}
		return this.execute(
			`delete from ${tabName} where ${valStr.replace(/,/, '')}`,
			callback);
	}
	clear() {
		let tabName = '',
			callback = null,
			options = {};
		for (let i = 0; i < arguments.length; i++) {
			switch (typeof arguments[i]) {
				case 'string':
					this.$database = arguments[i];
					break;
				case 'function':
					callback = arguments[i];
					break;
				case 'object':
					options = arguments[i];
					options.table ?
						(this.$database = options.table) :
						'';
					options.callback ?
						(callback = options.callback) :
						'';
					break;
				default:
					break;
			}
		}
		tabName = this.$database;
		return this.execute(`DELETE FROM ${tabName}`, callback)
	}
	update() {
		let arg = this.handleArguments(arguments) || {};
		let	option = {},
			callback = null,
			tabName = arg.str ? arg.str[0] : this.$database,
			where = arg.obj ? arg.obj[0] : {},
			ob = arg.obj ? arg.obj[1] : {},
			fun = arg.fun ? arg.fun : () => {},
			update = arg.boo ? arg.boo[0] : false;
		this.$database = tabName;
		option = ob;
		callback = fun;
			
		for (let i = 0; i < arguments.length; i++) {
			switch (typeof arguments[i]) {
				case 'string':
					this.$database = arguments[i];
					break;
				case 'function':
					callback = arguments[i];
					break;
				case 'boolean':
					update = arguments[i];
					break;
				case 'object':
					option = arguments[i];
					option.table ?
						(this.$database = option.table) :
						'';
					option.callback ?
						(callback = option.callback) :
						'';
					break;
				default:
					break;
			}
		}
		tabName = this.$database;
		let keyStr = ``,
			valStr = ``,
			keyArr = null;
		for (let key in where) {
			switch (typeof where[key]) {
				case 'number':
					keyArr = `where ${this.keyword(key.split('-')[0])} ${this.checkJudge(key.split('-')[1])} ${where[key]}`;
					break;
				case 'boolean':
					keyArr = `where ${this.keyword(key.split('-')[0])} ${this.checkJudge(key.split('-')[1])} '${where[key]?'1':'0'}'`;
					break;
				case 'string':
					keyArr = `where ${this.keyword(key.split('-')[0])} ${this.checkJudge(key.split('-')[1])} '${where[key]}'`;
					break;
				case 'function':
					callback = where[key];
					break;
				case 'object':
					keyArr = `where ${this.keyword(key.split('-')[0])} ${this.checkJudge(key.split('-')[1])} '${JSON.stringify(where[key])}'`;
					break;
				default:
					break;
			}
		}
		
		for (let key in option) {
			switch (typeof option[key]) {
				case 'number':
					valStr += `,${this.keyword(key)} = ${option[key]}`;
					break;
				case 'boolean':
					valStr += `,${this.keyword(key)} = '${option[key]?'1':'0'}'`;
					break;
				case 'string':
					valStr += `,${this.keyword(key)} = '${option[key]}'`;
					break;
				case 'function':
					callback = option[key];
					break;
				case 'object':
					valStr += `,${this.keyword(key)} = '${JSON.stringify(option[key])}'`;
					break;
				case 'undefined':
					valStr += `,${this.keyword(key)} = null`;
					break;
				default:
					break;
			}
		}
		valStr += (update ? `,updateTime = datetime('now', 'localtime')` : ``);
		// console.log('update:::::::', `update ${this.$database} set ${valStr.replace(/,/, '')} ${keyArr}`);
		return this.execute(
			`update ${this.$database} set ${valStr.replace(/,/, '')} ${keyArr}`,
			callback);
	}
	selectBy() {
		let tabName = '',
			options = {},
			callback = () => {};
		if (typeof arguments[0] == 'string') {
			tabName = arguments[0];
			options = arguments[1] || {};
			callback = arguments[2] || (() => {});
		} else {
			tabName = this.$database;
			options = arguments[0] || {};
			callback = arguments[1] || (() => {});
		}

		if (tabName == '') {
			console.error('please set tabNmae!');
			return false
		};

		let conditionStr = '',
			order = '=',
			keyOrder = [],
			join = {},
			orderBy = '',
			limit = '';
		for (let key in options) {
			keyOrder = key.split('-');
			switch (keyOrder[0]) {
				case 'order':
					orderBy = `, ${options[key]} ${this.checkJudge(keyOrder[1], true)}`;
					break;
				case 'limit':
					limit = ` LIMIT ${options.limit[0]} ${options.limit[1]?(','+options.limit[1]):''}`;
					break;
				case 'join':
					join = this.handleJoin(options[key]);
				case 'callback':
					callback = options[key];
					break;
				default:
				switch (keyOrder[1]){
					case 'or':
					conditionStr += ` OR ${tabName}.${this.keyword(keyOrder[0])} ${this.checkJudge(keyOrder[1])} '${options[key]}' `;
						break;
					case 'like':
					conditionStr += ` AND ${tabName}.${this.keyword(keyOrder[0])} LIKE '%${options[key]}%' `;
						break;
					default:
					conditionStr += ` AND ${tabName}.${this.keyword(keyOrder[0])} ${this.checkJudge(keyOrder[1])} '${options[key]}' `
						break;
				}
					break;
			}
		}
		
		
		
		orderBy = orderBy.replace(/,/, 'ORDER BY');
		conditionStr = conditionStr.replace(/AND/, 'where');
		// console.log('select_sql_', `select ${tabName}.* ${(join.nameStr||'')} from ${tabName} ${(join.joinStr||'')} ${conditionStr} ${orderBy} ${limit}`);
		return this.select(
			`select ${tabName}.* ${(join.nameStr||'')} from ${tabName} ${(join.joinStr||'')} ${conditionStr} ${orderBy} ${limit}`,
			callback);
	}
	selectByTime(onlyTime, callback){
		let tabName = this.$database;
		let timeName = onlyTime;
		return this.select(
			`SELECT DISTINCT * FROM (SELECT substr(${timeName}, 0, 11) ${timeName}  FROM ${tabName});`,
			callback);
	}
	checkJudge(judge, str){
		let connect = str?'':'=';
		switch (judge){
			case 'like':
			connect = str?'':'like';
				break;
			case 'a':
			connect = str?'ASC':'>';
				break;
			case 'd':
			connect = str?'DESC':'<';
				break;
			default:
				break;
		};
		return connect;
	}
	handleJoin(join) {
		let nameStr = ``,
			joinStr = ``;
		if (!(join.hasOwnProperty('tableName') && join.hasOwnProperty('on'))) {
			console.warn('json not tab or on!');
			return {
				nameStr,
				joinStr
			};
		}
		if (!join.hasOwnProperty('name') || (!join.name.length)) {
			nameStr = ` ,${join.tableName}.* `;
		} else {
			for (let i = 0; i < join.name.length; i++) {
				nameStr += ` ,${join.tableName}.${join.name[i]} `;
			}
		}
		joinStr = ` JOIN ${join.tableName} ON ${this.$database}.${join.on} = ${join.tableName}.${join.on} `;
		return {
			nameStr,
			joinStr
		};
	}
	handleArguments(options) {
		let opt = {},
			obj = [],
			arr = [],
			str = [],
			fun = [],
			num = [],
			boo = [];
		for (let i = 0; i < options.length; i++) {
			switch (typeof options[i]) {
				case 'object':
					if (Array.isArray(options[i])) {
						arr.push(options[i]);
					} else {
						obj.push(options[i]);
					}
					break;
				case 'function':
					fun = options[i];
					break;
				case 'string':
					str.push(options[i]);
					break;
				case 'number':
					num.push(options[i]);
					break;
				case 'undefined':

					break;
				case 'boolean':
					boo.push(options[i]);
					break;
				default:
					break;
			}
		}

		if (obj.length) {
			opt.obj = obj;
		}
		if (arr.length) {
			opt.arr = arr;
		}
		if (str.length) {
			opt.str = str;
		}
		if (fun.length) {
			opt.fun = fun;
		}
		if (num.length) {
			opt.num = num;
		}
		if (boo.length) {
			opt.boo = boo;
		}
		return opt;
	}
	execute(sql, callback) {
		this.isOpen() ? '' : this.open();
		return new Promise((resolve, reject)=>{
			plus.sqlite.executeSql({
				name: this.$db,
				sql,
				success: (e) => {
					// console.log('success', e);
					this.$autoClose ?
						this.close() :
						'';
					callback && callback(e);
					resolve(e);
				},
				fail: (e) => {
					// console.log('fail', e);
					reject(e)
				}
			});
		})
	}
	select(sql, callback) {
		this.isOpen() ? '' : this.open();
		return new Promise((resolve, reject)=>{
			plus.sqlite.selectSql({
				name: this.$db,
				sql: sql,
				success: (e) => {
					this.$autoClose ?
						this.close() :
						'';
					callback && callback(e);
					resolve(e)
				},
				fail: (e) => {
					reject(e)
				}
			});
		})
	}
	keyword(str){
		return `'${str}'`;
	}
}
