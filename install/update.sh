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
echo -e " ${LRED}#${NC}  ${GREEN}Updating SiteMonitor App${NC} ${LRED}#${NC}"
echo -e " ${LRED}########################################${NC}"
echo -e "Progress:1"

###################################
##  Install Python Dependencies  ##
###################################
echo -e " ${LRED}-${NC}${WHITE} Updating Python Dependencies...${NC}"

cd $SITEMONITOR

sudo python3 -m pip install -r install/requirements.txt

echo -e "Progress:25"
sleep 1

##########################
## Install UI           ##
##########################
echo -e "\n ${LRED}-${NC}${WHITE} Updating UI Modules..${NC}\n"
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

##########################
## Restart Services     ##
##########################
echo -e "\n ${LRED}-${NC}${WHITE} Restarting Services..${NC}\n"
sudo systemctl daemon-reload

sudo systemctl restart sitemonitor-server.service

echo -e "Progress:100"