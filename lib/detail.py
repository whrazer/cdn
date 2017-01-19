import os
import sys
import subprocess
import time

filename = sys.argv[1]
f = open(filename, 'r')
flag = False
count = 0 
dic = {}
for line in f:
	try:
		line = line.strip('\n')
		if "http" not in line:
			ln = line.split(" ")
			details = line
			dic[ln[0]] = details
	except subprocess.CalledProcessError:
		print "Oops error for website", line

for i,j in dic.items():
	print j