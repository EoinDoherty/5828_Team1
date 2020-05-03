import random
from app import app
from app.db import database

# Test endpoints to simulate the frontend interaction

def check_for_post(posts, post_id):
    for post in posts:
        if post['_id'] == post_id:
            return True
    
    return False

def generate_username():
    exists = True
    name = ''
    
    while exists:
        name = ''.join([chr(random.randint(97,122)) for _ in range(10)])
        exists = bool(database.users.find_one({'username': name}))

    return name

def test_endpoints():
    username = generate_username()
    password = "password"
    token = ""

    with app.test_client() as c:

        # Sign up
        response = c.post('api/signup', json={
            'username': username,
            'password': password
        })
        assert response.status_code == 200
        data = response.get_json()
        assert data['msg'] == 'Logged in'

        # Log in
        response = c.post('api/login', json={
            'username': username,
            'password': password
        })
        
        data = response.get_json()
        assert response.status_code == 200
        assert data['msg'] == 'Logged in'

        token = data['token']
        headers = {"Authorization": "Bearer " + token,
                "Content-type": "application/json"}

        # welcome message
        response = c.get('api/home', headers=headers)
        assert response.status_code == 200
        assert response.get_json()['msg'] == 'Hello ' + username
        
        post_title = "post title"
        post_content = "content"

        # create a post
        response = c.post('api/new_post', headers=headers, json={
            "title": post_title,
            "content": post_content,
            "tags": [],
            "filename": ""
        })
        
        data = response.get_json()

        assert response.status_code == 200
        assert data["msg"] == "created post"

        post_id = data['id']

        # list posts
        response = c.post('api/list_posts', headers=headers)

        assert response.status_code == 200
        
        posts = response.get_json()['posts']
        
        assert check_for_post(posts, post_id)

        # update post
        post_title = "post title"
        post_content = "content"
        post_tag = "tag"

        response = c.post('api/update_post', headers=headers, json={
            "id": post_id,
            "title": post_title,
            "content": post_content,
            "tags": [post_tag],
            "filename": ""
        })

        assert response.status_code == 200
        data = response.get_json()
        assert data['msg'] == 'Post has been updated'
        assert data['id'] == post_id

        # test get post
        response = c.post("api/get_post", headers=headers, json={
            "id": post_id
        })

        assert response.status_code == 200

        found_post = response.get_json()['post']

        assert found_post['_id'] == post_id
        assert found_post['title'] == post_title
        assert found_post['content'] == post_content
        assert post_tag in found_post['tags']

        response = c.post("api/delete_post", headers=headers, json={
            "id": post_id
        })

        assert response.status_code == 200

        database.users.delete_one({'username': username})
