sudo apt-get -y install git libopencv-dev nodejs-legacy npm libasound2-dev alsa-utils mongodb libcairo2-dev libjpeg8-dev libpango1.0-dev libgif-dev build-essential g++ uvcdynctrl v4l-utils ocl-icd-libopencl1
uvcdynctrl -i /usr/share/uvcdynctrl/data/046d/logitech.xml

npm config set registry http://registry.npmjs.org/ 
npm install -g node-gyp 
npm cache clean -f 
npm install -g n 
n 0.12.7 

mkdir /data
cd /data
git clone https://github.com/fgu-cas/arenomat
cd arenomat
cp ./install/arenomat.conf /etc/init
