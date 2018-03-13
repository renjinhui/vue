<style lang='less' type="stylesheet/less">
	.tab_box{
		overflow: hidden;
		display: inline-block;
		list-style:none;
	}
	li{
		float: left;
		width: 100px;
		height: 30px;
		line-height: 30px;
		text-align:center;
		
	}
	li.current{
		background: #add8e6;
	}
</style>
<template>
	<div>
		<ul v-if="tabData.length" class="tab_box" :class="className">
			<li v-for="(item,n) in tabData" :class="currentIndex == n ? item.class+' '+(activeClass || 'current') : item.class" @click="()=>{tabClick(item,n)}">
				{{item.title}}
			</li>
		</ul>
		<ul v-if="!tabData.length" class="tab_box" :class="className">
			<slot @click="test"></slot>
		</ul>	
	</div>
	
</template>
<script type="text/javascript">
	export default{
		name: 'Tabs',
		props:{
			className: {
				type: String,
				default:''
			},
			activeClass: {
				type: String,
				default:''
			},
			tabData:{
				type: Array,
				default:function(){
					return []
				}
			}
		},
		data(){
			return{
				currentIndex:0
			}
		},
		mounted(){
			this.clickBind();
		},
		methods:{
			tabClick(item,n){
				this.$emit('onChange',item)
				this.currentIndex = n;
			},
			test(data){
				console.log(data)
			},
			clickBind(){
				let ary = this.$slots.default;
				let clas = this.activeClass||'current';
				let reg = new RegExp(clas);
				if(!ary)return;
				let eleAry = [];
				for(let i = 0; i < ary.length; i++){
					let vNode = ary[i];
					if(vNode.tag){
						eleAry.push(vNode)
					}
				}
				eleAry[0].elm.className = eleAry[0].elm.className + ' ' + clas;
				for(let i = 0; i < eleAry.length; i++){
					let order = eleAry[i].elm.attributes.order.value;
					eleAry[i].elm.onclick = ()=>{
						this.currentIndex = i;
						this.changeClass(eleAry);
						this.$emit('onChange',order)
					}
				}
			},
			changeClass(ary){
				let clas = " " + (this.activeClass||'current');
				let reg = new RegExp(clas);
				for(let i = 0; i < ary.length; i++){
					if(this.currentIndex == i){
						reg.test(ary[i].elm.className) ? null : ary[i].elm.className = ary[i].elm.className + clas;
					}else{
						reg.test(ary[i].elm.className) ? ary[i].elm.className = ary[i].elm.className.replace(reg,'') : null;
					}
				}
			}
		}
	}
</script>











