import {
  doc,
  drawChineseEnglishTextLine,
  drawLogo,
  draw_date,
  draw_en_tete,
  getTextTokensDimensions,
  print_agents_rl,
} from "./funcs_print.mjs";
import { jsPDF } from "jspdf";

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

//const ag_list = randomArray(68);

//print_agents_rl(doc, ag_list);

const loads = [
  "2024-0-1",
  [
    {
      id: 21,
      created_at: "2024-01-22T09:58:18.612353+00:00",
      sacs: 0,
      retours: 0,
      ajouts: 0,
      code: "B_M_2024_0_1",
      prob_machine: null,
      prob_courant: null,
      autre: null,
      camions: 0,
      dechires: 0,
    },
    {
      id: 27,
      created_at: "2024-01-22T13:46:30.966444+00:00",
      sacs: 0,
      retours: 0,
      ajouts: 0,
      code: "C_P_2024_0_1",
      prob_machine: null,
      prob_courant: null,
      autre: null,
      camions: 0,
      dechires: 0,
    },
  ],
];

draw_load_table(doc, loads);

function draw_load_table(data) {
  const pw = 210;
  const ph = 297;
  const pm = 15;
  const fsize = 10;

  const doc = new jsPDF();
  let fontr = doc.addFont(
    "./fonts/DroidSansFallback.ttf",
    "DroidSansFallback",
    "normal"
  );

  const rect_logo = drawLogo(doc);
  draw_date(doc, pw, pm, fsize);
  const rect_title = draw_title(doc, rect_logo.y + rect_logo.h, pw, pm, fsize);

  draw_charg_table(doc, pw, ph, pm, rect_title, fsize);

  doc.save("rl.pdf");
}

function draw_title(doc, y, pw, pm, fsize) {
  const text_tokens = [
    { lat: "RAPPORT DU CHARGEMENT JOURNALIER/" },
    { zh: "包装日报告" },
  ];
  const old_fsize = doc.getFontSize();

  doc.setFontSize(fsize);
  const { w, h } = getTextTokensDimensions(doc, fsize, text_tokens);

  const tx = pm + (pw - pm) / 2 - w / 2;
  const ty = y + fsize;

  drawChineseEnglishTextLine(doc, tx, ty, fsize, text_tokens);

  doc.setFontSize(old_fsize);

  return { x: tx, y: ty, w: w, h: h };
}

function draw_charg_table(doc, pw, ph, pm, rect_title, fsize) {
  const table_x = pm;
  const table_y = rect_title.y + fsize;
  const table_w = pw - pm * 2;
  const table_h = ph - pm - fsize - (rect_title.y + rect_title.h);

  console.log(table_w, table_h);

  const boxes_rect = [];
  const cols = [19, 21, 22, 45, 23, 29, 22];
  const rows = [15, 56, 11, 56, 13, 60, 13, 13];

  rows.forEach((row, irow) => {
    doc.line(table_x, row + rect_title.y, pw, row + rect_title.y);
  });

  doc.rect(table_x, table_y, table_w, table_h);
}
