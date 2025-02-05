// components/NowPlaying.js

import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";

const NowPlaying = () => {
  const { currentPlaylist, currentTrackIndex } = useContext(PlayerContext);
  const currentTrack = currentPlaylist[currentTrackIndex];

  return (
    <div className="now-playing">
      <h2>Now Playing:</h2>
      <div className="marquee">
        <span>
          {currentTrack.title} - {currentTrack.artist}
        </span>
      </div>
    </div>
  );
};

export default NowPlaying;
