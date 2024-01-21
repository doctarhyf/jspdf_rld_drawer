import { jsPDF } from "jspdf";
import {
  hline,
  vline,
  drawChineseEnglishTextLine,
  ls_food,
  agents_food,
  agents_rl,
  drawLogo,
  draw_en_tete,
  centeTextInRect,
} from "./funcs.mjs";

const orientation = "landscape";
const doc = new jsPDF({ orientation: orientation });
doc.addFont("DroidSansFallback.ttf", "DroidSansFallback", "normal");
const PG_W = orientation === "landscape" ? 297 : 210;
const PG_H = orientation === "landscape" ? 210 : 297;
const LOGO_H = (66 / 10) * 2;

//

function draw_rl(agents_rl) {
  drawLogo();

  const rld_data = agents_rl[0].rld;
  const num_days = rld_data.split("").length;

  const marg = 20;
  const y_start = LOGO_H * 3;

  let names_w = 0;
  agents_rl.map((it, i) => {
    const { nom, rld } = it;
    let line_y = y_start + i * 10;
    //doc.line(marg, line_y, PG_W - marg, line_y);
    hline(doc, marg, line_y, PG_W - marg * 2);
    const name_text_dims = doc.getTextDimensions(it.nom);

    //doc.text(it.nom, marg, y);
    //doc.line(dim.w, y, dim.w, y + 10);
    //doc.line(marg, y, marg, y + 10);

    const h_line_len = 10;
    const text_sp_pct = 0.1;
    const x_sp_pct = marg * text_sp_pct;
    const y_sp_pct = -marg * text_sp_pct;
    vline(doc, marg, line_y, marg, h_line_len);
    vline(doc, marg + name_text_dims.w, line_y, marg, h_line_len);

    let rest_w = PG_W - marg * 2 - name_text_dims.w;
    let space = rest_w / num_days;

    [...Array(num_days)].map((it, i) => {
      let rld_text = rld[i];
      let box_x = marg + name_text_dims.w + i * space;
      vline(doc, box_x, line_y, h_line_len);

      let original_font_size = doc.getFontSize();
      doc.setFontSize(12);
      doc.text(rld_text, box_x + x_sp_pct, line_y + y_sp_pct);
      doc.setFontSize(original_font_size);
    });

    let original_font_size = doc.getFontSize();
    doc.setFontSize(12);
    doc.text(nom, marg + x_sp_pct, line_y + y_sp_pct);
    doc.setFontSize(original_font_size);

    if (name_text_dims.w > names_w) names_w = name_text_dims.w;
  });

  doc.save("rl.pdf");
}
const PAGE_MARG = 15;
const FONT_SIZE = 12;
const BOX_WIDTH_SPACE_PCT = 1.2;

function draw_agent_rl(rld) {
  doc.setFontSize(FONT_SIZE);
  draw_en_tete(doc, PAGE_MARG, PG_W, LOGO_H, (h) => {
    let text_tokens = [{ lat: "Num / " }, { zh: "序号" }];

    hline(doc, PAGE_MARG, h, PG_W - PAGE_MARG * 2);

    let rect_row_0 = { y: h };

    rect_row_0 = centeTextInRect(
      doc,
      PAGE_MARG,
      rect_row_0.y + FONT_SIZE,
      BOX_WIDTH_SPACE_PCT,
      FONT_SIZE,
      text_tokens
    );

    rect_row_0 = centeTextInRect(
      doc,
      rect_row_0.x,
      rect_row_0.y + FONT_SIZE,
      BOX_WIDTH_SPACE_PCT,
      FONT_SIZE,
      text_tokens,
      [{ lat: "13" }]
    );

    text_tokens = [{ lat: rld.nom }, { zh: "库齐" }];
    let rect_row_1 = centeTextInRect(
      doc,
      PAGE_MARG + rect_row_0.w,
      h + FONT_SIZE,
      BOX_WIDTH_SPACE_PCT,
      FONT_SIZE,
      text_tokens,
      [{ lat: "AGENT/" }, { zh: "工人" }]
    );

    rect_row_1 = centeTextInRect(
      doc,
      PAGE_MARG + rect_row_0.w,
      rect_row_1.y + FONT_SIZE,
      BOX_WIDTH_SPACE_PCT,
      FONT_SIZE,
      text_tokens
    );

    text_tokens = [{ lat: "MAT./" }, { zh: "工号" }];
    let rect_row_2 = centeTextInRect(
      doc,
      PAGE_MARG + rect_row_0.w + rect_row_1.w,
      h + FONT_SIZE,
      BOX_WIDTH_SPACE_PCT,
      FONT_SIZE,
      text_tokens
    );

    rect_row_2 = centeTextInRect(
      doc,
      rect_row_2.x,
      rect_row_2.y + FONT_SIZE,
      BOX_WIDTH_SPACE_PCT,
      FONT_SIZE,
      text_tokens,
      [{ lat: "L0501" }]
    );
    doc.rect(
      PAGE_MARG,
      h,
      rect_row_0.w + rect_row_1.w + rect_row_2.w,
      FONT_SIZE
    );
  });

  doc.save("rl.pdf");
}

draw_agent_rl(agents_rl[0]);

//draw_rl(agents_rl);
//food_list(agents_food);
