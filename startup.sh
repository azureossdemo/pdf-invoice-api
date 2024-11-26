#!/bin/bash

# Install necessary dependencies for Puppeteer
apt-get update && apt-get install -y \
    libnss3 \
    libxss1 \
    libasound2 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libgdk-pixbuf2.0-0 \
    libgtk-3-0 \
    libx11-xcb1 \
    libxcb-dri3-0 \
    libxcomposite1 \
    libxrandr2 \
    libgobject-2.0-0 \
    libglib2.0-0

# Run the default Node.js application
node app.js