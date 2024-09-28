#API Test Code by Ranyi Zhang
#Set Up Instrunctions (If you want to test it in a virtual environment, optional but not mandatory):
#1.Before running the Unit Test, you need to set up your virtual environment with:
##python3 -m venv myenv
#2.Then run: myenv\Scripts\Activate.ps1
#If you encounter error "myenv\Scripts\Activate.ps1 cannot be loaded because running scripts is 
# disabled on this system." Open Powershell with as Administrator and type:
#Set-ExecutionPolicy RemoteSigned and then go back to step 2
#Once you are done with your test, you can do Set-ExecutionPolicy Restricted.
#PS: You also might need to install "requests" module in your virtual enviornment. (pip install requests)


import unittest
from unittest.mock import patch
import requests

# Function to create a post
def create_post(access_token, mastodon_instance, post_text):
    response = requests.post(
        f"{mastodon_instance}/api/v1/statuses",
        headers={'Authorization': f'Bearer {access_token}', 'Content-Type': 'application/json'},
        json={'status': post_text}
    )
    return response.json(), response.status_code

# Function to retrieve a post
def retrieve_post(access_token, mastodon_instance, post_id):
    response = requests.get(
        f"{mastodon_instance}/api/v1/statuses/{post_id}",
        headers={'Authorization': f'Bearer {access_token}'}
    )
    return response.json(), response.status_code

# Function to delete a post
def delete_post(access_token, mastodon_instance, post_id):
    response = requests.delete(
        f"{mastodon_instance}/api/v1/statuses/{post_id}",
        headers={'Authorization': f'Bearer {access_token}'}
    )
    return response.status_code

class TestMastodonAPI(unittest.TestCase):

    @patch('requests.post')
    def test_create_post(self, mock_post):
        # Simulate a successful API response
        mock_post.return_value.json.return_value = {'id': 1, 'content': 'Hello, Mastodon!'}
        mock_post.return_value.status_code = 200
        
        access_token = 'test_access_token'
        mastodon_instance = 'https://mastodon.social'
        post_text = 'Hello, Mastodon!'
        
        data, status = create_post(access_token, mastodon_instance, post_text)
        
        self.assertEqual(status, 200)
        self.assertEqual(data['content'], 'Hello, Mastodon!')

    @patch('requests.get')
    def test_retrieve_post(self, mock_get):
        # Simulate a successful API response
        mock_get.return_value.json.return_value = {'id': 1, 'content': 'Hello, Mastodon!'}
        mock_get.return_value.status_code = 200
        
        access_token = 'test_access_token'
        mastodon_instance = 'https://mastodon.social'
        post_id = 1
        
        data, status = retrieve_post(access_token, mastodon_instance, post_id)
        
        self.assertEqual(status, 200)
        self.assertEqual(data['content'], 'Hello, Mastodon!')

    @patch('requests.delete')
    def test_delete_post(self, mock_delete):
        # Simulate a successful API response
        mock_delete.return_value.status_code = 200
        
        access_token = 'test_access_token'
        mastodon_instance = 'https://mastodon.social'
        post_id = 1
        
        status = delete_post(access_token, mastodon_instance, post_id)
        
        self.assertEqual(status, 200)

if __name__ == '__main__':
    unittest.main()
