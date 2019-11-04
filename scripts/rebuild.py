#!/usr/bin/python
# -- coding: utf-8 --

import sys
import urllib2
import json
from datetime import datetime
from datetime import timedelta
import time
import re
import os

dev = True if 'ENV' in os.environ and os.environ['ENV'] == 'dev' else False


def get_todays_food(start_date):
    res = json.loads(urllib2.urlopen(
        'http://carbonateapiprod.azurewebsites.net/api/v1/mealprovidingunits/' +
        '3d519481-1667-4cad-d2a3-08d558129279/dishoccurrences' +
        '?startDate=' + start_date).read())
    return res


def get_today():
    return (datetime.utcnow() + timedelta(hours=2)).strftime('%Y-%m-%d')


def parse_dishes(raw):
    if (len(raw) > 1):
        return raw[0]['displayNames'][1]['dishDisplayName'], raw[1]['displayNames'][1]['dishDisplayName']
    return None, None


def is_vegan(raw_dish):
    return re.match('vegan', raw_dish['dishType']['dishTypeName'], re.IGNORECASE)


def write_to_res(meat, vegan, ans, code):
    content = {'meat': meat, 'veg': vegan, 'msg': ans, 'code': code}
    open('/build/res.json' if not dev else 'res.json',
         'w+').write(json.dumps(content))


def write_to_html(ans):
    f = open(
        '/app/index.template.html' if not dev else 'index.template.html', 'r').read()
    new_html = f.replace('_ANSWER_', ans)
    open('/build/index.html' if not dev else 'index.html',
         'w+').write(new_html)


def main():
    while True:
        try:
            today = get_today()
            raw = get_todays_food(today)
            meat, vegan = parse_dishes(raw)
            ans, code = ('Yep.', 1) if meat and vegan and re.search(
                'meatballs.*mashed|mashed.*meatballs', meat, re.IGNORECASE) else ('Nope.', 0)

            write_to_res(meat, vegan, ans, code)
            write_to_html(ans)
            print datetime.now().__str__() + ': ' + ans + ' For date: ' + today
            break
        except Exception as e:
            print datetime.now().__str__() + ': Error, tries again in 10 sec'
            print e
            time.sleep(10)


main()
