const React = require('react');
const cs = require('classnames');

let uploader;
let picid;
let _dom ;
export const Uploader = React.createClass({
    getInitialState(){
        return {
            file:{
                id:'',
                name:''
            },
            precentage:'',
            loaderState:0
        }
    },
    render(){
        picid = this.props.picid;
        return (
            <div className="reCharge-mask" id="uploading" style={{'display':'none'}}>
                <div className="rechargeUploader">
                    <div className="uploaderTop">
                        <h2 className="title">港澳-充值记录上传</h2>
                        <img className="icon-close" src="https://static.huli.com/images/jjs/Group1.png" onClick={this.maskClose}/>
                    </div>
                    <div className="loaderContent">
                        <p className="textcontent" dangerouslySetInnerHTML={ {__html: codes.local_tooltip.hk_deposit_pic_tip}}>
                        </p>
                        <div className="loaderAPI">
                            <div className="loaderBox" id={this.state.file.id}>
                                <i className="certifi-img"></i>
                                <span className="upload-info">{this.state.file.name}</span>
                                <span className="upload-progress"></span>
                            </div>
                            <a className="choicePic" id="filePicker" onClick={this.picloader}>选择图片</a>
                            <span className="choicePormpt">支持图片格式为png、jpg、jpeg、bmp，大小不超过10MB</span>
                        </div>
                    </div>
                    <div className="loaderfooter">
                        <a className="btn-sure">确定</a>
                    </div>
                </div>
            </div>
        )
    },
    componentDidMount(){
        this.setUploadFn();
    },
    maskClose(){
        $('.reCharge-mask').hide();
        $('body').css('overflow','auto');
    },
    picloader(){
        uploader.reset();
    },
    setUploadFn(){
        uploader = WebUploader.create({
            auto: false,
            swf: 'https://static.souyidai.com/www/js/Uploader.swf',
            server: '/user/uploadImg',
            pick: '#filePicker',
            fileNumLimit: 1,    //上传 不能超过1个文件
            fileSingleSizeLimit: 1024*1024*10,  //不能超过10M大小
            accept: {
                title: 'Images',
                extensions: 'gif,jpg,jpeg,bmp,png',
                mimeTypes: 'image/*'
            }
        });
        uploader.on('fileQueued',file =>{
            this.setState({file:file},()=>{
                uploader.upload();
            })
        });
        uploader.on('uploadBeforeSend',(obj,data)=>{
            data.cerCode = "CHARGE_BILL";
            data.cerName = "充值单";
            data.type = "3";
            data.entity = picid;
        });
        uploader.on('uploadProgress',(file,percentage)=>{
            this.setState({precentage:'上传进度：'+ Math.ceil(percentage * 100) + '%' })
        });
        uploader.on('uploadSuccess',(file,result) => {
            let str ,state;
            switch (result.errorCode){
                case 0:str='上传成功';
                    state = 1;
                    break;
                case 2:str='失败:文件格式不是图片';
                    state = 0;
                    break;
                case 3:str='失败:参数错误';
                    state = 0;
                    break;
                case 4:str='失败:没有文件内容或文件超过10M';
                    state = 0;
                    break;
                case 9:str='失败:系统繁忙';
                    state = 1;
                    break;
            }
            this.setState({precentage:str,loaderState:state},() =>{
                const $DOM = $('.acgral-xs:contains("'+ picid +'")>span:last-child').prev();
               if(state==1){
                   $DOM.attr('class','grid-wh-90 lt text-center bankBrown').html('待审核');
               }else if(state==0){
                   $DOM.find('a').text('重新上传');
               }

            })
        });
        uploader.on('uploadError',file => {
            this.setState({precentage:'上传失败',loaderState:0})
        });
    },
    componentWillReceiveProps(nextProps){
        picid = nextProps.picid;
    }
})