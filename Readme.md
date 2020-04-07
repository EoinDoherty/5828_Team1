# Team Rocket

[![CircleCI](https://circleci.com/gh/EoinDoherty/5828_Team1.svg?style=svg)](https://circleci.com/gh/EoinDoherty/5828_Team1)

[https://team1project.appspot.com/](https://team1project.appspot.com/)

### ELK Setup

Follow [ELK tutorial setup](https://www.freecodecamp.org/news/how-to-use-elasticsearch-logstash-and-kibana-to-visualise-logs-in-python-in-realtime-acaab281c9de/).

Items to keep in mind:
	* Change logfile path in logstash.conf to point to your logfile
	* Copy logstash.conf to install `logstash/config` folder and run logstash using `bin/logstash` command
	* Check `http://localhost:9200/_cat/indices?v` for the indices created
	* Configure index on kibana(`http://localhost:5601/`) and create charts for visualization

 



