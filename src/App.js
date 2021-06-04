import { Routes, Route } from "react-router-dom";
import { VideoListing } from "./VideoListing";
import { Header } from "./Header";
import { LikedVideos } from "./LikedVideos";
import { SavedVideos } from "./SavedVideos";
import { PlayList } from "./Playlist";
import { Video } from "./Videos";
import { History } from "./History";
import { Login, PrivateRoute, SignUp, useAuth } from "./Auth";
import { Account } from "./Auth/Account";
import { useData, useUserDetails } from "./Context";
import { Toast } from "./Toast";
import { BottomToTop } from "./BottomToTop";
import "./App.css";

function App() {
  const { userDetailsState } = useUserDetails();
  const { status: dataStatus } = useData();
  const { status } = useAuth();

  return (
    <div className='App' id='top'>
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
        {(userDetailsState?.status.loading ||
          dataStatus.error ||
          status.error ||
          status.success) && (
          <Toast
            userDetailsStateLoading={userDetailsState?.status.loading}
            loadingError={dataStatus.error}
            statusError={status.error}
            statusSuccess={status.success}
          />
        )}
        <BottomToTop />
      </div>
    </div>
  );
}

export default App;
