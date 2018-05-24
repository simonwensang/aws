import Vue from 'vue';
import Vuex from 'vuex';
import actions from './action';


Vue.use(Vuex);

export default new Vuex.Store({
	actions,
	state: {
		id: 0
	},
	mutations: {
		getId (state, id) {
			state.id = id;
		}
	}
})
