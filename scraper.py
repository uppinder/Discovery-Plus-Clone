
# styles-thumbnailContainer-1oi5QPkx

# styles-thumbnailImageWrapper-3rF4G4fj
# Premium icon - class: styles-premiumIcon-3D3gTh8F - done
# Show title - class: styles-basicShowName-1UIRr8Z0 - done
# Show desc - class: styles-basicShowDesc-2lD4G4lm - done
# Image thumbnail - class: styles-thumbnailImage-2I_Mrm9L

# New episodes - class: styles-Episodes-2eohupVc

from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException
from bs4 import BeautifulSoup
import json

url = 'https://www.discoveryplus.in/collection-view-all?id=213847615072263820416962469284318654729'


options = webdriver.ChromeOptions()
options.add_argument('--headless')
browser = webdriver.Chrome(
    options=options, executable_path='/Users/uppinder/Downloads/Software/chromedriver-mac-x64/chromedriver')
browser.get(url)

showList = []

try:
    myElem = WebDriverWait(browser, 20).until(
        EC.presence_of_element_located((By.CLASS_NAME, 'styles-gridTemplate-vIOBVqX5')))

    html = browser.page_source

    soup = BeautifulSoup(html, features="html.parser")

    grid_templates = soup.find_all(
        attrs={"class": "styles-gridTemplate-vIOBVqX5"})

    for item in grid_templates:
        show = {}
        show_link = item.find(
            attrs={"class": "styles-href-1fNufSlc"})
        show_title = item.find(
            attrs={"class": "styles-basicShowName-1UIRr8Z0"})
        show_desc = item.find(
            attrs={"id": "#desc"})
        show_thumbnail = item.find(
            attrs={"class": "styles-thumbnailImage-2I_Mrm9L"})
        premium_icon = item.find(
            attrs={"class": "styles-premiumIcon-3D3gTh8F"})
        show_new_episodes = item.find(
            attrs={"class": "styles-Episodes-2eohupVc"})

        show['id'] = show_link['href'].split('/')[-1]
        show['title'] = show_title.text.strip()
        show['desc'] = show_desc.text.strip()
        show['thumbnail'] = show_thumbnail['src'].replace('&w=327', '&w=700')
        show['isPremium'] = True if premium_icon else False
        show['hasNewEpisodes'] = True if show_new_episodes else False

        showList.append(show)

    print(json.dumps(showList))


except TimeoutException:
    print('Timed out.')


browser.quit()
