@echo off
SET OSGEO4W_ROOT=C:\OSGeo4W64
call "C:\OSGeo4W64\bin\o4w_env.bat"
call "C:\Program Files\nodejs\nodevars.bat"
call "C:\Program Files\PostgreSQL\9.4\pg_env.bat"
@echo off
path %PATH%;%OSGEO4W_ROOT%\apps\qgis\bin

SET GIT_SSL_NO_VERIFY=true 

set PYTHONPATH=%PYTHONPATH%;%OSGEO4W_ROOT%\apps\qgis\python;
set PYTHONPATH=%PYTHONPATH%;%OSGEO4W_ROOT%\apps\Python27\Lib\site-packages
set QGIS_PREFIX_PATH=%OSGEO4W_ROOT%\apps\qgis
set PATH=C:\Program Files\Git\cmd;C:\bin\apache-tomcat-9.0.0.M4\bin;%PATH%

set CATALINA_HOME=C:\bin\apache-tomcat-9.0.0.M4
set JRE_HOME=C:\Program Files\Java\jre1.8.0_92
set JAVA_HOME=C:\Program Files\Java\jdk1.8.0_92

cd C:\Users\k.warrie\Projects\GeoSmartCity_crowdsource_client
cmd.exe  