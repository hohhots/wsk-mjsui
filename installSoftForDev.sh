#!/bin/bash

#sudo apt-get update && time sudo apt-get upgrade

COMMANDS=( 'python' 'fab' 'git' 'node' 'unzip' )
COMMANDSPACKAGES=( 'python' 'fabric' 'git' 'nodejs' 'unzip' )
comNum=${#COMMANDS[@]}
for(( i=0;i<$comNum;i++)); do
    echo "Checking if command \"${COMMANDS[${i}]}\" exists! It's package name is ${COMMANDSPACKAGES[${i}]}"
    if [ -z `which ${COMMANDS[${i}]}` ]  #if com empty
    then
        sudo apt-get install -y ${COMMANDSPACKAGES[${i}]}
        echo "${COMMANDS[${i}]} installed!"
    else
        echo "${COMMANDS[${i}]} already installed!"
    fi
done

fab setup
