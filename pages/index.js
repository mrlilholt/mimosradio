import Head from "next/head";
import { useState } from "react";
import AudioPlayer from "../components/AudioPlayer";
import PlaylistToggle from "../components/PlaylistToggle";
import NowPlaying from "../components/NowPlaying";
import UpcomingTracks from "../components/UpcomingTracks";
import UploadForm from "../components/UploadForm";
import { LoginOutlined } from "@ant-design/icons";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { getNamedMiddlewareRegex } from "next/dist/shared/lib/router/utils/route-regex";

export default function Home() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const allowedUsers = ["addison.lilholt@gmail.com", "charlestribe@gmail.com", "c.ed.aquino@gmail.com"];

  return (
    <>
      <Head>
        <title>Mimos Radio</title>
        <meta name="description" content="Mimos Radio streaming station" />
      </Head>

      {/* Background Video */}
      <video autoPlay loop muted className="background-video">
        <source src="/mimosBackground.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="container">
        {/* Logo Section */}
        <header className="header section">
          <img
            src="/mimosRadioLogo.png"
            alt="Mimos Radio Logo"
            className="logo"
          />
          
          <LoginOutlined
  className="login-icon"
  onClick={async () => {
    if (!user) {
      try {
        const result = await signInWithPopup(auth, provider);
        const signedInUser = result.user;

        // Check if the signed-in user's email is in the allowed list
        if (allowedUsers.includes(signedInUser.email)) {
          setUser(signedInUser);
          setModalOpen(true); // Open the modal if authorized
        } else {
          alert("You do not have permission to access this feature.");
        }
      } catch (error) {
        console.error("Error signing in:", error);
      }
    } else {
      setModalOpen(true); // Already signed in
    }
  }}
/>

        </header>

        {/* Audio Controls */}
        <div className="section">
          <AudioPlayer />
        </div>

        {/* Playlist Toggle */}
        <div className="section">
          <PlaylistToggle />
        </div>

        {/* Now Playing */}
        <div className="section">
          <NowPlaying />
        </div>

        {/* Upcoming Tracks */}
        <div className="section">
          <UpcomingTracks />
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="modal-backdrop" onClick={() => setModalOpen(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setModalOpen(false)} className="close-button">
                &times;
              </button>
              <UploadForm />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
