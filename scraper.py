import json
import time
import random
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException
from bs4 import BeautifulSoup

page = 'superstars'  # shows, mindblown, shorts, superstars
orientation = 'horizontal'
url = 'https://www.discoveryplus.in/superstars/mister-maker'

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
    elif page == 'shorts':
        myElem = WebDriverWait(browser, 30).until(
            EC.presence_of_element_located((By.CLASS_NAME, 'styles-containerWeb-1JtmYkko')))
        # Scroll to bottom
        for _ in range(10):
            browser.execute_script(
                "window.scrollTo(0, document.body.scrollHeight);")
            time.sleep(3)
    elif page == 'superstars':
        myElem = WebDriverWait(browser, 30).until(
            EC.presence_of_element_located((By.CLASS_NAME, 'styles-gridContainer-3yULnzY0')))

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

    elif page == 'shorts':
        categories = ['adventure',
                      'food',
                      'science',
                      'animals',
                      'lifestyle']

        shortsCards = soup.find_all(
            attrs={"id": "shortsCard"})

        for item in shortsCards:
            card = {}

            show_title = item.find(
                attrs={"class": "styles-chevronTitle-29PRaGHu"})
            show_rating = item.find_all(
                attrs={"class": "styles-contentRatingTexts-2kBylqSd"})
            show_thumbnail = item.find(
                attrs={"class": "styles-bannerImage-2hTagx3I"})

            card['title'] = show_title.text.strip()
            card['category'] = random.choice(categories)
            card['thumbnail'] = show_thumbnail['src'].replace(
                '&w=700', '&w=1600')

            rating_texts = [t.text.strip() for t in show_rating]
            if rating_texts:
                card['rating'] = rating_texts[0] + ' ' + rating_texts[1]

                if len(rating_texts) > 2:
                    card['rating'] += ' | ' + \
                        rating_texts[2] + ' ' + rating_texts[3]
                    if len(rating_texts) > 4:
                        card['rating'] += ' DOT ' + \
                            ' DOT '.join(rating_texts[4:])

            showList.append(card)

    elif page == 'superstars':
        grid_container = soup.find_all(
            attrs={"class": "styles-wrapper-2EYq-6WB"})

        for item in grid_container:
            card = {}

            show_link = item.find(
                attrs={"class": "styles-href-1fNufSlc"})
            show_title = item.find(
                attrs={"class": "styles-title-1nosiuwi"})
            show_desc = item.find(
                attrs={"class": "styles-descriptionContent-28A8egQw"})
            show_thumbnail = item.find(
                attrs={"class": "styles-thumbnailImage-1ZuUX8wm"})
            show_duration = item.find(
                attrs={"class": "styles-duration-WeX9hpws"})
            premium_icon = item.find(
                attrs={"class": "styles-premiumIcon-1cFRuPCc"})

            card['id'] = show_link['href'].split('/')[3].split('?')[0]
            card['title'] = show_title.text.strip()
            card['desc'] = show_desc.text.strip()
            card['thumbnail'] = show_thumbnail['srcset'].split()[0].replace(
                '?w=300', '?w=600')
            card['isPremium'] = True if premium_icon else False
            card['duration'] = show_duration.text.strip()

            showList.append(card)

    print(json.dumps(showList))


except TimeoutException:
    print('Timed out.')


browser.quit()
