import { getAccessToken } from "./app.js";

export async function createPost(e, postText)
{
  e.preventDefault();
  const response = await fetch('config.json');
  const config = await response.json();
  const accessToken = config.accessToken;
  console.log('Access token (create):', accessToken);
  if (!postText)
  {
    postText = document.getElementById('postText').value;
  }
  console.log('Creating post:', postText);

  // const accessToken = 'nI7-TGXVq2HDOjQFsQv1UMeiNR2fDraZ_aAQMXJiXzg';
  const mastodonInstance = 'https://mastodon.social';

  return fetch(`${mastodonInstance}/api/v1/statuses`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ status: postText })
  })
    .then(response =>
    {
      console.log('Response status:', response.status); // Log the HTTP status code
      console.log('Response body:', response); // Log the full response
      if (!response.ok)
      {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data =>
    {
      console.log('Post created successfully:', data);
      alert('Post created: ' + data.content);
      return data;
    })
    .catch(error =>
    {
      console.error('Error creating post1:', error);
      alert('Failed to create post');
      throw error;
    });
}
