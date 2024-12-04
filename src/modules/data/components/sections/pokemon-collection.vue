<template>
	<p-card>
		<template #top>
			<h1>Pokemon in Collection</h1>
		</template>
		<template #body>
			<canvas id="chart"></canvas>
		</template>
	</p-card>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import Chart from 'chart.js/auto';
import { getDataFromDb } from '../../../../helpers/indexedDb';

onMounted(() => {
	gatherData();
	createChart();
});

const gatherData = async () => {
	const { pokemon } = await getDataFromDb('pokemon');
	countPokemon(pokemon);
};

let names: string[] = [];
let counts: number[] = [];
const countPokemon = (pokemonArray: string[]) => {
	const rawCounts: { [key: string]: number } = {};
	pokemonArray.forEach((pokemon) => {
		const name = pokemon;
		if (rawCounts[name]) {
			rawCounts[name]++;
		} else {
			rawCounts[name] = 1;
		}
	});

	for (const name in rawCounts) {
		names.push(name);
		counts.push(rawCounts[name]);
	}

	names.length = 18;
	counts.length = 18;
};

const createChart = () => {
	const ctx = (document.getElementById('chart') as HTMLCanvasElement).getContext('2d');

	if (!ctx) {
		return;
	}

	new Chart(ctx, {
		type: 'doughnut',
		data: {
			labels: names,
			datasets: [
				{
					label: 'Pokemon Collection',
					data: counts,
					backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
					hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
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
