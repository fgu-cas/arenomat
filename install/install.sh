apt-get update 
apt-get -y --download-only dist-upgrade 
apt-get -y dist-upgrade

sudo apt-get -y install git libopencv-dev nodejs-legacy npm libasound2-dev alsa-utils mongodb libcairo2-dev libjpeg8-dev libpango1.0-dev libgif-dev build-essential g++
sudo npm config set registry http://registry.npmjs.org/ 

npm cache clean -f sudo 

npm install -g n
sudo n stable 
sudo npm install -g node-gyp 

git clone http://git.michalvondracek.cz/arenomat.git
cd arenomat
npm install

# Configurable-dev Firmata
# git clone -b configurable_dev --single-branch https://github.com/firmata/arduino.git 
#https://github.com/firmata/arduino.git
#https://github.com/nicolaspanel/firmatajs
