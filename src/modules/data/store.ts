import { defineStore } from 'pinia';

interface State {
	data: Record<string, object>;
	loadingState: LoadingState | undefined;
}

export const useDataStore = defineStore('data', {
	state: (): State => ({
		data: {},
		loadingState: undefined,
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

export enum LoadingState {
	UNZIPPING = 'unzipping',
	CONVERTING = 'converting',
}
