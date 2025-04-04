import { useState, useEffect } from "react";
import { fetchUsers, fetchUserPosts } from "../api/api";

const LiveFeed = () => {
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    const fetchFeed = async () => {
      const users = await fetchUsers();
      let allPosts = [];
      for (let userId in users) {
        const posts = await fetchUserPosts(userId);
        allPosts.push(...posts);
      }
      allPosts.sort((a, b) => b.id - a.id);
      setFeed(allPosts);
    };

    fetchFeed();
    const interval = setInterval(fetchFeed, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Live Feed</h2>
      {feed.map((post) => (
        <div key={post.id} className="p-3 bg-white shadow rounded mb-2">
          <p className="font-semibold">{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default LiveFeed;
