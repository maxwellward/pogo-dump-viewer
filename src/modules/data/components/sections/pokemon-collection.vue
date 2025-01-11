<template>
	<p-card>
		<template #top>
			<h1>Pokemon in Collection ({{ totalPokemon }})</h1>
		</template>
		<template #body>
			<canvas id="chart"></canvas>
		</template>
	</p-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Chart from 'chart.js/auto';
import { getDataFromDb } from '../../../../helpers/indexedDb';
import pokedex from '../../../../data/pokedex.json';

onMounted(async () => {
	await gatherData();
	createChart();
});

const totalPokemon = ref(0);
const gatherData = async () => {
	const { pokemon } = await getDataFromDb('pokemon');
	totalPokemon.value = pokemon.length;
	countPokemon(pokemon);
};

let types: string[] = [];
let counts: number[] = [];
const countPokemon = (pokemonArray: string[]) => {
	const rawTypeCounts: { [key: string]: number } = {};
	pokemonArray.forEach((pokemon) => {
		const pokemonFromJson = pokedex.filter((p) => p.name === pokemon)[0];

		if (!pokemonFromJson) {
			console.error(`No types found for pokemon '${pokemon}'. Skipping. Please report this!`);
			return;
		}

		const types = pokemonFromJson.type;

		types.forEach((type) => {
			if (rawTypeCounts[type]) {
				rawTypeCounts[type]++;
			} else {
				rawTypeCounts[type] = 1;
			}
		});
	});

	for (const type in rawTypeCounts) {
		types.push(`${type} (${rawTypeCounts[type]})`);
		counts.push(rawTypeCounts[type]);
	}
};

const createChart = () => {
	const ctx = (document.getElementById('chart') as HTMLCanvasElement).getContext('2d');

	if (!ctx) {
		return;
	}

	new Chart(ctx, {
		type: 'doughnut',
		data: {
			labels: types,
			datasets: [
				{
					label: 'Pokemon Collection',
					data: counts,
					backgroundColor: [
						'#FFB3BA',
						'#FFDFBA',
						'#FFFFBA',
						'#BAFFC9',
						'#BAE1FF',
						'#FFC3A0',
						'#FFABAB',
						'#FFDAAB',
						'#DDFFAB',
						'#ABE4FF',
						'#D4A5A5',
						'#D1C4E9',
						'#B3E5FC',
						'#C8E6C9',
						'#FFCDD2',
						'#F8BBD0',
						'#E1BEE7',
						'#D7CCC8',
					],
					hoverBackgroundColor: [
						'#FFB3BA',
						'#FFDFBA',
						'#FFFFBA',
						'#BAFFC9',
						'#BAE1FF',
						'#FFC3A0',
						'#FFABAB',
						'#FFDAAB',
						'#DDFFAB',
						'#ABE4FF',
						'#D4A5A5',
						'#D1C4E9',
						'#B3E5FC',
						'#C8E6C9',
						'#FFCDD2',
						'#F8BBD0',
						'#E1BEE7',
						'#D7CCC8',
					],
				},
			],
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
		},
	});
};
</script>
