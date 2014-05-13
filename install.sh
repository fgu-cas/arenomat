apt-get update 
apt-get -y --download-only dist-upgrade 
apt-get -y dist-upgrade

sudo apt-get -y install git libopencv-dev nodejs-legacy npm libasound2-dev alsa-utils mongodb
sudo npm config set registry http://registry.npmjs.org/ 

npm cache clean -f sudo 

npm install -g n
sudo n stable 
sudo npm install -g node-gyp 

git clone http://git.michalvondracek.cz/arenomat.git
cd arenomat
npm install


# advaced Firmata
# https://github.com/soundanalogous/AdvancedFirmata