import { defineStore } from 'pinia';

interface State {
	data: object[];
}

export const useDataStore = defineStore('data', {
	state: (): State => ({
		data: [],
	}),

	actions: {
		setData(data: object[]) {
			this.data = data;
		},
	},

	getters: {
		data: (state) => state.data,
	},
});
