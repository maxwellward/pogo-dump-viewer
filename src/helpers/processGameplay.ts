import { addDataToDb } from './indexedDb';

type Gameplay = {
	pokemonCount: number;
	playerInfo: PlayerInfo;
	eggsOwned: number;
	eggsHatched: number;
	itemCount: number;
};

export type PlayerInfo = {
	startDate: string;
	level: number;
	totalXP: number;
	pokecoins: number;
	stardust: number;
	distanceWalked: number;
	nintendoAccountId: string;
	supportId: string;
	username: string;
	buddyNickname: string;
};

let data: Gameplay = {
	pokemonCount: 0,
	playerInfo: {
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
	},
	eggsOwned: 0,
	eggsHatched: 0,
	itemCount: 0,
};

export const processGameplay = async (file: File) => {
	const content = await file.text();

	extractPokemonCount(content);
	extractPlayerInfo(content);
	extractEggInfo(content);
	extractItemCount(content);
	const pokemon = extractPokemonCollection(content);

	addDataToDb({ id: 'gameplay', ...data });
	addDataToDb({ id: 'pokemon', pokemon });
};

// Individual Processors

// Pokemon count
const extractPokemonCount = (content: string) => {
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

	data.pokemonCount = pokemonCount;
};

const extractPlayerInfo = (content: string) => {
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

	const playerInfo: { [key in keyof typeof playerInfoRegex]: any } = {
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

	data.playerInfo = playerInfo;
};

const extractEggInfo = (content: string) => {
	const eggLineStart = content.indexOf('You have hatched');
	if (eggLineStart === -1) return 0;

	const eggLine = content.slice(eggLineStart, content.indexOf('\n', eggLineStart)).trim();

	// Current eggs
	const currentEggMatch = eggLine.match(/currently have (\d+) eggs/);
	const currentEggs = currentEggMatch ? parseInt(currentEggMatch[1]) : 0;

	// Total hatched eggs
	const hatchedEggMatch = eggLine.match(/You have hatched (\d+)/);
	const hatchedEggs = hatchedEggMatch ? parseInt(hatchedEggMatch[1]) : 0;

	data.eggsOwned = currentEggs;
	data.eggsHatched = hatchedEggs;
};

const extractItemCount = (content: string) => {
	const itemCountRegex = /You have (\d+) items/;
	const match = content.match(itemCountRegex);
	const itemCount = match ? parseInt(match[1]) : 0;

	data.itemCount = itemCount;
};

const extractPokemonCollection = (content: string) => {
	const start = content.indexOf('Pokemon in your collection:');
	if (start === -1) return [];
	const collectionSection = content.slice(start).split('\n').slice(1);

	const pokemonNames = [];

	for (let line of collectionSection) {
		line = line.trim();
		if (line === '' || line.startsWith('You have')) break;
		line = line.replace(/\s*\(.*\)$/, '');

		// Extract name, handling both formats: with and without prefix
		let name = line.includes('_POKEMON_') ? line.split('_POKEMON_').pop() : line;

		if (name) {
			name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
		}

		pokemonNames.push(name);
	}

	return pokemonNames;
};
