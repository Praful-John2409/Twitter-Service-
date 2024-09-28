import { createPost } from '../../createPost.js'; // Import the createPost function

describe('Create Post Function', function ()
{
  let fetchMock;

  // Mock the fetch API before each test case
  beforeEach(function ()
  {
    fetchMock = spyOn(window, 'fetch').and.returnValue(Promise.resolve({
      json: () => Promise.resolve({ id: '123456', content: 'Hello, Mastodon!' })
    }));
  });

  it('should send a POST request to the Mastodon API with the correct parameters', function (done)
  {
    const postText = 'Hello, Mastodon!';

    createPost(postText) // Call the actual createPost function
      .then(() =>
      {
        expect(fetchMock).toHaveBeenCalledWith(
          'https://mastodon.social/api/v1/statuses', // URL
          jasmine.objectContaining({
            method: 'POST', // Ensure it's a POST request
            headers: jasmine.objectContaining({
              'Authorization': jasmine.any(String),
              'Content-Type': 'application/json'
            }),
            body: JSON.stringify({ status: postText }) // Ensure the correct status is sent
          })
        );
        done();
      });
  });

  it('should handle successful post creation', function (done)
  {
    const postText = 'Hello, Mastodon!';

    createPost(postText) // Call the actual createPost function
      .then((response) =>
      {
        expect(response.content).toBe('Hello, Mastodon!'); // Ensure the post content matches
        done();
      });
  });

  it('should handle errors when creating a post', function (done)
  {
    // Simulate a failed network request
    fetchMock.and.returnValue(Promise.reject(new Error('Network error')));

    createPost('Hello, Mastodon!')
      .catch((error) =>
      {
        expect(error.message).toBe('Network error'); // Ensure errors are handled correctly
        done();
      });
  });
});
