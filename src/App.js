import "./App.css";
import { Videos } from "./Videos";
import { Header } from "./Header";
import { SideBar } from "./SideBar";
import { useState } from "react";
import { LikedVideos } from "./LikedVideos";
import { SavedVideos } from "./SavedVideos";

function App() {
  const [route, setRoute] = useState("videos");

  return (
    <div className='App'>
      <Header />
      <SideBar setRoute={setRoute} />
      {route === "videos" && <Videos />}
      {route === "likedvideos" && <LikedVideos />}
      {route === "savedvideos" && <SavedVideos />}
    </div>
  );
}

export default App;
