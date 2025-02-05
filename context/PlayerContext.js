// context/PlayerContext.js

import { createContext, useState, useRef } from "react";
import { mimosPlaylist, cabinElectricPlaylist } from "../data/playlists";

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  // State for the current playlist and track
  const [playlistName, setPlaylistName] = useState("mimos");
  const [currentPlaylist, setCurrentPlaylist] = useState(mimosPlaylist);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);

  // Reference for the audio element
  const audioRef = useRef(null);

  // Toggle between the two playlists and reset to the first track
  const togglePlaylist = () => {
    if (playlistName === "mimos") {
      setPlaylistName("cabinElectric");
      setCurrentPlaylist(cabinElectricPlaylist);
    } else {
      setPlaylistName("mimos");
      setCurrentPlaylist(mimosPlaylist);
    }
    setCurrentTrackIndex(0);
    // Pause the audio when switching
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
  };

  // Play the current track
  const playTrack = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // Pause the current track
  const pauseTrack = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Advance to the next track (if available)
  const nextTrack = () => {
    if (currentTrackIndex < currentPlaylist.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1);
    }
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
