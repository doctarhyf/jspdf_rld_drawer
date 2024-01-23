import { doc, print_agents_rl } from "./funcs_print.mjs";

function randomArray(len) {
  const agents_data = [];
  let fr = "MUTUNDA KOJI Franvale";
  for (let index = 0; index < len; index++) {
    let d = {
      nom: {
        fr: fr.slice(0, Math.random() * fr.length),
        zh: "库齐",
      },
      rld: "JJJNNNRRRJJJNNNRRRJJJNNNRRRJJJN",
      month: 1,
      year: 2024,
      poste: "INT",
      id: index,
      contrat: "GCK",
      matricule: "L0501",
    };
    agents_data.push(d);
  }

  return agents_data;
}

const ag_list = randomArray(68);

print_agents_rl(doc, ag_list);
