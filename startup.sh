#!/bin/bash

# Install the local .deb package
dpkg -i /home/site/libglib2.0-0_2.74.6-2+deb12u4_amd64.deb

# If there are any missing dependencies, fix them
apt-get install -f -y

# Run the default Node.js application
node app.js
