const { Router } = require("express");
const router = Router();
const fileController = new FileController();

router.post("", fileController.uploadFile);

module.exports = router;
