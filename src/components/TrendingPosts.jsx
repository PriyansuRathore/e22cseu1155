import { useState, useEffect } from "react";
import { fetchUsers, fetchUserPosts, fetchPostComments } from "../api/api";

const TrendingPosts = () => {
  const [trendingPosts, setTrendingPosts] = useState([]);

  useEffect(() => {
    const getTrendingPosts = async () => {
      const users = await fetchUsers();
      let allPosts = [];
      for (let userId in users) {
        const posts = await fetchUserPosts(userId);
        allPosts.push(...posts);
      }
      const postCommentCounts = await Promise.all(
        allPosts.map(async (post) => {
          const comments = await fetchPostComments(post.id);
          return { ...post, commentCount: comments.length };
        })
      );
      const maxComments = Math.max(...postCommentCounts.map((p) => p.commentCount));
      const trending = postCommentCounts.filter((p) => p.commentCount === maxComments);
      setTrendingPosts(trending);
    };
    getTrendingPosts();
  }, []);

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Trending Posts</h2>
      {trendingPosts.map((post) => (
        <div key={post.id} className="p-3 bg-white shadow rounded mb-2">
          <p className="font-semibold">{post.content}</p>
          <p className="text-gray-600">Comments: {post.commentCount}</p>
        </div>
      ))}
    </div>
  );
};

export default TrendingPosts;
