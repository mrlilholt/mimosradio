import { createContext, useState, useRef, useEffect } from "react";

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [playlistName, setPlaylistName] = useState("mimos");
  const [currentPlaylist, setCurrentPlaylist] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef(null);

  // Fetch playlists from the API
  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const res = await fetch("/api/getPlaylists");
        const data = await res.json();
        setCurrentPlaylist(data.mimosPlaylist); // Default playlist
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };
    fetchPlaylists();
  }, []);

  const togglePlaylist = async () => {
    try {
      const res = await fetch("/api/getPlaylists");
      const data = await res.json();

      if (playlistName === "mimos") {
        setPlaylistName("cabinElectric");
        setCurrentPlaylist(data.cabinElectricPlaylist);
      } else {
        setPlaylistName("mimos");
        setCurrentPlaylist(data.mimosPlaylist);
      }
      setCurrentTrackIndex(0);
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsPlaying(false);
    } catch (error) {
      console.error("Error toggling playlist:", error);
    }
  };

  const playTrack = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const pauseTrack = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prevIndex) =>
      prevIndex + 1 < currentPlaylist.length ? prevIndex + 1 : 0
    );
  };
  

  return (
    <PlayerContext.Provider
      value={{
        playlistName,
        currentPlaylist,
        currentTrackIndex,
        isPlaying,
        volume,
        setVolume,
        togglePlaylist,
        playTrack,
        pauseTrack,
        nextTrack,
        audioRef,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
