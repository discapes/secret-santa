<script lang="js">
  import { onMount } from "svelte";

  function cyrb128(str) {
    let h1 = 1779033703,
      h2 = 3144134277,
      h3 = 1013904242,
      h4 = 2773480762;
    for (let i = 0, k; i < str.length; i++) {
      k = str.charCodeAt(i);
      h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
      h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
      h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
      h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
    }
    h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
    h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
    h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
    h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
    return [
      (h1 ^ h2 ^ h3 ^ h4) >>> 0,
      (h2 ^ h1) >>> 0,
      (h3 ^ h1) >>> 0,
      (h4 ^ h1) >>> 0,
    ];
  }

  function sfc32(a, b, c, d) {
    return function () {
      a >>>= 0;
      b >>>= 0;
      c >>>= 0;
      d >>>= 0;
      var t = (a + b) | 0;
      a = b ^ (b >>> 9);
      b = (c + (c << 3)) | 0;
      c = (c << 21) | (c >>> 11);
      d = (d + 1) | 0;
      t = (t + d) | 0;
      c = (c + t) | 0;
      return (t >>> 0) / 4294967296;
    };
  }

  // @ts-ignore
  const names = __NAMES__.split(" ");

  // @ts-ignore
  const seed = cyrb128(__SEED__);
  const rand = sfc32(...seed);

  const shuffle = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  shuffle(names);

  let out = "";
  let submittedName = localStorage.getItem("name");

  function calc(text) {
    const i = names.indexOf(text.toLowerCase());
    if (i === -1) return;
    localStorage.setItem("name", text);
    submittedName = text;

    if (i == 0) out = names.at(-1);
    else out = names.at(i - 1);
  }

  function capitalize(str) {
    if (!str.length) return str;
    else return str[0].toUpperCase() + str.slice(1).toLowerCase();
  }

  onMount(() => {
    if (submittedName) calc(submittedName);
  });
</script>

<main>
  Voit katsoa vain yhden nimen, joten katso omasi.
  <form on:submit|preventDefault={(e) => calc(e.target.name.value)}>
    <input
      placeholder="Nimesi"
      readonly={!!submittedName}
      value={localStorage.getItem("name") || ""}
      name="name" />
  </form>
  Osta lahja henkilölle {capitalize(out)}.
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
    font-family: Arial, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }
</style>
