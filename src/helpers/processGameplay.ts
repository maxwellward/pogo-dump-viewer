import { useDataStore } from '../modules/data/store';

export const processGameplay = async (file: File) => {
	const content = await file.text();
	const dataStore = useDataStore();

	extractPokemonCount(content, dataStore);
	extractPlayerInfo(content, dataStore);
	extractEggInfo(content, dataStore);
	extractItemCount(content, dataStore);
};

// Individual Processors

// Pokemon count
const extractPokemonCount = (content: string, dataStore: any) => {
	// Find the start of the "Pokemon in your collection:" section
	const start = content.indexOf('Pokemon in your collection:');
	if (start === -1) return 0; // If no section found, return 0

	// Extract the substring starting from the "Pokemon in your collection:"
	const collectionSection = content.slice(start).split('\n').slice(1);

	let pokemonCount = 0;

	// Count lines until we hit a blank line or a non-pokemon line (e.g. "You have hatched")
	for (let line of collectionSection) {
		line = line.trim();
		if (line === '' || line.startsWith('You have')) break; // End of the section
		pokemonCount++;
	}

	dataStore.setPokemonCount(pokemonCount);
};

const extractPlayerInfo = (content: string, dataStore: any) => {
	const playerInfoRegex = {
		startDate: /Start date:\s*(.*)/,
		level: /Level:\s*(\d+)/,
		totalXP: /Total XP:\s*(\d+)/,
		pokecoins: /Pokecoin:\s*(\d+)/,
		stardust: /Stardust:\s*(\d+)/,
		distanceWalked: /Distance walked:\s*([\d.]+)\s*km/,
		nintendoAccountId: /Nintendo Account ID:\s*(\w+)/,
		supportId: /Pokemon Home Support ID:\s*(\w+)/,
		username: /Pokemon Home Trainer Name:\s*(.*)/,
		buddyNickname: /Buddy nickname:\s*(.*)/,
	};

	const playerInfo: { [key in keyof typeof playerInfoRegex]: string | number } = {
		startDate: '',
		level: 0,
		totalXP: 0,
		pokecoins: 0,
		stardust: 0,
		distanceWalked: 0,
		nintendoAccountId: '',
		supportId: '',
		username: '',
		buddyNickname: '',
	};

	for (const [key, regex] of Object.entries(playerInfoRegex)) {
		const match = content.match(regex);
		if (match) {
			playerInfo[key as keyof typeof playerInfo] = isNaN(Number(match[1])) ? match[1] : parseFloat(match[1]);
		}
	}

	dataStore.setPlayerInfo(playerInfo);
};

const extractEggInfo = (content: string, dataStore: any) => {
	const eggLineStart = content.indexOf('You have hatched');
	if (eggLineStart === -1) return 0;

	const eggLine = content.slice(eggLineStart, content.indexOf('\n', eggLineStart)).trim();

	// Current eggs
	const currentEggMatch = eggLine.match(/currently have (\d+) eggs/);
	const currentEggs = currentEggMatch ? parseInt(currentEggMatch[1]) : 0;

	// Total hatched eggs
	const hatchedEggMatch = eggLine.match(/You have hatched (\d+)/);
	const hatchedEggs = hatchedEggMatch ? parseInt(hatchedEggMatch[1]) : 0;

	dataStore.setEggsOwned(currentEggs);
	dataStore.setEggsHatched(hatchedEggs);
};

const extractItemCount = (content: string, dataStore: any) => {
	const itemCountRegex = /You have (\d+) items/;
	const match = content.match(itemCountRegex);
	const itemCount = match ? parseInt(match[1]) : 0;

	dataStore.setItemCount(itemCount);
};
