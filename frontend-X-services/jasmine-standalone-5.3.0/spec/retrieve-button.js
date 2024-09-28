import { retrievePost } from '../../retrievePost.js'; // Import the retrievePost function

describe('Retrieve Post Function', function ()
{
  let fetchMock;
  let postInput, postDetails;

  // Mock the fetch API before each test case
  beforeEach(function ()
  {
    fetchMock = spyOn(window, 'fetch').and.returnValue(Promise.resolve({
      json: () => Promise.resolve({ id: '123456', content: 'Hello, Mastodon!' })
    }));

    // Create the test DOM elements
    postInput = document.createElement('input');
    postInput.id = 'postIdRetrieve';
    postInput.value = '123456';

    postDetails = document.createElement('div');
    postDetails.id = 'postDetails';

    document.body.appendChild(postInput);
    document.body.appendChild(postDetails);
  });

  afterEach(function ()
  {
    // Remove the test DOM elements after each test
    postInput.remove();
    postDetails.remove();
  });

  it('should send a GET request to the correct Mastodon API endpoint', function (done)
  {
    // Create a mock event object to simulate form submission
    const mockEvent = { preventDefault: () => { } };

    retrievePost(mockEvent) // Call the actual retrievePost function
      .then(() =>
      {
        expect(fetchMock).toHaveBeenCalledWith(
          'https://mastodon.social/api/v1/statuses/123456', // URL
          jasmine.objectContaining({
            method: 'GET', // Ensure it's a GET request
            headers: jasmine.objectContaining({
              'Authorization': jasmine.any(String)
            })
          })
        );
        done();
      });
  });

  it('should handle successful post retrieval', function (done)
  {
    // Create a mock event object
    const mockEvent = {
      preventDefault: () => { },
      mock_response: true
    };
    console.log('buggy test');
    retrievePost(mockEvent) // Call the actual retrievePost function
      .then(() =>
      {
        const postDetailsText = document.getElementById('postDetails').innerText;
        // console.log(document.getElementById('postIdRetrieve').value);
        expect(postDetailsText).toBe('Post Content: Hello, Mastodon!'); // Check if the post content is displayed correctly
        done();
      });
  });


});
