<template>
	<div class="border border-[#E6E8EC] rounded-lg">
		<div class="font-bold text-lg mt-3 mx-4">
			<slot name="top" />
		</div>

		<div class="mx-4 my-3">
			<slot name="body" />
		</div>
	</div>
</template>
