{{{
    "title"    : "Tunnel The Interwebz On Ur Linux In A Few Minutes",
    "tags"     : [ "ec2", "linux", "tcp/ip", "proxies" ],
    "category" : "haxxor",
    "date"     : "01-30-2014"
}}}



This is how to setup a pretty good private proxy server on Amazon Elastic Compute Cloud (EC2) and how to tunnel into it via SSH from your Linux (or PC or Mac or whatever). Proxies at-will. Although your anonymity is DEFINITELY not 100% guaranteed, you will be able to hide your identity from most sites and bypass most country restrictions.

#Create A Private Proxy On Ur Linux In A Few Minutes#

##Simple Steps##

###1. Create an Amazon Web Services (AWS) Account###

First thing you will need is an AWS account. Go to the AWS Portal and sign up.
You will need a credit card to complete this process. But this is Amazon. Doesn't everyone have an Amazon account?

If your too young to have a credit card you're reading this, go study something else. ;)

Why AWS? It is my preference, they commit to 99.95% uptime and they offer 750 hours of Amazon EC2 Micro Instance usage as part of their free usage tier. But a Pandora's Box of cloud service exist out there (and more and more everyday).

Although this post primarily uses AWS, these steps can easily be replicated on any VPS hosting service offered all over the internet, as well as LANs and other 'creative set-ups' (b-careful kiddiez)

###2. Creating an EC2 Instance###

Once in the EC2 Dashboard click the Launch Instance button. Follow the steps in the wizard and launch the instance.

Once your instance has been started and is up and running, take note of the Public DNS. We will net that IP Address to SSH in.

(FUN FACT: Unless you use an Elastic IP, the Public DNS will change every time you restart the instance.)

###3. SSH'n and Tinyproxy###

This tut assumes you are using Ubunut or at least a POSIX system of some sort. If you are on Windows, install Linux immediately. If you dont wanna, then Putty or PowerShell should do the trick for creating the web tunnel.

Open your terminal and make sure you are using the PEM key pair you downloaded when you ran the wizard above. Make this command: `ssh -i ~/.ssh/ur-kewl-proxy.pem ubuntu@ec2-your-ip-address-here.compute-1.amazonaws.com`

You should connect to you EC2 instace. Now, install TinyProxy:

`sudo apt-get install tinyproxy`

By default Tinyproxy listens on port 8888 and only accepts local connections. This is not a problem since we will be tunneling in via SSH.

###Tunneling The Interwebz###

Open the terminal and type to tunnel:

`ssh -L 3128:localhost:8888 -N -i ~/.ssh/ur-kewl-proxy.pem ubuntu@ec2-your-ip-address-here.compute-1.amazonaws.com`

###4. Configure Your Ubuntu Linux###

Go to 'system settings'. Don't know what that is, search for in in the Unity Dashboard. Click the network icon. (See Below)

<img src="/images/network.png" />

Then click the network tag, set proxy to 'manual' and add the information you see there. (See Below)

<img src="/images/proxy.png" />

That's it, open your web browser and google 'what is my ip'. Big G should give you the IP of your Amazon EC2 instance.

###What's the Point?###

Well, kiddiez, that is for me to know and you to figure out. Be careful with this info. This has applications across a wide range of services an app or website may need for remote communications, for one example. It could be used to switch to a Mexican IP, for instance, to test how a web site may act when it recognizes an IP from a particulary country. Many good uses out there.
