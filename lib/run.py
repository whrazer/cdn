import os
import sys
import subprocess
import time


filename = sys.argv[1]
sig = sys.argv[2]
f = open(filename, 'r')
flag = False
count = 0 
for line in f:
	try:
		if(count >= 1000):
			break
		if(count >= 500):
			line = line.strip('\n')
			output = subprocess.check_output(['node','./lib/client.js', line, sig])
		count += 1
	except subprocess.CalledProcessError:
		print "Oops error for website", line