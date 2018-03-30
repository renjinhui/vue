import axios from 'axios';

export const addCount = ({commit},obj) => commit('addCount',obj);

export const getZPDicts = ({commit}) => {
	
	axios.post('/crm/om/mall/goodsStock/getGoodsStockList?t='+Math.random()).then((data)=>{
		if(data){
			// console.log(data,data.data,data.data.data)
			// 这里拿到的数据不好使 但是先将就着用吧 下期在让后台改改结构  最好的局势一个字典对象  不用自己再转化
			let list = [];
			let obj= {};
			if(data){
				list = data.data.data || [];
			}
			if(list.length){
				for(var i = 0 ;i < list.length; i++){
					obj[list[i].goodsId] = {};
					obj[list[i].goodsId].productName = list[i].productName;
					obj[list[i].goodsId].stockType = list[i].stockType;
					obj[list[i].goodsId].stock = list[i].stock;
					obj[list[i].goodsId].usedStock = list[i].usedStock;
				}	
			}else{
				obj = data.data.data || {};
			}
			commit('zpDicts',obj)
		}
	})

};
