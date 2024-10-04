import { defineStore } from 'pinia';

interface State {
	data: Record<string, object>;
}

export const useDataStore = defineStore('data', {
	state: (): State => ({
		data: {},
	}),

	actions: {
		pushData(name: string, data: object) {
			this.data[name] = data;
		},
	},

	getters: {
		getData: (state) => state.data,
	},
});
