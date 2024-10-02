<template>
	<div class="bg-slate-400 flex items-start flex-col rounded-lg">
		<div class="font-bold text-lg px-2 pt-2">
			<slot name="top" />
		</div>

		<div class="p-2">
			<slot name="content" />
		</div>
	</div>
</template>
