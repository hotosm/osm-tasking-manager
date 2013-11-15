OpenStreetMap Tasking Manager
=============================

About
-----

OSMTM enables collaborative work on specific areas in OpenStreetMap by defining
clear workflows to be achieved and by breaking tasks down into pieces.

The application is written in Python using the Pylons framework.


Dependencies
------------

OSMTM has a set of dependencies that you need to install first.

On debian systems you can do::

    sudo apt-get install build-essential protobuf-compiler libprotobuf-dev libgeos-dev python-dev

On OS X you can do::

    brew install protobuf geos


Installation
------------

First clone the git repository::

    git clone git://github.com/hotosm/osm-tasking-manager.git

Update and load the submodules::
    
    cd osm-tasking-manager
    git submodule update --init

Installing OSMTM in a Virtual Python environment is recommended.

To create a virtual Python environment::

    wget http://pypi.python.org/packages/source/v/virtualenv/virtualenv-1.8.tar.gz
    tar xvzf virtualenv-1.8.tar.gz
    python virtualenv-1.8/virtualenv.py --distribute --no-site-packages env
    rm -rf distribute-0.6.28.tar.gz
    rm -rf virtualenv-1.8*
    source env/bin/activate

To install OSMTM from source (the only option at this point) in the virtual
Python environment execute the ``setup.py`` script::

    python setup.py install

Edit the development.ini file and change the ``admin_user`` variable to match
your OSM username. 


Run OSMTM
---------

To run OSMTM the easiest is to use ``pserve``::

    pserve --reload development.ini


Installation as a mod_wsgi Application
--------------------------------------

Edit the production.ini file and change the ``admin_user`` variable to match
your OSM username.

Install and enable mod_wsgi module in Apache::

    sudo apt-get install libapache2-mod-wsgi

Create a new Apache config file with the following::

    # Use only 1 Python sub-interpreter.  Multiple sub-interpreters                                                                                                                                                                                                                                                           
    # play badly with C extensions.
    WSGIPassAuthorization On
    WSGIDaemonProcess OSMTM_process user=ubuntu group=ubuntu processes=1 \
       threads=4 \
       python-path=/home/ubuntu/osm-tasking-manager/env/lib/python2.7/site-packages
    WSGIScriptAlias /OSMTM /home/ubuntu/osm-tasking-manager/env/OSMTM.wsgi
    WSGIRestrictStdin Off

    <Location /OSMTM>
        WSGIProcessGroup OSMTM_process
        WSGIApplicationGroup %{GLOBAL}
    </Location>

You may need to adpat the user, group and paths values.

Create a new `OSMTM.wsgi` in your virtual env directory with the following::
    
    import sys
    sys.stdout = sys.stderr

    from pyramid.paster import get_app    
    application = get_app(
        '/home/ubuntu/osm-tasking-manager/production.ini', 'main')

You can then test config and restart Apache.
Your application should be available at http://host.domain/OSMTM

Styles
------

The CSS stylesheet are compiled using less. Launch the following command as
soon as you change the css::

    lessc OSMTM/static/css/main.less > OSMTM/static/css/main.less.min.css

Run Tests
---------

To ensure your build is working properly run the tests (in active virtual env)::

    nosetests

Upgrade notes
-------------

Database versions are now managed using Alembic.
The following commands should help upgrading the database.

*Don't forget to make copies of your db file before running any upgrade.*::

    alembic upgrade head

Note: Please contact the maintainer if you encounter problems.
