module.exports = {
	ANDROID_VERSION: "https://static.souyidai.com/downloads/investment-publisher/apk/3.2.1/HuliClient-release-3.2.1-PC.apk",
	IOS_VERSION: "https://itunes.apple.com/cn/app/sou-yi-dai-li-cai/id946672680?mt=8",
	// 解析URL
	parserUrl: function(url) {
		var a = document.createElement('a');
		a.href = url;

		var search = function(search) {
		    if (!search) return {};

		    var ret = {};
		    search = search.slice(1).split('&');
		    for (var i = 0, arr; i < search.length; i++) {
		        arr = search[i].split('=');
		        ret[arr[0]] = arr[1];
		    }
		    return ret;
		};

		return {
		    protocol: a.protocol,
		    host: a.host,
		    hostname: a.hostname,
		    pathname: a.pathname,
		    search: search(a.search),
		    hash: a.hash
		}
	},
	getUrlParam: function(param){
	    var reg_param = new RegExp("(^|&)" + param + "=([^&]*)(&|$)");
	    var _str = '';
	    if(location.hash!=''){
	    	var index = location.hash.indexOf('?');
	    	_str = index!=-1?location.hash.substr(index+1):'';
		}else{
	    	_str = window.location.search.substr(1);
		}
	    var arr = _str.match(reg_param);
	    if (arr && arr.length >= 2) {
	        return arr[2];
	    }else{
	        return '';
	    }
	},
	cookie: {
		add: function(name, value, iDay, domain){
		    if(!iDay) return;

		    var oDate = new Date();
		    oDate.setDate(oDate.getDate() + iDay);
		    document.cookie = name + '=' + value + ';path=/;expires=' + oDate.toGMTString() + ';domain=' + (domain || '.huli.com');
		},
		get: function(name){
      let cookies = document.cookie.split('; ');
      for (let i = 0, len = cookies.length; i < len; i++) {
        let arr = cookies[i].split('=');
        if (arr[0] == name) return cookies[i].replace(arr[0] + '=', '');
      }
      return '';
		},
		del: function(name, domain){
			document.cookie = name + "=;path=/;expires=" + (new Date(0)).toGMTString() + ';domain=' + (domain || '.huli.com');
		}
	},
	isIE8: navigator.userAgent.toLowerCase().indexOf("msie 8") > -1 ,
	filterURL: {
	    encodeUrl: function(href){
	        var newHref = href;
	        var arrHost = parse(href, true).host.split('.');
	        var newHost = arrHost.length >= 2 && arrHost[arrHost.length-2];
	        var allowUrl = /^huli|souyidai$/;
	        if(!allowUrl.test(newHost)){
	            newHref = 'https://www.huli.com';
	        }
	        return newHref;
	    },
	    encodeHash: function(hash){
	        return Util.filterURL.htmlEntity(hash);
	    },
	    htmlEntity: function(html){
	        return html.replace(/&/g, '&amp;')
	                    .replace(/</g, '&lt;')
	                    .replace(/>/g, '&gt;')
	                    .replace(/"/g, '&quot;')
	                    .replace(/'/g, '&#x27;')
	                    .replace(/\//g, '&#x2F;')
	    }
	},
	//url: 请求地址；data: 参数（string或Object类型都可以）；isJson: 是否返回json格式数据，默认true
    fetchPost: ({ url, data = '', isJson = true }) => {
        let stringData = "";
        switch (Object.prototype.toString.call(data)) {
            case "[object String]":
                stringData = data;
                break;
            case "[object Object]":
                let _arrData = [];
                _.forIn(data, (value, key) => {
                    _arrData.push(key + '=' + value);
                })
                stringData = _arrData.join('&')
                break;
            default:
                stringData = data;
                break;
        }
        return fetch(url, {
            method: 'POST',
            credentials: 'include',
            mode: 'no-cors',
            body: stringData,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response => {
            return isJson ? response.json() : response
        });
    },
    fetchGet: ({ url, data = '', isJson = true }) => {
        var params = "";
        if (data) {
            switch (Object.prototype.toString.call(data)) {
                case "[object String]":
                    params = data;
                    break;
                case "[object Object]":
                    let _arrData = [];
                    _.forIn(data, (value, key) => {
                        _arrData.push(key + '=' + value);
                    })
                    params = _arrData.join('&')
                    break;
                default:
                    stringData = data;
                    break;
            }
            url += '?' + params;
        }

        return fetch(url, {
            method: 'GET',
            credentials: 'include',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response => {
            return isJson ? response.json() : response
        });
    },
	/*
	    获取所有接口信息
	    @params url  string   接口地址
	    @params params json   请求参数 没有默认加t
	    @params type string   请求类型 默认 POST
	    @return promise
	    		返回数据的异步操作
	*/
	ajaxData(url, params, type = 'POST'){
	    let data = params || { t : Math.random() };
	    return new Promise(res => {
	    	$.ajax({
	            url,
	            type,
	            data,
	            dataType: 'json',
	            success(json){
	                if(json.errorCode == 1 && /no[Ll]ogin/.test(json.errorMessage)){
	                    window.location = 'https://passport.huli.com/?backurl=' + window.location.href;
	                }else{
	                    let data = json || {};
	                    res(data);
	                }
	            },
	            error(error){
	                throw new Error(error.statusText);
	                res({errorMessage:error.statusText});
	            }
        	})
	    })
	},
	requestAjaxFn(options){
	    let data = (options && options.data) || {};
	    data.t = Math.random();

	    $.ajax({
	        url: options.url,
	        type: options.type || 'POST',
	        dataType: options.dataType || 'json',
	        async: options.async == false ? false : true,
	        data: data
	    })
	    .done(function(data) {
	        if(data.errorCode == 1 && (data.errorMessage == "noLogin" || data.errorMessage == "nologin")){
	            window.location.href = "https://passport.huli.com?backurl=" + document.URL;
	            return;
	        }

	        options.succFn && options.succFn(data);
	    })
	    .fail(function() {
	        options.errorFn && options.errorFn(data);
	    })

	}
};
