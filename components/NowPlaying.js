import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";

const NowPlaying = () => {
  const { currentPlaylist, currentTrackIndex } = useContext(PlayerContext);
  const currentTrack = currentPlaylist[currentTrackIndex];

  return (
    <div className="now-playing">
      <div className="marquee">
        <span>
          {currentTrack?.title && currentTrack?.artist
            ? `${currentTrack.title} - ${currentTrack.artist}`
            : "No track playing"}
        </span>
      </div>
    </div>
  );
};

export default NowPlaying;
