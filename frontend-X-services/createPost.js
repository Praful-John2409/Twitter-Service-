export function createPost(postText, e)
{
  if (!postText)
  {
    postText = document.getElementById('postText').value;
  }
  console.log('Creating post:', postText);

  const accessToken = 'nI7-TGXVq2HDOjQFsQv1UMeiNR2fDraZ_aAQMXJiXzg';
  const mastodonInstance = 'https://mastodon.social';

  // Return the fetch Promise to allow chaining .then() and .catch()
  return fetch(`${mastodonInstance}/api/v1/statuses`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      status: postText // the status text from the input field
    })
  }).then(response => response.json())
    .then(data =>
    {
      console.log('Post created successfully:', data);
      alert('Post created: ' + data.content);
      return data; // Return data for further testing or chaining
    })
    .catch(error =>
    {
      console.error('Error creating post:', error);
      alert('Failed to create post');
      throw error; // Throw the error so it can be caught by tests
    });
}
