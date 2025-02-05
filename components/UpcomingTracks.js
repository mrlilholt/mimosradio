// components/UpcomingTracks.js

import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";

const UpcomingTracks = () => {
  const { currentPlaylist, currentTrackIndex } = useContext(PlayerContext);
  const upcomingTrack = currentPlaylist[currentTrackIndex + 1];

  return (
    <div className="upcoming-tracks">
      <h2>Upcoming Track:</h2>
      {upcomingTrack ? (
        <p>
          {upcomingTrack.title} - {upcomingTrack.artist}
        </p>
      ) : (
        <p>No more tracks in the queue.</p>
      )}
    </div>
  );
};

export default UpcomingTracks;
