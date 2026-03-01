import multer from "multer";

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const name = file.originalname;
    console.log(req);
    cb(null, name);
  },
});

export const upload = multer({ storage: storage });
