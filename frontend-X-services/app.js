import { createPost } from './createPost.js';
import { retrievePost } from './retrievePost.js';

export async function getAccessToken()
{
    const response = await fetch('config.json');
    const config = response.json();
    const accessToken = config.accessToken;
    return accessToken;
}
// const accessToken = getAccessToken();
const response = await fetch('config.json');
const config = await response.json();
const accessToken = config.accessToken;
console.log('Access token:', accessToken);

// Written by Tingfei Gu
document.getElementById('createPostForm').addEventListener('submit', createPost);
// document.getElementById('createPostForm').addEventListener('submit', function (e)
// {
//     const mastodonInstance = 'https://mastodon.social';
//     e.preventDefault();
//     const postText = document.getElementById('postText').value;
//     fetch(`${mastodonInstance}/api/v1/statuses`, {
//         method: 'POST',
//         headers: {
//             'Authorization': `Bearer ${accessToken}`,
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ status: postText })
//     })
//         .then(response =>
//         {
//             console.log('Response status:', response.status); // Log the HTTP status code
//             console.log('Response body:', response); // Log the full response
//             if (!response.ok)
//             {
//                 throw new Error(`HTTP error! Status: ${response.status}`);
//             }
//             return response.json();
//         })
//         .then(data =>
//         {
//             console.log('Post created successfully:', data);
//             alert('Post created: ' + data.content);
//             return data;
//         })
//         .catch(error =>
//         {
//             console.error('Error creating post1:', error);
//             alert('Failed to create post');
//             throw error;
//         })
// });
// Written by Tingfei Gu
document.getElementById('retrievePostForm').addEventListener('submit', retrievePost);
// Written by Ranyi Zhang
document.getElementById('deletePostForm').addEventListener('submit', function (e)
{
    e.preventDefault();
    const postId = document.getElementById('postIdDelete').value;
    console.log('Deleting post with ID:', postId);

    // const accessToken = 'nI7-TGXVq2HDOjQFsQv1UMeiNR2fDraZ_aAQMXJiXzg';
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

