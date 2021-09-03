<template>
    <view class="im-flex-column im-bg-white im-pb-4">
        <view class="im-flex im-flex-1 im-mt-4" v-for="(arrList,index) in menuList" :key="index">
            <view class="im-flex-column im-flex-1 im-justify-center im-align-center" v-for="item2 in arrList"
                :key="item2.id" @tap="onClick(item2,index)">
                <image :src="item2.icon" mode="aspectFill" style="width: 90rpx;height: 90rpx;"></image>
                <text class="im-mt-2 menu-text">{{item2.name}}</text>
            </view>
        </view>
    </view>
</template>
 
<script>
    import appConfig from '@/common/appConfig/appConfig.js'
 
    export default {
        name: "home-menu-list",
        props:{
            userStatus:{
                type:Number,
                default:()=>0
            },
            oldToken:{
                type:String,
                default:()=>{}
            },
        },
        mounted(){
            console.log(this.userStatus,this.oldToken)
        },
        data() {
            return {
                menuList: [
                    [{
                        id: 'jinshan',
                        name: '进山数据',
                        icon: '/static/homePage/jinshanshuju.png'
                    }, {
                        id: 'yujing',
                        name: '火险预警',
                        icon: '/static/homePage/huoxianyujing.png'
                    },
                    // {
                    //     id: 'weixin',
                    //     name: '卫星火情',
                    //     icon: '/static/homePage/weixinghuoqing.png'
                    // }, 
                    {
                        id: 'lishi',
                        name: '历史今日',
                        icon: '/static/work/history.png'
                    }, {
                        id: 'yinhuan',
                        name: '隐患整改',
                        icon: '/static/homePage/yinhuanzhenggai.png'
                    }],
                    [{
                        id: 'huishang',
                        name: '会商',
                        icon: '/static/homePage/huishang.png'
                    }, {
                        id: 'luntan',
                        name: '互动',
                        icon: '/static/homePage/luntan.png'
                    }, {
                        id: 'xuexi',
                        name: '学习',
                        icon: '/static/homePage/xuexi.png'
                    }, {
                        id: 'tongzhi',
                        name: '通知',
                        icon: '/static/homePage/tongzhi.png'
                    }]
                ],
                xixi:true
            };
        },
        methods: {
            onClick(item, index) {
                console.log(item, appConfig.homeMenuDisable.indexOf(item.id) > -1)
                // if (appConfig.homeMenuDisable.indexOf(item.id) > -1) {
                //     uni.showToast({
                //         title: appConfig.tipText,
                //         icon: 'none'
                //     })
                // }
                
                if (item.id === 'yujing' || item.id === 'lishi') {
                    
                } else {
                    if(this.userStatus != 1){
                        uni.showToast({
                            title:'您暂无权限',
                            icon:'none'
                        })
                        return ;
                    }
                }
                
                
                switch (item.id) {
                    case 'yinhuan':
                        uni.navigateTo({
                            url: '/pages/tabbar-4-detail/danger/danger'
                        })
                        break;
                    case 'lishi':
                        uni.navigateTo({
                            url: '/pages/tabbar-1-detail/historyToday/historyToday'
                        })
                        break;
                    case 'yujing':
                        uni.navigateTo({
                            url:'/pages/tabbar-1-detail/fireRisk/fireRisk'
                        })
                        break;
                    case 'huishang':
                        uni.navigateTo({
                            url: '/pages/discussion/index'
                        })
                        break;
                    case 'luntan':
                        this.toForumDetail(0)
                        break;
                    case 'xuexi':
                        this.toForumDetail(2)
                        break;
                    case 'tongzhi':
                        uni.navigateTo({
                            url: '/pages/tabbar-4-detail/government/government'
                        })
                        break;
                    case 'jinshan':
                        if(this.userStatus == 1 && this.oldToken != ''){
                            uni.navigateTo({
                                url: '/pages/tabbar-4-detail/mountain/mountain'
                            })
                        }else{
                            uni.showToast({
                                title:'您暂无权限',
                                icon:'none'
                            })
                        }
                            // uni.navigateTo({
                            //     url: '/pages/tabbar-4-detail/mountain/mountain'
                            // })
                        break;
                    // case 'yujing':
                    //     uni.navigateTo({
                    //         url: '/pages/tabbar-4-detail/fireWarn/fireWarn'
                    //     })
                    //     break;
                }
                
                return;
                if (index == 2) {
                    uni.navigateTo({
                        url: '../../tabbar-1-detail/historyToday/historyToday'
                    })
                } else if (index == 0) {
                    if (this.userInfo.status != 1) {
                        uni.showToast({
                            title: '您的资质审核未通过~',
                            icon: 'none'
                        })
                    } else {
                        uni.navigateTo({
                            url: '../../discussion/index'
                        })
                    }
 
                } else if (index == 1) {
                    if (this.userInfo.status != 1) {
                        uni.showToast({
                            title: '您的资质审核未通过~',
                            icon: 'none'
                        })
                    } else {
                        uni.navigateTo({
                            url: '../../tabbar-1-detail/dailyNews/dailyNews'
                        })
                    }
                } else if (index == 3) {
                    uni.navigateTo({
                        url: '../../tabbar-4-detail/government/government'
                    })
                }
            },
            toForumDetail(type,id){
                
                uni.$api.forum.autologin({
                    types: type,
                    id: id ? id : 0
                }).then(res => {
                    console.log(JSON.stringify(res.data.data) )
                    uni.showLoading()
                    uni.navigateTo({
                        url:'./forum/forumWeb?forumMsg=' + encodeURIComponent(JSON.stringify({
                        'forumUrl': res.data.data
                        }))
                    })
                    uni.hideLoading()
                }).catch(err => {
                    console.log(err);
                })
                
            },
        }
    }
</script>
 
<style scoped>
    .menu-text {
        color: #606266;
        font-size: 26rpx;
    }
</style>