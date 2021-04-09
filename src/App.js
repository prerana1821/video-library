import "./App.css";
import { VideoListing } from "./VideoListing";
import { Header } from "./Header";
import { SideBar } from "./SideBar";
import { LikedVideos } from "./LikedVideos";
import { SavedVideos } from "./SavedVideos";
import { PlayList } from "./PlayList";
import { Routes, Route } from "react-router-dom";
import { Video } from "./Video";
import { History } from "./History";

function App() {
  return (
    <div className='App'>
      <Header />
      <div className='main'>
        <SideBar />
        <Routes>
          <Route path='/' element={<VideoListing />}></Route>
          <Route path='/video/:videoId' element={<Video />}></Route>
          <Route path='/playlist' element={<PlayList />}></Route>
          <Route path='/history' element={<History />}></Route>
          <Route path='/liked-videos' element={<LikedVideos />}></Route>
          <Route path='/saved-videos' element={<SavedVideos />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
