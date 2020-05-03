#Import selenium package
from selenium import webdriver
import time

#Location for browser driver
driver = webdriver.Chrome("./chromedriver.exe")

#Url of the application
driver.get("https://team1project.appspot.com/")

#Test for login function
def test_login():
    driver.find_element_by_id("usernameLogin").send_keys("sanjay")
    driver.find_element_by_id("passwordLogin").send_keys("newuser")
    driver.find_element_by_xpath("//button[contains(text(),'Login')]").click()

#Test for Sign up function
def test_new_user():
    driver.find_element_by_id("usernameSU").send_keys("sanjay")
    driver.find_element_by_id("passwordSU").send_keys("newuser")
    driver.find_element_by_xpath("//button[contains(text(),'Sign Up')]").click()

#Test for creating new post
def test_newpost():
     driver.find_element_by_xpath("//button[contains(text(),'New Post')]").click()
     driver.find_element_by_id("post-title").send_keys("test post 1")
     driver.find_element_by_id("post-editor").send_keys("my first post has been successfully added")
     driver.find_element_by_id("new-tag").send_keys("test tag")
     driver.find_element_by_id("tag-btn").click()
     driver.find_element_by_id("save-post").click()
     driver.find_element_by_id("home-btn").click()


#Test for searching a post
def test_search():
    driver.find_element_by_id("searchbar").send_keys("test tag")
    driver.find_element_by_id("searchbar-btn").click()

#Test for editing a post
def test_edit_post():
    driver.find_element_by_xpath("//button[contains(text(),'Edit')]").click()
    driver.find_element_by_id("post-editor").clear()
    time.sleep(5)
    driver.find_element_by_id("post-editor").send_keys("my first post has been successfully edited twice")
    driver.find_element_by_id("save-post").click()
    driver.find_element_by_id("home-btn").click()

#Test for deleting a post
def test_delete():
     driver.find_element_by_xpath("//button[contains(text(),'Delete')]").click()

#Test for creating a new post   
def test_newpost2():
     driver.find_element_by_xpath("//button[contains(text(),'New Post')]").click()
     driver.find_element_by_id("post-title").send_keys("test post 2")
     driver.find_element_by_id("post-editor").send_keys("my first post has been successfully added")
     driver.find_element_by_id("new-tag").send_keys("test tag")
     driver.find_element_by_id("tag-btn").click()
     driver.find_element_by_id("save-post").click()
     driver.find_element_by_id("home-btn").click()




if __name__ == "__main__":
    #Testing new user creation
    test_new_user()
    time.sleep(10)
    print("Successfully created new user")
    time.sleep(10)
    driver.refresh();
    time.sleep(15)

    # Testing login
    test_login()
    print("Successfully logged in")
    time.sleep(10)

    #Testing creation of new post
    test_newpost()
    print("Successfully created new post")
    time.sleep(10)


    #Testing edit post
    test_edit_post()
    print("Successfully edited post")
    time.sleep(10)

    #Testing delete post
    print("Successfully deleted the post")
    test_delete()
    driver.refresh();
    time.sleep(10)

    #Logging in to test search
    test_login()
    print("Successfully logged in")
    time.sleep(10)
    test_newpost2()
    time.sleep(10)
    test_search()
    print("Successfully searched")
    time.sleep(5)
    driver.refresh();


    

    


    








