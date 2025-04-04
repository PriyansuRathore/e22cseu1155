import { useState, useEffect } from "react";
import { fetchUsers, fetchUserPosts } from "../api/api";

const TopUsers = () => {
  const [topUsers, setTopUsers] = useState([]);

  useEffect(() => {
    const getTopUsers = async () => {
      const users = await fetchUsers();
      const userPostCounts = await Promise.all(
        Object.entries(users).map(async ([id, name]) => {
          const posts = await fetchUserPosts(id);
          return { id, name, postCount: posts.length };
        })
      );
      const sortedUsers = userPostCounts.sort((a, b) => b.postCount - a.postCount).slice(0, 5);
      setTopUsers(sortedUsers);
    };
    getTopUsers();
  }, []);

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Top 5 Users</h2>
      {topUsers.map((user) => (
        <div key={user.id} className="p-2 bg-white shadow rounded mb-2">
          <p className="font-semibold">{user.name}</p>
          <p className="text-gray-600">Posts: {user.postCount}</p>
        </div>
      ))}
    </div>
  );
};

export default TopUsers;
