import "./App.css";
import { Videos } from "./Videos";
import { Header } from "./Header";
import { SideBar } from "./SideBar";
import { useState } from "react";
import { LikedVideos } from "./LikedVideos";
import { SavedVideos } from "./SavedVideos";
import { PlayList } from "./PlayList";

function App() {
  const [route, setRoute] = useState("videos");

  return (
    <div className='App'>
      <Header />
      <div className='main'>
        <SideBar setRoute={setRoute} />
        {route === "videos" && <Videos />}
        {route === "playlist" && <PlayList />}
        {route === "likedvideos" && <LikedVideos />}
        {route === "savedvideos" && <SavedVideos />}
      </div>
    </div>
  );
}

export default App;
