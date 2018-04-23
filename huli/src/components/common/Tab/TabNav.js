const React = require('react');
const ReactRedux = require('react-redux');
const classNames = require('classnames');

const { Url } = require('common/Tab/Url');
const { Tab } = require('common/Tab/Tab');

export const TabNav = ({children}) => (
    <span>
        {children }
    </span>
);

const Page = ({order, index, url, children, onClick}) => (
    <Url 
        index={index}
        url={url || ''}
        onClick={onClick}
    >
        {children}
    </Url>
)

const mapDispatchToProps = (dispatch, props) => {
    return {
        onClick: () => props.onClick(props.order)
    }
};


TabNav.Page = ReactRedux.connect(null, mapDispatchToProps)(Page);

// 上边的写法是用redux 下边的是一般的写法 把函数定义到行内

TabNav.Tab = ({...config}) => {
    let data = {...config};
    return <Tab className={data.order ==data.currentOrder ? 'current' : ''} order={data.order} num={data.num} onClick={(order)=>{data.onClick(order)}}>{data.children}</Tab>
}

TabNav.TabNum = ({...config}) => {
    let data = {...config};
    return  (<span className={(data.order ==data.currentOrder ? 'current' : '')+' syd-tab-item'} onClick={()=>{data.onClick(data.order)}}>
                <span className='tab-item-name'>{data.children}</span>
                <em className='tab-item-num'>{data.num == undefined ? '' : data.num}</em>
            </span>)
}