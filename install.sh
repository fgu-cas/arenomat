sudo apt-get update
sudo apt-get -y install libopencv-dev nodejs-legacy npm mc libasound2-dev git subversion
sudo npm config set registry http://registry.npmjs.org/ 
sudo npm install -g node-gyp 
npm cache clean -f
sudo npm install -g n 
sudo n stable 

