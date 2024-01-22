import {
  print_agent_roulement,
  doc,
  draw_en_tete,
  print_agents_list_roulement,
  centeTextInRect,
  drawTextInRect,
  drawTextInRect2,
} from "./funcs_print.mjs";

const agz = [
  ...Array(15).fill({
    nom: {
      fr: "MUTUNDA KOJI Franvale",
      zh: "库齐",
    },
    rld: "JJJNNNRRRJJJNNNRRRJJJNNNRRRJJJN",
    month: 1,
    year: 2024,
    poste: "INT",
    id: 13,
    contrat: "GCK",
    matricule: "L0501",
  }),
];

print_agents_rl(doc, agz);

function print_agents_rl(doc, agents_list) {
  const pw = 297;
  const pm = 15;
  const fsize = 10;

  const LOGO_X = pm;
  const LOGO_Y = pm;
  const LOGO_W = (293 / 10) * 2;
  const LOGO_H = (66 / 10) * 2;

  draw_date(doc, pw, pm, fsize);
  draw_logo(doc, LOGO_X, LOGO_Y, LOGO_W, LOGO_H);

  let orig_rly = LOGO_H + pm + 10;
  let rly = orig_rly;
  let rlx = pm;

  agents_list.forEach((el, i) => {
    draw_agent_single_line(doc, { ...el, id: i }, rlx, rly + i * fsize, pw, pm);
  });

  doc.save("rl.pdf");
}

function draw_agent_single_line(doc, agd, x, y, pw, pm) {
  console.log(agd);

  const pct = 1.2;
  const fsize = 10;

  let rect = centeTextInRect(
    doc,
    x,
    y,
    pct,
    fsize,
    [{ lat: "Num/" }, { zh: "序号" }],
    [{ lat: `${agd.id + ""}` }]
  );

  rect = centeTextInRect(doc, rect.x + rect.w, y, pct, fsize, [
    { lat: agd.nom.fr + " " },
    { zh: agd.nom.zh },
  ]);

  rect = centeTextInRect(doc, rect.x + rect.w, y, pct, fsize, [
    { lat: `${agd.contrat} ${agd.matricule}` },
  ]);

  let boxes_w = pw - pm - (rect.x + rect.w);
  let rld_data = agd.rld.split("");
  let days_count = agd.rld.length;
  let box_w = boxes_w / agd.rld.length;
  let box_h = rect.h;

  let box_orig_x = rect.x + rect.w;
  let box_orig_y = rect.y;
  let bx = box_orig_x;
  let by = box_orig_y;

  rld_data.forEach((el, i) => {
    drawTextInRect2(doc, el, fsize, bx + i * box_w, by, box_w, box_h, true);
  });
}

function draw_logo(doc, x, y, w, h) {
  const logo =
    "data:image/png;base64,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";

  doc.addImage(logo, "PNG", x, y, w, h);
}

function draw_date(doc, page_width, page_margin, font_size) {
  const old_font_size = doc.getFontSize();
  doc.setFontSize(font_size);
  const date = new Date().toDateString();
  let { w, h } = doc.getTextDimensions(date);

  doc.text(date, page_width - w - page_margin, page_margin);
  doc.setFontSize(old_font_size);
}
