// 引用百度地图微信小程序JSAPI模块 
var bmap = require('../../libs/bmap-wx.js'); 
Page({ 
    data: { 
        weatherData: '', 
        searchvalue:""//输入的内容
    }, 
    bindKeyInput:function(e){
     let value=e.detail.value;
     this.setData({
        searchvalue:value,
        disabled:value.length==0
     })
    },
    search:function(){
        var that = this; 
        // 新建百度地图对象 
        var BMap = new bmap.BMapWX({ 
            ak: 'SDmcvlySPIWtp2B0pbHyusH3xeZnBiqQ',
            location:that.data.searchvalue
        }); 
        var fail = function(data) { 
            console.log(data) 
        }; 
        var success = function(data) { 
            var weatherData = data.currentWeather[0]; 
            /* weatherData = '城市：' + weatherData.currentCity + '\n' + */ 
            weatherData = '城市：' + that.data.searchvalue + '\n' + 'PM2.5：' + weatherData.pm25 + '\n' +'日期：' + weatherData.date + '\n' + '温度：' + weatherData.temperature + '\n' +'天气：' + weatherData.weatherDesc + '\n' +'风力：' + weatherData.wind + '\n'; 
            that.setData({ 
                weatherData: weatherData 
            }); 
        }
        
        // 发起weather请求 
        BMap.weather({ 
            fail: fail, 
            success: success 
        }); 
    } 
})