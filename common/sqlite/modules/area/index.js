import {
	wtSql
} from '@/common/sqlite/sql/wt-sqlite.js';
import { AREA } from './config.js';

export default class AreaConnect extends wtSql {
	getAreaList({Area, attr}){
		return this.selectBy('area', {
			parentCode:Area,
			level:attr,
		});
	}
	createAreaTable(){
		return this.createTable('area', AREA.table);
	}
	addAreaList(list){
		return this.add('area', list, 1);
	}
	dropAreaTable(){	// 清理缓存
		return this.drop('area');
	}
}