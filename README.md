Crowdsource app LNE 
====
A client application for the geosmartcity crowdwsource api (https://github.com/GeoSmartCity-CIP/crowd-sourcing).

The [geosmartcity frontend library](https://github.com/GeoSmartCity-CIP/gsc-client), [openlayers3](http://openlayers.org/) and the [tink-toolkit](http://tink.digipolis.be/) are used to create this application. 

prerequisites
----

Install tomcat (webserver) and postgis (database)

Installers Windows:

-  http://download.osgeo.org/postgis/windows/pg95/postgis-bundle-pg95x64-setup-2.2.2-2.exe 
-  http://apache.belnet.be/tomcat/tomcat-7/v7.0.69/bin/apache-tomcat-7.0.69-windows-x64.zip 

Linux using apt:

    sudo apt-get install tomcat7
    sudo service tomcat7 start 
    sudo apt-get install postgresql postgresql-contrib

download the schema of the databse from:  https://github.com/GeoSmartCity-CIP/crowd-sourcing/raw/master/server/db-schema/crowd-sourcing.backup
create the db and roles in postgis (on localhost): 

    createuser --createdb --login --createrole --pwprompt --superuser rszturc
    createuser --login --pwprompt cs
    createdb -T template0 cs 
    psql -c "CREATE EXTENSION postgis;" cs 
    psql -c "CREATE EXTENSION postgis_topology;" cs 
    pg_restore -C -d  cs ../crowd-sourcing.backup
    
Download the backend as war-file: https://github.com/GeoSmartCity-CIP/crowd-sourcing/releases/download/v1.7/CrowdSourcing.war 
Load the crowd-sourcing backend into tomcat: http://localhost:8080/manager/html
Configure the application:

- edit: [apache-tomcat-home]\webapps\CrowdSourcing\WEB-INF\web.xml
    
   ```xml 
    ...
      <context-param>
        <param-name>db-url</param-name>
        <param-value>jdbc:postgresql://localhost:5432/cs</param-value>
      </context-param>
      <context-param>
        <param-name>db-user</param-name>
        <param-value>rszturc</param-value>
      </context-param>
      <context-param>
        <param-name>db-password</param-name>
        <param-value>123</param-value>
      </context-param>
    ...
    ```

- edit or create: [apache-tomcat-home]\webapps\CrowdSourcing\META-INF\context.xml

    ```xml 
    <?xml version="1.0" encoding="UTF-8"?>
    <Context allowCasualMultipartParsing="true" ></Context>
    ```
    
Install this app
----

Install nodejs: https://nodejs.org , on windows use the node cmd-prompt for the next actions:

Clone this repo, install bower and grunt and the dependencies defined in package.json and bower. 

    git clone https://github.com/warrieka/VMM_crowdsource_client
    npm install bower -g
    npm install grunt -g
    npm install 
    bower install 
    
Then build the application using grunt:

    grunt build
    
The folder */build* will be created and contain a .war-file to deploy to the tomcat webserver.
The folder */public* will contain the application in unpackaged form. 


