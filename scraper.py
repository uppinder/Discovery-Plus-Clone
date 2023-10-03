
# Horizontal w=327 to w=700
#
# styles-thumbnailContainer-1oi5QPkx
# styles-thumbnailImageWrapper-3rF4G4fj
# Premium icon - class: styles-premiumIcon-3D3gTh8F
# Show title - class: styles-basicShowName-1UIRr8Z0
# Show desc - id: #desc
# Image thumbnail - class: styles-thumbnailImage-2I_Mrm9L
# New episodes - class: styles-Episodes-2eohupVc

# Portrait (Vertical) w=214 to w=428
#
# Premium icon - class: styles-premiumIcon-384gksj1
# Show title - class: styles-basicShowName-2gClxIxX
# Show desc - class: styles-basicShowDesc-3RVyVMPP
# Image thumbnail - class: styles-thumbnailImage-3_Ss8vN_

import json
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException
from bs4 import BeautifulSoup

page = 'mindblown'
orientation = 'horizontal'
url = 'https://www.discoveryplus.in/mindblown'

options = webdriver.ChromeOptions()
options.add_argument('--headless')
browser = webdriver.Chrome(
    options=options, executable_path='/Users/uppinder/Downloads/Software/chromedriver-mac-x64/chromedriver')
browser.get(url)

showList = []

try:
    if page == 'shows':
        if orientation == 'horizontal':
            myElem = WebDriverWait(browser, 30).until(
                EC.presence_of_element_located((By.CLASS_NAME, 'styles-gridTemplate-vIOBVqX5')))
        else:
            myElem = WebDriverWait(browser, 30).until(
                EC.presence_of_element_located((By.CLASS_NAME, 'styles-categoryWrapper-19ZEld4e')))
    elif page == 'mindblown':
        myElem = WebDriverWait(browser, 30).until(
            EC.presence_of_element_located((By.CLASS_NAME, 'styles-gridContainer-2oo0Qu1Z')))

    html = browser.page_source
    soup = BeautifulSoup(html, features="html.parser")

    if page == 'shows':
        grid_templates = None
        if orientation == 'horizontal':
            grid_templates = soup.find_all(
                attrs={"class": "styles-gridTemplate-vIOBVqX5"})
        else:
            grid_templates = soup.find_all(
                attrs={"class": "styles-categoryWrapper-19ZEld4e"})

        for item in grid_templates:
            show = {}

            if orientation == 'horizontal':
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
                show['thumbnail'] = show_thumbnail['src'].replace(
                    '&w=327', '&w=700')
                show['isPremium'] = True if premium_icon else False
                show['hasNewEpisodes'] = True if show_new_episodes else False

            else:
                show_link = item.find(
                    attrs={"class": "styles-href-1fNufSlc"})
                show_title = item.find(
                    attrs={"class": "styles-basicShowName-2gClxIxX"})
                show_desc = item.find(
                    attrs={"class": "styles-basicShowDesc-3RVyVMPP"})
                show_thumbnail = item.find(
                    attrs={"class": "styles-thumbnailImage-3_Ss8vN_"})
                premium_icon = item.find(
                    attrs={"class": "styles-premiumIcon-384gksj1"})
                show_new_episodes = item.find(
                    attrs={"class": "styles-Episodes-39meHwWO"})

                show['id'] = show_link['href'].split('/')[-1]
                show['title'] = show_title.text.strip()
                show['desc'] = show_desc.text.strip()
                show['thumbnail'] = show_thumbnail['srcset'].split()[0].replace(
                    '?w=214', '?w=428')
                show['isPremium'] = True if premium_icon else False
                show['hasNewEpisodes'] = True if show_new_episodes else False

            showList.append(show)

    elif page == 'mindblown':
        grid_container = None
        grid_container = soup.find(
            attrs={"class": "styles-gridContainer-2oo0Qu1Z"}).find_all('a')

        for item in grid_container:
            mindblown = {}

            show_link = item
            show_title = item.find(
                attrs={"class": "styles-titleText-1Q6upqv_"})
            show_desc = item.find(
                attrs={"class": "styles-description-2csIrnqM"})
            show_thumbnail = item.find(
                attrs={"class": "styles-thumbnailImage-2lSdxJk-"})
            video_count = item.find(
                attrs={"class": "styles-videoCount-2MpqnLs0"})

            mindblown['id'] = show_link.get('href').split('/')[-1]
            mindblown['title'] = show_title.text.strip()
            mindblown['desc'] = show_desc.text.strip()
            mindblown['thumbnail'] = show_thumbnail['srcset'].split()[0].replace(
                '?w=400', '?w=800')
            mindblown['videoCount'] = video_count.text.strip()

            showList.append(mindblown)

    print(json.dumps(showList))


except TimeoutException:
    print('Timed out.')


browser.quit()
