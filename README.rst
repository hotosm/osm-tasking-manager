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

Run OSMTM
---------

To run OSMTM the easiest is to use ``paster serve``::

    $ paster serve development.ini
