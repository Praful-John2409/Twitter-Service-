document.getElementById('createPostForm').addEventListener('submit', function (e)
{
    e.preventDefault();
    const postText = document.getElementById('postText').value;
    console.log('Creating post:', postText);

});

document.getElementById('retrievePostForm').addEventListener('submit', function (e)
{
    e.preventDefault();
    const postId = document.getElementById('postIdRetrieve').value;
    console.log('Retrieving post with ID:', postId);

    document.getElementById('postDetails').style.display = 'block';
    document.getElementById('postDetails').innerText = `post with ID ${postId} details here...`;
});

document.getElementById('deletePostForm').addEventListener('submit', function (e)
{
    e.preventDefault();
    const postId = document.getElementById('postIdDelete').value;
    console.log('Deleting post with ID:', postId);

});

