<template>
	<div class="h-full px-8 pt-12 bg-background-secondary flex flex-col justify-between">
		<div>
			<div class="flex gap-2 items-center text-nowrap">
				<Logo class="size-8" />
				<h1 class="text-title font-bold text-2xl">POGO Data</h1>
				<p-lozenge>ALPHA</p-lozenge>
			</div>
			<div class="mt-12 space-y-6">
				<p-nav-item v-for="link in links" :key="link.to" :icon="link.icon" :to="link.to" :text="link.text" :is-active="link.to === $route.path" />
			</div>
		</div>
		<div class="py-4 mb-8 relative flex justify-center">
			<div class="bg-active/10 h-40 w-full absolute -top-24 rounded-lg z-0" />
			<img src="../assets/discord_logo.png" alt="3D Discord Logo" class="absolute -top-40 z-10 peer-hover:scale-105" />
			<div class="bg-white rounded-md w-full mx-4 relative z-20 peer">
				<a href="https://discord.com" class="block">
					<p class="text-center text-xs font-semibold text-active py-2">Join our Discord</p>
				</a>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, shallowRef } from 'vue';
import type { Component } from 'vue';
import Logo from '../assets/logo.vue';
import { ChartBarIcon, HomeIcon, InformationCircleIcon } from '@heroicons/vue/24/outline';

type NavLink = {
	icon: Component;
	to: string;
	text: string;
};

const links = ref<NavLink[]>([
	{
		icon: shallowRef(HomeIcon),
		to: '/',
		text: 'Home',
	},
	{
		icon: shallowRef(ChartBarIcon),
		to: '/data',
		text: 'Data',
	},
	{
		icon: shallowRef(InformationCircleIcon),
		to: '/about',
		text: 'About',
	},
]);
</script>
