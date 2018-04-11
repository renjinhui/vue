
import axios from 'axios'

export const getUserInfo = ({commit},obj) => {
	
	axios.get('/userinfo?t='+Math.random()).then((data)=>{
		if(data){
			let obj = data.data.data;
			console.log(data)
			commit('userinfo',obj)
		}
	})

};