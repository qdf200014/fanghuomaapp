<template>
    <navigator v-if="isShow" :url="`/pages/easy-chat/chat?sessionId=${session.id}`"> <!-- //聊天页面 -->
            <view class="im-flex im-border-bottom im-py-2 im-pl-2 position-relative">
                <!-- 头像展示 -->
                <session-item-avatar :scene="session.scene" :to="session.to" v-bind="$attrs" ></session-item-avatar>
                <!-- 会话信息 -->
                <view class="im-flex-column im-flex-1 im-px-2">
                    <view class="im-flex im-flex-1 im-justify-between im-align-center">
                        <view class="im-flex im-align-center im-flex-1">
                            <text v-if="session.isTop" class="im-font-28 im-font-blue-2 mr-1">{{ session.isTop ? '[置顶]' : '' }}</text>
                            <text class="im-font-32 im-text-ellipsis im-flex-1">{{sessionName}}</text>
                        </view>
                        <text class="im-font-25 im-font-light">{{session.updateTime | formatTime}}</text>
                    </view>
                    <view class="im-flex im-flex-1 im-justify-between im-align-center">
                        <text class="im-font-28 im-text-ellipsis im-font-light" style="max-width: 540rpx;">{{lastMsgText}}</text>
                        <view v-if="session.unread > 0" class="im-bg-red-2 im-round-full im-flex im-justify-center im-align-center" style="width: 35rpx;height: 35rpx;">
                            <text class="im-font-23 im-font-white">{{ session.unread >= 99 ? 99 : session.unread}}</text>
                        </view>
                    </view>
                </view>
            </view>
        </navigator>
</template>
 
<script>
import sessionItemAvatar from '@/components/easy-chat/session-item-avatar.vue'
import useDayjs from '@/common/NIM/useDayjs.js'
 
 
export default {
    props: {
        session: {
            type: Object,
            default: () => {
                return {}
            }
        },
        searchKey: {
            type: String,
            default: ''
        }
    },
    components: {
        sessionItemAvatar
    },
    data() {
        return {
        }
    },
    computed: {
        userObj() {
            return this.$store.getters['initNim/userObj']
        },
        teamObj() {
            return this.$store.getters['initNim/teamObj']
        },
        sessionName() {
            if (this.session.scene === 'p2p') {
                return (this.userObj[this.session.to] && this.userObj[this.session.to].nick) || '未知用户'
            } else {
                return (this.teamObj[this.session.to] && this.teamObj[this.session.to].name) || '未知群'
            }
        },
        // 显示最后一条消息的简略信息
        lastMsgText() {
            let lastMsg = this.session.lastMsg
            let text = '[新消息]'
            switch(lastMsg.type) {
                case 'text':
                    text = lastMsg.text
                    if (lastMsg.scene === 'team') {
                        text = `[${lastMsg.fromNick}]:${lastMsg.text}`
                    }
                    break;
                case 'image':
                    text = '[图片]'
                    if (lastMsg.scene === 'team') {
                        text = `[${lastMsg.fromNick}]:[图片]`
                    }
                    break;
                case 'audio':
                    text = '[语音]'
                    if (lastMsg.scene === 'team') {
                        text = `[${lastMsg.fromNick}]:[语音]`
                    }
                    break;
                case 'video':
                    text = '[视频]'
                    if (lastMsg.scene === 'team') {
                        text = `[${lastMsg.fromNick}]:[视频]`
                    }
                    break;
                case 'file':
                    text = '[文件]'
                    if (lastMsg.scene === 'team') {
                        text = `[${lastMsg.fromNick}]:[文件]`
                    }
                    break;
                case 'custom':
                    text = '自定义消息'
                    let content = JSON.parse(lastMsg.content)
                    switch (content.type) {
                        case 'msgCard':
                            text = '[火情消息]'
                            break;
                        case 'votes':
                            text = '[投票消息]'
                            break;
                        case 'joinBiaoJue':
                            text = '[表决消息]'
                            break;
                        case 'confirmConclusion':
                            text = '[确认结论]'
                            break;
                        case 'adviceCard':
                            text = '[通知书]'
                            break;
                    }
                    if (lastMsg.scene === 'team') {
                        text = `[${lastMsg.fromNick}]:` + text
                    }
                    break;
                case 'tip':
                    text = '提醒消息'
                    let tipMsg = lastMsg
                    let tipContent = JSON.parse(tipMsg.tip)
                    // console.log('asdasdasdasdasdasdasdasdaadasdasdada', tipContent);
                    let tipType = tipContent.type
                    switch (tipType) {
                        case 'deleteMsg':
                            if (tipMsg.flow === 'out') {
                                text = '你撤回了一条消息'
                            } else {
                                text = `${tipMsg.fromNick}撤回了一条消息`
                            }
                            break;
                        case 'dailyPraise':
                            if (tipMsg.flow === 'out') {
                                text = '你点赞了TA的日报'
                            } else {
                                text = `${tipMsg.fromNick}点赞了您的日报`
                            }
                            break;
                        case 'dailyComment':
                            if (tipMsg.flow === 'out') {
                                text = '你评论了TA的日报'
                            } else {
                                text = `${tipMsg.fromNick}评论了您的日报`
                            }
                            break;
                        case 'dailyMention':
                            if (tipMsg.flow === 'out') {
                                text = `我在评论${tipContent.data.dailyOwner}的日报时提到了TA`
                            } else {
                                text = `${tipMsg.fromNick}在评论${tipContent.data.dailyOwner}的日报时提到了我`
                            }
                            break;
                        case 'cancelCallp2p' :
                            text = `[${tipContent.data.callType === 'audio' ? '语音' : '视频'}通话]`
                            break;
                        case 'endCallp2p' :
                            text = `[${tipContent.data.callType === 'audio' ? '语音' : '视频'}通话]`
                            break;
                        case 'rejectCallp2p' :
                            text = `[${tipContent.data.callType === 'audio' ? '语音' : '视频'}通话]`
                            break;
                        case 'sendCallteam':
                            text = `[${tipContent.data.callType === 'audio' ? '语音' : '视频'}通话]`
                            break;
                        case 'cancelCallteam':
                            text = `[${tipContent.data.callType === 'audio' ? '语音' : '视频'}通话]`
                            break;
                        case 'endCallteam':
                            text = `[${tipContent.data.callType === 'audio' ? '语音' : '视频'}通话]`
                            break;
                    }
                    break;
                case 'notification':
                    text = '群通知消息'
                    let msg = lastMsg
                    let attach = lastMsg.attach
                    let type = attach.type
                    switch (type) {
                        case 'acceptTeamInvite':
                            text = `${msg.fromNick} 加入了本群`
                            break;
                        case 'leaveTeam':
                            text = `${msg.fromNick} 退出了本群`
                            break;
                        case 'removeTeamMembers':
                            let remove_user = attach.users.slice(0, -1)
                            let remove_userText = remove_user.map(item => item.nick).join()
                            text = `${msg.fromNick} 踢出了 ${remove_userText}`
                            break;
                        case 'addTeamMembers':
                            let add_user = attach.users.slice(0, -1)
                            let add_userText = add_user.map(item => item.nick).join()
                            text = `${msg.fromNick} 邀请了 ${add_userText} 加入了${attach.team.type === 'advanced' ? '会商' : '群聊'}`
                            break;
                        case 'updateTeam':
                            text = `${msg.fromNick} 更新了本群`
                            if (attach.team.name) {
                                text = `${msg.fromNick} 将本群昵称改为 ${attach.team.name}`
                            } else if (attach.team.hasOwnProperty('mute')) {
                                text = `${msg.fromNick} ${attach.team.mute ? '开启' : '关闭'}了全员禁言模式`
                            }
                            break;
                        case 'dismissTeam':
                            text = `${msg.fromNick} 解散了本群`
                            break;
                        case 'transferTeam':
                            text = `${attach.users[0].nick} 转移主持人身份给 ${attach.users[1].nick}`
                            break;
                    }
                    break;
            }
            return text
        },
        // 是否显示
        isShow() {
            // 如果群聊 在群数组对象中找不到 不显示
            if (this.session.scene === 'team' && !this.teamObj[this.session.to]) {
                return false
            }
            
            if (this.searchKey != '') {
                if (this.sessionName.indexOf(this.searchKey) > -1) {
                    this.$emit('searchSuccess')
                    return true
                } else {
                    return false
                }
            }
            return true
        }
    },
    filters: {
        formatTime(n) {
            return useDayjs.formatSessionItemTime(n)
        }
    },
    methods: {
        
    }
}
</script>
 
<style scoped>
</style>
