# Bash script that starts the NZ news collator app by first collating all articles using a Python script,
# then it runs the app locally

python collator.py

start chrome http://localhost:3000

node server.js
