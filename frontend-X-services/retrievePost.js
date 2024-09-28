export function retrievePost(e)
{
  const postId = document.getElementById('postIdRetrieve').value;
  console.log('Retrieving post with ID:', postId);

  // Show loading message while retrieving post
  document.getElementById('postDetails').style.display = 'block';
  document.getElementById('postDetails').innerText = `Loading post with ID ${postId}...`;

  const accessToken = 'nI7-TGXVq2HDOjQFsQv1UMeiNR2fDraZ_aAQMXJiXzg';
  const mastodonInstance = 'https://mastodon.social';

  return fetch(`${mastodonInstance}/api/v1/statuses/${postId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  })
    .then(response =>
    {
      if (!response.ok && !'mock_response' in e)
      {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data =>
    {
      console.log('Post retrieved successfully:', data);

      // Display post details in the designated HTML element
      document.getElementById('postDetails').innerText = `Post Content: ${data.content}`;
    })
    .catch(error =>
    {
      console.error('Error retrieving post:', error);
      document.getElementById('postDetails').innerText = 'Failed to retrieve post';
    });
}
