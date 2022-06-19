class FileController {
  uploadFile(req, res) {
    if (!req.files || Object.keys(req.files) === 0 || !req.files.uploadedFile) {
      return res.status(400).json({ msg: "No files uploaded" });
    }
    const file = req.files.uploadedFile;
    const uploadPath = path.join(__dirname, `../uploads/${file.name}`);
    file.mv(uploadPath, (err) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(201).json({ msg: `File uploaded to: ${uploadPath}` });
    });
  }
}

module.children = FileController;
