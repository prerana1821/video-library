import { Routes, Route } from "react-router-dom";
import { VideoListing } from "./VideoListing";
import { Header } from "./Header";
import { LikedVideos } from "./LikedVideos";
import { SavedVideos } from "./SavedVideos";
import { PlayList } from "./Playlist";
import { Video } from "./Videos";
import { History } from "./History";
import "./App.css";
import { Login, PrivateRoute, SignUp } from "./Auth";
import { Account } from "./Auth/Account";

function App() {
  return (
    <div className='App'>
      <Header />
      <div className='main'>
        <Routes>
          <Route path='/' element={<VideoListing />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/SignUp' element={<SignUp />}></Route>
          <Route path='/video/:videoId' element={<Video />}></Route>
          <PrivateRoute path='/account' element={<Account />}></PrivateRoute>
          <PrivateRoute path='/playlist' element={<PlayList />}></PrivateRoute>
          <PrivateRoute path='/history' element={<History />}></PrivateRoute>
          <PrivateRoute
            path='/liked-videos'
            element={<LikedVideos />}
          ></PrivateRoute>
          <PrivateRoute
            path='/saved-videos'
            element={<SavedVideos />}
          ></PrivateRoute>
        </Routes>
      </div>
    </div>
  );
}

export default App;
