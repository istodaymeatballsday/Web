#! /usr/bin/python
import json
import urllib2

res = urllib2.urlopen('https://api.istodaymeatballsday.com').read()
f = open('res.json', 'w+').write(res)


answer = json.loads(res)['msg']
f = open('index.template.html', 'r').read()
new_html = f.replace('_ANSWER_', answer)
f = open('/var/www/istodaymeatballsday.com/index.html', 'w+').write(new_html)
