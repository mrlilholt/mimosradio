import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  try {
    const mimosResponse = await cloudinary.api.resources({
      resource_type: "video",
      type: "upload",
      prefix: "mimos_playlist/", // Folder name in Cloudinary
      max_results: 100,
    });

    const cabinElectricResponse = await cloudinary.api.resources({
      resource_type: "video",
      type: "upload",
      prefix: "electric_playlist/",
      max_results: 100,
    });

    const formatTracks = (resources, artist) =>
        resources.map((file, index) => ({
          id: index + 1,
          title: file.public_id.split("/").pop().replace(/_/g, " "), // Extract file name as title
          artist: artist || "Unknown Artist", // Fallback if artist isn't provided
          url: file.secure_url,
        }));
      

    res.status(200).json({
      mimosPlaylist: formatTracks(mimosResponse.resources, "Mimos"),
      cabinElectricPlaylist: formatTracks(
        cabinElectricResponse.resources,
        "Cabin Electric"
      ),
    });
  } catch (error) {
    console.error("Error fetching playlists:", error);
    res.status(500).json({ error: "Failed to fetch playlists" });
  }
}
