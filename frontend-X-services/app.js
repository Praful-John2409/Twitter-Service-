// Written by Tingfei Gu
document.getElementById('createPostForm').addEventListener('submit', function (e)
{
    e.preventDefault();
    const postText = document.getElementById('postText').value;
    console.log('Creating post:', postText);

    const accessToken = 'nI7-TGXVq2HDOjQFsQv1UMeiNR2fDraZ_aAQMXJiXzg';
    const mastodonInstance = 'https://mastodon.social';

    // Make a POST request to Mastodon API to create a post
    fetch(`${mastodonInstance}/api/v1/statuses`, {
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
        })
        .catch(error =>
        {
            console.error('Error creating post:', error);
            alert('Failed to create post');
        });
});
// Written by Tingfei Gu
document.getElementById('retrievePostForm').addEventListener('submit', function (e)
{
    e.preventDefault();
    const postId = document.getElementById('postIdRetrieve').value;
    console.log('Retrieving post with ID:', postId);

    document.getElementById('postDetails').style.display = 'block';
    document.getElementById('postDetails').innerText = `post with ID ${postId} details here...`;
    const accessToken = 'nI7-TGXVq2HDOjQFsQv1UMeiNR2fDraZ_aAQMXJiXzg';
    const mastodonInstance = 'https://mastodon.social'
    fetch(`${mastodonInstance}/api/v1/statuses/${postId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
        .then(response => response.json())
        .then(data =>
        {
            console.log('Post retrieved successfully:', data);
            // Display post details in the designated HTML element
            document.getElementById('postDetails').style.display = 'block';
            document.getElementById('postDetails').innerText = `Post Content: ${data.content}`;
        })
        .catch(error =>
        {
            console.error('Error retrieving post:', error);
            document.getElementById('postDetails').innerText = 'Failed to retrieve post';
        });
});
// Written by Ranyi Zhang
document.getElementById('deletePostForm').addEventListener('submit', function (e)
{
    e.preventDefault();
    const postId = document.getElementById('postIdDelete').value;
    console.log('Deleting post with ID:', postId);

    const accessToken = 'nI7-TGXVq2HDOjQFsQv1UMeiNR2fDraZ_aAQMXJiXzg';
    const mastodonInstance = 'https://mastodon.social';

    // Make a DELETE request to Mastodon API to delete a post
    fetch(`${mastodonInstance}/api/v1/statuses/${postId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
        .then(response =>
        {
            if (response.ok)
            {
                console.log('Post deleted successfully');
                alert('Post deleted successfully');
            } else
            {
                throw new Error('Failed to delete post: ' + response.statusText);
            }
        })
        .catch(error =>
        {
            console.error('Error deleting post:', error);
            alert('Failed to delete post');
        });
});

