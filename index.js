const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;
// const PDFMerger = require("pdf-merger-js");
const mergerPdfs = require("./merge");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

app.use("/static", express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "pages/index.html"));
});

app.post("/merge", upload.array("pdfs", 2), async function (req, res, next) {
  // console.log(req.files);
  const d = await mergerPdfs(
    path.join(__dirname, req.files[0].path),
    path.join(__dirname, req.files[1].path)
  );
  return res.redirect(`/static/${d}.pdf`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
