import os
import sys
import subprocess
import time

if len(sys.argv) < 4:
	print("Usage: python lib/run.py  <domainsListFile> <start> <range>\n")

filename = sys.argv[1]
sig = sys.argv[2]
# start = int(sys.argv[3])
start = int(sig)
range = int(sys.argv[3])
end = start + range
f = open(filename, 'r')
flag = False
count = 0 
for line in f:
	try:
		# if(count >= 1000):
		if(count >= end):
			break
		# if(count >= 500):
		if(count >= start):
			line = line.strip('\n')
			with open(os.devnull,'w') as devnull:
				output = subprocess.check_output(['node','./lib/client.js', line, sig],stderr=devnull)
		count += 1
	except subprocess.CalledProcessError:
		print "Oops error for website", line
	if(count >= end):
		break