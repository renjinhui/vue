const React = require('react');
/*
*loading 必传 
*dataSource 必传 要显示的数据
*className 非必传  组件最外层盒子的类名
*columns 表头  数组  必传  子项为对象
    title           必传
    dataIndex       必传  对应的key
    key             非必传  字符串
    class           非必传  字符串
    html            非必传  函数 定义该列的元素
    filter          非必传  函数 定义该列的元素的显示方式
    titleHtml       非必传  函数 定义该列表头的元素
*/


export class Table extends React.Component {

    render(){
    let userinfo = '';
    let dataSource = this.props.dataSource || [];
    let columns = this.props.columns || [];
    let titleList = '',dataList = '';
    titleList = columns.map((value,i)=>{
        let tilLine = '';
        if(value.titleHtml){
            let ele = value.titleHtml(value)
            tilLine = <span key={value.key + i} className={value.class}>{value.title}{ele}</span>
        }else{
            tilLine = <span key={value.key+i} className={value.class}>{value.title}</span>;
        }
        return (tilLine)
    })
    if(!dataSource.length && this.props.loading){
        dataList  = <div className='table-loading'>
                        <img src="https://static.souyidai.com/www/images/version/my-account/sydloading.gif"/>
                    </div>
    }else if(!dataSource.length){
        dataList = this.props.children || '';
    }else{
        dataList = dataSource.map((value,index) => {
            let innerlist = '';
            innerlist = columns.map((val,i) => {
                let str = '';
                switch (val.dataIndex){
                    case 'index':
                        str = <span key={val.key+i} className={val.class}>{index + 1}</span>;
                        break;
                    case 'button':
                        str = <a key={val.key+i} className={val.class}>{val.title}</a>;
                        break;
                    default:
                        let strs = val.dataIndex;
                        let arr = strs.split(' ');
                        let datas = arr.length === 1
                            ? value[val.dataIndex]
                            : arr.reduce((x, y, i) => {
                                return i === 1 ? dataSource[index][x][y] : x[y];
                            });
                        let inHtml = val.filter ? val.filter(datas).text : (datas || '');
                        let addClass = '';
                        if(val.filter){
                            addClass = ' ' + (val.filter(datas).class || '');
                        }
                        if(val.html){
                            let url = val.html(value);
                            if(url){
                                inHtml = url
                            }
                        }
                        str = <span key={val.key+i} className={val.class + addClass }>{inHtml}</span>
                        break;
                }
                return (str)
            })
            return(<div key={'key'+index} className={(this.props.lineClass || "acgral-xs") + " tpl-list"}>{innerlist}</div>)
            
        })        
    }

    return (
        <div className={this.props.className}>
            <div className={(this.props.titleClass || 'acgral-th') + " table-title"}>
                {titleList}
            </div>
            <div className = {this.props.bodyClass || 'table-body'}>
                {dataList}
            </div>
            
        </div>
    );
  }  
}

Table.NoData = ({url, children, style}) => {
    return (
        <div className="sydinlist-notips" style={style}>
            <span className="imgbox1">
                <img src={url || "https://static.souyidai.com/www/images/version/my-account/graphic-icon.jpg"} alt=""/>
            </span>
            {
                children || <span>暂无数据</span>
            }
        </div>
    )
};

Table.Error = ({children, style}) => {
    return (
        <div className="center-justified" style={style}>
            <div className="vertical-high-80">&nbsp;</div>
            <div className="vertical-high-80">
                {children || '系统繁忙，请稍后重试~~'}
            </div>
            <div className="vertical-high-80">&nbsp;</div>
        </div>
    )
};



