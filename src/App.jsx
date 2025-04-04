import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TopUsersPage from "./pages/TopUsersPage";
import TrendingPostsPage from "./pages/TrendingPostsPage";
import LiveFeedPage from "./pages/LiveFeedPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen p-5 bg-gray-200">
        <Routes>
          <Route path="/" element={<TopUsersPage />} />
          <Route path="/trending" element={<TrendingPostsPage />} />
          <Route path="/feed" element={<LiveFeedPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
