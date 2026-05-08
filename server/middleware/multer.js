import multer from "multer";
import path from "path";


const upload = multer({ storage: multer.diskStorage({}) });

export default upload;
