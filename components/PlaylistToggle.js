// components/PlaylistToggle.js

import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { SwapOutlined } from "@ant-design/icons";

const PlaylistToggle = () => {
  const { playlistName, togglePlaylist } = useContext(PlayerContext);

  return (
    <div className="playlist-toggle">
      <button onClick={togglePlaylist}>
        {playlistName === "mimos"
          ? "Switch to Cabin Electric Jams"
          : "Switch to Mimos (the band)"}
        &nbsp;
        <SwapOutlined />
      </button>
    </div>
  );
};

export default PlaylistToggle;
