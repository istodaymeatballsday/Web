#! /usr/bin/python
import json
import urllib2
import time
import sys

tries = 10
while tries >= 0:
	try:
		res = urllib2.urlopen('https://api.istodaymeatballsday.com').read()
		f = open('/istodaymeatballsday.com/build/res.json', 'w+').write(res)

		answer = json.loads(res)['msg']
		f = open('/istodaymeatballsday.com/Web/index.template.html', 'r').read()
		new_html = f.replace('_ANSWER_', answer)
		f = open('/istodaymeatballsday.com/build/index.html', 'w+').write(new_html)
		break
	except Exception as e:
		tries -= 1
		print('went badly, ' + str(tries) + ' tries left, tries again in 10000 ms...')
		print(e)
		time.sleep(10)

print('done')