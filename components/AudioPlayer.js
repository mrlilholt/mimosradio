import { useContext, useEffect } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { PlayCircleOutlined, PauseCircleOutlined, SoundOutlined } from "@ant-design/icons";

const AudioPlayer = () => {
  const {
    currentPlaylist,
    currentTrackIndex,
    isPlaying,
    playTrack,
    pauseTrack,
    volume,
    setVolume,
    nextTrack,
    audioRef,
  } = useContext(PlayerContext);

  // Update the audio source when the track changes
  useEffect(() => {
    if (audioRef.current && currentPlaylist[currentTrackIndex]) {
      audioRef.current.src = currentPlaylist[currentTrackIndex].url;

      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentTrackIndex, currentPlaylist, isPlaying, audioRef]);

  // Handle the end of a track
  const handleEnded = () => {
    nextTrack();
  };

  return (
    <div className="audio-player">
      <button
        onClick={() => (isPlaying ? pauseTrack() : playTrack())}
        className="play-button"
      >
        {isPlaying ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
      </button>

      <div className="volume-control">
        <input
          type="range"
          className="volume-slider"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => {
            setVolume(e.target.value);
            if (audioRef.current) {
              audioRef.current.volume = e.target.value;
            }
          }}
        />
        <SoundOutlined style={{ fontSize: "1.5rem", color: "#000" }} />
      </div>

      <audio ref={audioRef} onEnded={handleEnded} />
    </div>
  );
};

export default AudioPlayer;
