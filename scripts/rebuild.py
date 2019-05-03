#! /usr/bin/python
import json
import urllib2
import time

while True: 
	try:
		res = urllib2.urlopen('https://api.istodaymeatballsday.com').read()
		f = open('/var/www/istodaymeatballsday.com/res.json', 'w+').write(res)

		answer = json.loads(res)['msg']
		f = open('~/Web/scripts/index.template.html', 'r').read()
		new_html = f.replace('_ANSWER_', answer)
		f = open('/var/www/istodaymeatballsday.com/index.html', 'w+').write(new_html)
		break
	except Exception as e:
		print('went badly, tries again in 1000 ms...')
		print(e)
		time.sleep(1)

print('done')