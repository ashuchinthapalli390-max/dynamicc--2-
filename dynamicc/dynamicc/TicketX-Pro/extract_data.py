import re

with open('index.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

def extract_array(start_marker):
    inside = False
    bracket_count = 0
    arr_lines = []
    for line in lines:
        if not inside and start_marker in line:
            inside = True
            arr_lines.append(line[line.find('['):])
            bracket_count += line.count('[') - line.count(']')
            continue
            
        if inside:
            arr_lines.append(line)
            bracket_count += line.count('[') - line.count(']')
            if bracket_count <= 0:
                break
    
    if not arr_lines: return ''
    
    block = ''.join(arr_lines)
    # rudimentary JSON conversion
    block = block.replace("'", '"')
    block = re.sub(r'([{,]\s*)([a-zA-Z0-9_]+)\s*:', r'\1"\2":', block)
    return block

categories = ['movies', 'trains', 'flights', 'buses', 'events', 'hotels']

for cat in categories:
    marker = f'{cat}: ['
    arr_json = extract_array(marker)
    if arr_json:
        arr_json = arr_json.strip()
        if arr_json.endswith(','): arr_json = arr_json[:-1]
        
        with open(f'server/data/{cat}.json', 'w', encoding='utf-8') as out:
            out.write(arr_json)
        print(f'Extracted {cat}.json')
