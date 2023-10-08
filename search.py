import json

shows, search_shows = {}, []
episodes, search_episodes = {}, []

file_path = 'db.json'
with open(file_path, 'r') as json_file:
    data = json.load(json_file)

    # For shows
    data_keys = ['collection-view-all', 'genres', 'channels']
    for data_key in data_keys:
        for obj in data[data_key]:
            for show_obj in obj['showList']:
                shows[show_obj['id']] = show_obj

    for show_id, show_obj in shows.items():
        search_shows.append(show_obj)

    # For episodes
    for show in data['shows']:
        for episode_obj in show['episodes']:
            episodes[episode_obj['id']] = episode_obj

    for episode_id, episode_obj in episodes.items():
        search_episodes.append(episode_obj)

# print(json.dumps(search_shows))
print(json.dumps(search_episodes))
