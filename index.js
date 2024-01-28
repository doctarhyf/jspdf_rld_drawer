import { loads_data, loads_totals } from "./data.mjs";
import {
  doc,
  drawChineseEnglishTextLine,
  drawLogo,
  drawTextInRect2,
  draw_date,
  draw_en_tete,
  draw_page_title,
  draw_text_with_borders,
  draw_title,
  getTextTokensDimensions,
  print_agents_rl,
} from "./funcs_print.mjs";
import { jsPDF } from "jspdf";

draw_loads_table(loads_data, loads_totals);

function draw_loads_table(loads, totals) {
  if (!(Object.entries(loads).map && Object.entries(loads).length > 0)) {
    const error =
      "loads param should be an array of loads, with length greater than zero!";
    console.error(error);
    return;
  }

  const loads_arr = Object.entries(loads);
  let [y, m, d] = loads_arr[0][0].split("-");

  m = Number(m);
  m = m + 1 > 12 ? 1 : m + 1;

  const date = `${m}/${y}`;

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
  const rect_title = draw_page_title(
    doc,
    [{ lat: `CHARGEMENT MENSUEL ${date}`, zh: "包装报告" }],
    rect_logo.y + rect_logo.h,
    pw,
    pm,
    fsize
  );

  const table_x = pm;
  const table_y = rect_title.y + fsize;
  const table_w = pw - pm * 2;
  const table_h = ph - table_y - pm;
  draw_month_loads_table(
    doc,
    table_x,
    table_y,
    table_w,
    table_h,
    Object.entries(loads),
    totals
  );

  doc.save("rl.pdf");
}

function draw_month_loads_table(
  doc,
  table_x,
  table_y,
  table_w,
  table_h,
  loads,
  totals,
  fsize = 10
) {
  const old_fisze = doc.getFontSize();
  doc.setFontSize(fsize);
  const headers = [
    "date",
    "equipe",
    "shift",
    "sacs",
    "t",
    "bonus",
    "camions",
    "dechires",
    "retours",
    "ajouts",
  ];

  loads.forEach((day, dayi) => {
    //doc.text(day[0], table_x, table_y + i * fsize);
    const date = day[0];
    const shift_data = day[1];
    const shift_data_len = shift_data.length;
    const dx = table_x;
    const dy = table_y + dayi * fsize;

    let rect = draw_text_with_borders(doc, dx, dy, 1.2, fsize, [{ lat: date }]);

    shift_data.forEach((s, si) => {
      draw_text_with_borders(
        doc,
        rect.w + 15,
        rect.y + si * fsize,
        1.2,
        fsize,
        [{ lat: "dt" }]
      );
    });

    // console.log(day[1]);
    // const [team, shift, y, m, d] = day[1].code;
    /* let tx = table_x;
    let ty = table_y;
    let rect = { x: tx, y: ty };

    day.forEach((dt, i) => {
      rect = draw_text_with_borders(doc, tx, ty, 1.2, 12, [{ lat: dt }]);
    }); */
  });

  doc.rect(table_x, table_y, table_w, table_h);
  doc.setFontSize(old_fisze);
}
