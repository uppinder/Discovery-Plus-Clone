import json

shows = {}
data_keys = ['collection-view-all', 'genres', 'channels']
total_shows = 0

file_path = 'db.json'
with open(file_path, 'r') as json_file:
    data = json.load(json_file)

    for data_key in data_keys:
        for obj in data[data_key]:
            for showObj in obj['showList']:
                total_shows += 1

print(total_shows)
