import axios from 'axios';

export const addCount = ({commit},obj) => commit('addCount',obj);

export const getuserInfo = ({commit}) => {
	
	axios.get('/userinfo?t='+Math.random()).then((data)=>{
		if(data){
			let obj = data.data.data;
			console.log(obj)
			commit('userinfo',obj)
		}
	})

};
