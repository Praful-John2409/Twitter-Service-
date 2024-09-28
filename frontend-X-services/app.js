import { createPost } from './createPost.js';
import { retrivePost } from './retrievePost.js';

// Written by Tingfei Gu
document.getElementById('createPostForm').addEventListener('submit', createPost);
// Written by Tingfei Gu
document.getElementById('retrievePostForm').addEventListener('submit', retrivePost);
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

