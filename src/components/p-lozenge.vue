<template>
	<span>
		<span class="lozenge" :appearance="appearance" :bold="isBold">
			<slot />
		</span>
	</span>
</template>

<script>
export default {
	props: {
		appearance: {
			type: String,
			validator: (value) => ['default', 'success', 'removed', 'inprogress', 'new', 'moved'].includes(value),
			default: 'default',
		},
		isBold: {
			type: Boolean,
			default: false,
		},
	},
};
</script>

<style scoped>
.lozenge {
	background-color: var(--ds-background-neutral, #dfe1e6);
	box-sizing: border-box;
	color: var(--ds-text-subtle, #42526e);
	display: inline;
	font-size: 11px;
	font-weight: 700;
	line-height: 1;
	text-transform: uppercase;
	vertical-align: baseline;
	border-radius: 3px;
	padding: 1px 4px 2px;
	overflow: hidden;
	max-width: 200px;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.lozenge[appearance='success'] {
	background-color: var(--ds-background-success, #e3fcef);
	color: var(--ds-text-success, #006644);
}

.lozenge[appearance='removed'] {
	background-color: var(--ds-background-danger, #ffebe6);
	color: var(--ds-text-danger, #de350b);
}

.lozenge[appearance='inprogress'] {
	background-color: var(--ds-background-information, #deebff);
	color: var(--ds-text-information, #0052cc);
}

.lozenge[appearance='new'] {
	background-color: var(--ds-background-discovery, #eae6ff);
	color: var(--ds-text-discovery, #403294);
}

.lozenge[appearance='moved'] {
	background-color: var(--ds-background-warning, #fffae6);
	color: var(--ds-text-warning, #974f0c);
}

.lozenge[bold] {
	background-color: var(--ds-background-neutral-bold, #42526e);
	color: var(--ds-text-inverse, #ffffff);
}

.lozenge[bold][appearance='success'] {
	background-color: var(--ds-background-success-bold, #00875a);
}

.lozenge[bold][appearance='removed'] {
	background-color: var(--ds-background-danger-bold, #de350b);
}

.lozenge[bold][appearance='inprogress'] {
	background-color: var(--ds-background-information-bold, #0052cc);
}

.lozenge[bold][appearance='new'] {
	background-color: var(--ds-background-discovery-bold, #5243aa);
}

.lozenge[bold][appearance='moved'] {
	background-color: var(--ds-background-warning-bold, #ffab00);
	color: rgb(23, 43, 77);
}
</style>
