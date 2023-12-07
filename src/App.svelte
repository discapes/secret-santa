<script lang="ts">
	import { onMount } from "svelte";
	import { calculate, capitalize } from "./lib";

	// @ts-ignore
	const results = calculate(__NAMES__, __SEED__);

	let out = "";
	let submittedName = localStorage.getItem("name");

	function onSubmit(e: SubmitEvent) {
		tryWithName((e as any)?.target?.name?.value);
	}

	function tryWithName(myName: string | undefined) {
		if (!myName?.length) return;
		const myTarget = results[myName.toLowerCase()];
		if (!myTarget?.length) return;
		localStorage.setItem("name", myName);
		submittedName = myName;
		out = myTarget;
	}

	onMount(() => {
		if (submittedName) tryWithName(submittedName);
	});
</script>

<main>
	Voit katsoa vain yhden nimen, joten katso omasi.
	<form on:submit|preventDefault={onSubmit}>
		<input placeholder="Nimesi" readonly={!!submittedName} value={submittedName} name="name" />
	</form>
	Keksi lahja henkilölle {capitalize(out)}.
</main>

<style>
	input {
		padding: 10px;
		font-size: 20px;
	}

	main {
		padding: 10px;
		text-align: center;
		font-size: 30px;
		display: flex;
		height: 100vh;
		justify-content: center;
		align-items: center;
		gap: 15px;
		flex-direction: column;
		font-family:
			Arial,
			-apple-system,
			BlinkMacSystemFont,
			"Segoe UI",
			Roboto,
			Oxygen,
			Ubuntu,
			Cantarell,
			"Open Sans",
			"Helvetica Neue",
			sans-serif;
	}
</style>
