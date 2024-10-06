import { defineStore } from 'pinia';

interface State {
	data: Record<string, object>;
	loadingState: LoadingState | undefined;
	//
	gameplay: Gameplay;
}

export const useDataStore = defineStore('data', {
	state: (): State => ({
		data: {},
		loadingState: undefined,
		gameplay: {
			pokemonCount: 0,
			playerInfo: {
				startDate: '',
				level: 0,
				totalXP: 0,
				pokecoin: 0,
				stardust: 0,
				distanceWalked: 0,
				nintendoAccountId: '',
				pokemonHomeSupportId: '',
				pokemonHomeTrainerName: '',
				buddyNickname: '',
			},
			eggsOwned: 0,
			eggsHatched: 0,
			itemCount: 0,
		},
	}),

	actions: {
		pushData(name: string, data: object) {
			this.data[name] = data;
		},
		setPokemonCount(count: number) {
			this.gameplay.pokemonCount = count;
		},
		setPlayerInfo(info: Gameplay['playerInfo']) {
			this.gameplay.playerInfo = info;
		},
		setEggsOwned(count: number) {
			this.gameplay.eggsOwned = count;
		},
		setEggsHatched(count: number) {
			this.gameplay.eggsHatched = count;
		},
		setItemCount(count: number) {
			this.gameplay.itemCount = count;
		},
	},

	getters: {
		getData: (state) => state.data,
		getPokemonCount: (state) => state.gameplay.pokemonCount,
		getPlayerInfo: (state) => state.gameplay.playerInfo,
		getEggsOwned: (state) => state.gameplay.eggsOwned,
		getEggsHatched: (state) => state.gameplay.eggsHatched,
		getItemCount: (state) => state.gameplay.itemCount,
	},
});

type Gameplay = {
	pokemonCount: number;
	playerInfo: {
		startDate: string;
		level: number;
		totalXP: number;
		pokecoin: number;
		stardust: number;
		distanceWalked: number;
		nintendoAccountId: string;
		pokemonHomeSupportId: string;
		pokemonHomeTrainerName: string;
		buddyNickname: string;
	};
	eggsOwned: number;
	eggsHatched: number;
	itemCount: number;
};

export enum LoadingState {
	UNZIPPING = 'unzipping',
	CONVERTING = 'converting',
}

export const DumpFiles: string[] = [
	// Initial ZIP
	'AccountInformation.txt',
	'ContactsImport.txt',
	'DrawingEntryHistory.tsv',
	'FitnessData.tsv',
	'FriendInvitesReceived.tsv',
	'FriendInvitesSent.tsv',
	'FriendList.tsv',
	'Gameplay.txt',
	'GameplayLocationHistory.tsv',
	'InAppPurchases.tsv',
	'LiveEventLeaderboard.tsv',
	'LiveEventRegistrationHistory_AsPurchaser.tsv',
	'LiveEventRegistrationHistory_GiftedOrRedeemedTickets.tsv',
	'LiveEventRegistrationHistory_Refund.tsv',
	'poi_image_submissions.tsv',
	'poi_location_update_submissions.tsv',
	'poi_submissions.tsv',
	'poi_takedown_request_submissions.tsv',
	'poi_text_metadata_update_submissions.tsv',
	'poi_video_submissions.tsv',
	'RecentInviteActions.tsv',
	'RecentlyUnfriended.tsv',
	'SocialProfile.txt',
	'SupportInteractions1.tsv',
	'wayfarer_player_data.json',
	// Player Journey
	'App_Installs.csv',
	'App_Sessions.csv',
	'Deploy_Pokemon1.csv',
	'Deploy_Pokemon2.csv',
	'Feed_Pokemon1.csv',
	'Feed_Pokemon2.csv',
	'First_time_used_AR_after_app_launch1_2.csv',
	'Gym_battle1.csv',
	'Gym_battle2.csv',
	'Incense_encounter1.csv',
	'Incense_encounter2.csv',
	'Join_Raid_lobby1.csv',
	'Join_Raid_lobby2.csv',
	'Lure_encounter1.csv',
	'Lure_encounter2.csv',
	'Map_Pokemon_encounter1.csv',
	'Map_Pokemon_encounter2.csv',
	'Pokestop_spin1.csv',
	'Pokestop_spin2.csv',
	'Sfida_capture1.csv',
	'Sfida_capture2.csv',
	'User_Attribution_Installs.csv',
	'User_Attribution_Sessions.csv',
];

export const usefulFiles: string[] = [
	'FriendList.tsv',
	'FriendInvitesSent.tsv',
	'FriendInvitesReceived.tsv',
	'Gameplay.txt',
	'InAppPurchases.tsv',
	'App_Installs.csv',
	'App_Sessions.csv',
	'Deploy_Pokemon1.csv',
	'Deploy_Pokemon2.csv',
	'Feed_Pokemon1.csv',
	'Feed_Pokemon2.csv',
	'Gym_battle1.csv',
	'Gym_battle2.csv',
	'Incense_encounter1.csv',
	'Incense_encounter2.csv',
	'Join_Raid_lobby1.csv',
	'Join_Raid_lobby2.csv',
	'Lure_encounter1.csv',
	'Lure_encounter2.csv',
	'Map_Pokemon_encounter1.csv',
	'Map_Pokemon_encounter2.csv',
	'Pokestop_spin1.csv',
	'Pokestop_spin2.csv',
];
