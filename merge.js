const PDFMerger = require("pdf-merger-js");

const mergerPdfs = async (pdf1, pdf2) => {
  var merger = new PDFMerger();

  await merger.add(pdf1);
  await merger.add(pdf2);

  let d = new Date().getTime();

  await merger.save(`public/${d}.pdf`);

  return d;
};

module.exports = mergerPdfs;
