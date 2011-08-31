OpenStreetMap Tasking Manager
=============================

About
-----
This application is intented to be used as a way to organize collaborative work on specific areas by defining workflows and tasks (tiles) to be achieved.

Installation
------------

Installing OSMTM in a Virtual Python environment is recommended.

To create a virtual Python environment::

    $ wget http://pypi.python.org/packages/source/v/virtualenv/virtualenv-1.5.1.tar.gz
    $ tar xvzf virtualenv-1.5.1.tar.gz
    $ python virtualenv-1.5.1/virtualenv.py --distribute --no-site-packages env
    $ source env/bin/activate

To install OSMTM from source (the only option at this point) in the virtual
Python environment execute the ``setup.py`` script::

    $ cd OSMTM
    $ python setup.py install

Previously, you may need to install some packages::

    $ sudo apt-get install build-essential protobuf-compiler libprotobuf-dev libgeos-dev

Run OSMTM
---------

To run OSMTM the easiest is to use ``paster serve``::

    $ paster serve development.ini

Installation as a mod_wsgi Application
--------------------------------------

Install and enable mod_wsgi module in Apache::

    $ sudo apt-get install libapache2-mod-wsgi

Create a new Apache config file with the following::

    # Use only 1 Python sub-interpreter.  Multiple sub-interpreters                                                                                                                                                                                                                                                           
    # play badly with C extensions.
    WSGIPassAuthorization On
    WSGIDaemonProcess OSMTM_process user=ubuntu group=ubuntu processes=1 \
       threads=4 \
       python-path=/home/ubuntu/env/lib/python2.6/site-packages
    WSGIScriptAlias /OSMTM /home/ubuntu/env/OSMTM.wsgi
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
        '/home/ubuntu/OSMTM/production.ini', 'main')

You can then test config and restart Apache.
Your application should be available at http://host.domain/OSMTM
