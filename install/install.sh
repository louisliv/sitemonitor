#!/bin/bash

GREEN='\033[0;32m'
LGREEN='\033[1;32m'
LRED='\033[1;31m'
WHITE='\033[1;37m'
ORANGE='\033[0;33m'
NC='\033[0m'
RUNASROOT="run-as-root"
NOROOT="no-root"

SCRIPTPATH=$(realpath $0)
SITEMONITOR=`pwd`

clear
echo -e " ${LRED}########################################${NC}"
echo -e " ${LRED}#${NC}  ${GREEN}Installing SiteMonitor App${NC} ${LRED}#${NC}"
echo -e " ${LRED}########################################${NC}"
echo -e "Progress:1"

########################
##  Remove Old Files  ##
########################
echo -e " ${LRED}-${NC}${WHITE} Removing old files...${NC}"
sudo rm /var/www/sitemonitor
sudo rm /etc/systemd/system/sitemonitor-server.service
sudo rm /var/log/sitemonitor.error.log
sudo rm /var/log/sitemonitor.log
sudo rm -rf $SITEMONITOR/client/build


###################################
##  Install Python Dependencies  ##
###################################
echo -e " ${LRED}-${NC}${WHITE} Python Dependencies...${NC}"

cd $SITEMONITOR

sudo apt -y install python3-pip
sudo python3 -m pip install -r install/requirements.txt

echo -e "Progress:25"
sleep 1

################################
##  Install APT Dependencies  ##
################################
echo -e " ${LRED}-${NC}${WHITE} Installing apt Packages...${NC}"

sudo apt -y install nodejs npm

echo -e "Progress:30"
sleep 1

##########################
## Install UI           ##
##########################
echo -e "\n ${LRED}-${NC}${WHITE} Installing UI..${NC}\n"
cd $SITEMONITOR/client
npm install

echo -e "Progress:60"
sleep 1

##########################
## Build UI             ##
##########################
echo -e "\n ${LRED}-${NC}${WHITE} Building UI..${NC}\n"
cd $SITEMONITOR/client
npm run build

echo -e "Progress:80"
sleep 1

################################
##  Set Sym Links  ##
################################
echo -e " ${LRED}-${NC}${WHITE} Setting Sym Links...${NC}"

cd $SITEMONITOR
sudo ln -s $SITEMONITOR /var/www
sudo ln -s $SITEMONITOR/sitemonitor-server.service /etc/systemd/system/

sudo systemctl daemon-reload

sudo systemctl start sitemonitor-server.service
sudo systemctl enable sitemonitor-server.service

echo -e "Progress:90"
sleep 1

echo -e "Progress:100"