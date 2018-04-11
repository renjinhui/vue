#!/bin/bash

#node-canvas dependencies
yum install -y cairo cairo-devel cairomm-devel libjpeg-turbo-devel pango pango-devel pangomm pangomm-devel giflib-devel
#captcha font dependencies
yum install -y liberation-sans-fonts.noarch
#mongoose dependencies
yum install -y krb5-devel.x86_64
#snpm install
snpm install -d
