import axios from "axios";

// Base API URL
const BASE_URL = "http://20.244.56.144/evaluation-service";

// Your Access Token (Replace this with your valid token)
const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQzNzQ2OTE3LCJpYXQiOjE3NDM3NDY2MTcsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImI0YmE2ODlmLWM4NTMtNDhmZi05MWJjLTllMjg2YzNjMzkxZCIsInN1YiI6ImUyMmNzZXUxMTU1QGJlbm5ldHQuZWR1LmluIn0sImVtYWlsIjoiZTIyY3NldTExNTVAYmVubmV0dC5lZHUuaW4iLCJuYW1lIjoicHJpeWFuc3Ugc2luZ2ggcmF0aG9yZSIsInJvbGxObyI6ImUyMmNzZXUxMTU1IiwiYWNjZXNzQ29kZSI6InJ0Q0haSiIsImNsaWVudElEIjoiYjRiYTY4OWYtYzg1My00OGZmLTkxYmMtOWUyODZjM2MzOTFkIiwiY2xpZW50U2VjcmV0IjoiZlROeXZoYnJqTkRYdU5rRSJ9.byBRqYuLAe7lSU7vf1dEKeQ7KGBwHJgCj8tQRwYPDQw"; // Truncated for security

// Axios Instance with Authorization Header
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${ACCESS_TOKEN}`
  }
});

// 🟢 Fetch Users
export const fetchUsers = async () => {
  try {
    const { data } = await api.get("/users");
    console.log("Users Data:", data);
    return data.users;
  } catch (error) {
    console.error("Error fetching users:", error.response?.data || error.message);
    throw error;
  }
};

// 🔵 Fetch User Posts
export const fetchUserPosts = async (userId) => {
  try {
    const { data } = await api.get(`/users/${userId}/posts`);
    console.log(`Posts for User ${userId}:`, data);
    return data.posts;
  } catch (error) {
    console.error(`Error fetching posts for user ${userId}:`, error.response?.data || error.message);
    throw error;
  }
};

// 🟠 Fetch Post Comments
export const fetchPostComments = async (postId) => {
  try {
    const { data } = await api.get(`/posts/${postId}/comments`);
    console.log(`Comments for Post ${postId}:`, data);
    return data.comments;
  } catch (error) {
    console.error(`Error fetching comments for post ${postId}:`, error.response?.data || error.message);
    throw error;
  }
};
