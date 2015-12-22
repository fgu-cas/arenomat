#!/bin/sh -e
uvcdynctrl -s "Exposure, Auto" 1
uvcdynctrl -s "Focus, Auto" 0

cd /data/arenomat
sudo pm2 start app.js

