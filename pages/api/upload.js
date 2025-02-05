import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Disable the default body parser
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '100mb', // Set limit to 100 MB
    },
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { file, artist, title } = req.body;

    try {
      const response = await cloudinary.uploader.upload(file, {
        resource_type: "video", // Cloudinary treats mp3 as 'video'
        folder: artist === "Mimos" ? "mimos_playlist" : "electric_playlist",
        public_id: title,
      });

      return res.status(200).json({ success: true, data: response });
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      return res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
