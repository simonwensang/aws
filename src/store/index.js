import Vue from 'vue';
import Vuex from 'vuex';
import actions from './action';


Vue.use(Vuex);

export default new Vuex.Store({
	actions,
	state: {
		id: 0,
        title:'酒机后台管理系统',
        uploadUrl:'',
        videoId:0
	},
	mutations: {
		getId (state, id) {
			state.id = id;
		},
		changeTitle(state,title){
			state.title = title
        },
        getUploadUrl(state,uploadUrl){
			state.uploadUrl = uploadUrl
        },
        getVideoId(state,videoId){
			state.videoId = videoId
        },
	}
})
