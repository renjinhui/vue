<style lang='less' rel="stylesheet/less">
	.table_box{
		width: 1000px;
	}
	.til{
		height: 52px;
	    background: #add8e6;
	    font-size: 14px;
	    color: #333;
	}
	.body{
		text-align:center;
	}
</style>
<template>
    <div>
        <div class="thead_box" ref="box">
            <table class="table_box">
                <colgroup>
                    <col v-for="til in titleList" :width="til.width ? til.width+'px' : ''"></col>
                </colgroup>
                <thead>
					<tr class='til'>
						<th ref='th' v-for="(til,n) in titleList" :class="til.class||''">
							<span v-if="til.key == 'select'">
                                <input type="checkbox" name="" v-model="isSelectAll"/>                     
                            </span>
                            <span v-else>
                                {{til.text}}
                            </span>
						</th>
					</tr>  
				</thead>
            </table>     
        </div>
        <div class="tbody_box">
            <table class="table_box">
                <colgroup>
                    <col v-for="(til,n) in titleList" :width="thWidth.length ? thWidth[n]+'px' : ''"></col>
                </colgroup>
                <tbody>
                    <tr class="body" v-for="(item,index) in dataList">
                        <td v-for="(til,n) in titleList" :class="til.class||''">
                            <span v-if="til.key == 'index'">{{index+1}}</span>
                            <span v-else-if="til.key == 'html'">
                            	<span v-for="obj in til.htmlAry" @click="()=>{spanClick(obj,{item,index})}" v-html="obj.html"></span>
                            </span>
                            <span v-if="til.key == 'select'">
                                <input type="checkbox"  v-model="selectAry[index]" name="" @change="select(index)"/>
                            </span>
                            <span v-if="til.filter">{{til.filter(item,n)}}</span>
                            <span v-else>{{item[til.key]||''}}</span>
                        </td>
                    </tr> 
                </tbody>
              
            </table>  
        </div>
        <span style="display:none">{{t}}</span>
    </div>
</template>
<script>
    export default {
        name: 'Table',
        props:{
            titleList: {
            	type: Array,
            	default: function(){
                    return []
                }
            },
            dataList: {
            	type: Array,
            	default: function(){
                    return []
                }
            },
            // onSelect: {
            //     type: Function,
            //     default: function(){

            //     }
            // }
        },
        computed:{
            selectAry(){
                let ary = [],data = [];
                for(let i = 0; i < this.dataList.length; i++){
                    ary[i] = this.isSelectAll;
                    data = this.isSelectAll ? this.dataList : [];
                }
                this.$emit('onSelect',data)
                // this.onSelect(data);
                return ary;
            }
        },
        data: function(){
            return {
                thWidth:[],
                isSelectAll: false,
                t:0
            }
        },
        mounted(){
            this.getThWidth();
            this.giveSelectAry();
        },
        updated(){
            console.log(this.dataList)
        },
        methods:{
        	getThWidth(){
        		let ary = [],ths = this.$refs.th;
        		for(let i = 0 ;i < ths.length; i++){
        			ary.push(ths[i].clientWidth)
        		}
        		this.thWidth = ary;
        	},
            giveSelectAry(){
                for(let i = 0; i < this.dataList.length; i++){
                    this.selectAry.push(false);
                }
            },
            select(){
                let data = [];
                for( let i = 0; i < this.selectAry.length; i++){
                    if(this.selectAry[i]){
                        data.push(this.dataList[i]);
                    }
                }
                this.$emit('onSelect',data)
                // this.onSelect(data);
            },
            spanClick(obj,item){
                obj.click ? obj.click(item) : null
            }
        }
    }
</script>