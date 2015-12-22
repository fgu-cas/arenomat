
sudo apt-get -y install git libopencv-dev nodejs-legacy npm libasound2-dev alsa-utils mongodb libcairo2-dev libjpeg8-dev libpango1.0-dev libgif-dev build-essential g++ uvcdynctrl v4l-utils ocl-icd-libopencl1
uvcdynctrl -i /usr/share/uvcdynctrl/data/046d/logitech.xml
apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo "deb http://repo.mongodb.org/apt/ubuntu "$(lsb_release -sc)"/mongodb-org/3.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-3.0.list
apt-get update && apt-get install -y mongodb-org

npm config set registry http://registry.npmjs.org/ 
npm cache clean -f 
npm install -g node-gyp pm2 

mkdir /data
cd /data
git clone https://github.com/fgu-cas/arenomat
cd arenomat

cp ./install/asound.conf /etc/

pm2 startup
pm2 start app.js
pm2 save
