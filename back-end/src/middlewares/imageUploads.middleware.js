import multer from "multer";
import path from "path";
const __dirname = path.resolve();
// Configuración del almacenamiento de multer
const diskstorage = multer.diskStorage({
  destination: path.join(__dirname, "src/uploads/"),
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname); // Guarda con un nombre único
  },
});

export const fileUpload = multer({storage: diskstorage}).single("TaskImage");
