#!/bin/bash

set -e

case "$1" in

  start)
    docker-compose up -d
    ;;

  stop)
    docker-compose down
    ;;

  restart)
    docker-compose down && docker-compose up -d
    ;;

  status)
    docker ps
    ;;

  logs)
    docker-compose logs -f
    ;;

  seed)
    curl -X POST http://localhost:3000/api/v1/heartbeats \
      -H "Content-Type: application/json" \
      -d '{"hostId":"api-01","cpuUsage":70,"memoryUsage":60,"diskUsage":50}'
    ;;

  snapshot)
    docker exec -t $(docker ps -qf "name=db") pg_dump -U postgres digital_twin > backup.sql
    ;;

  *)
    echo "Usage: ops.sh {start|stop|restart|status|logs|seed|snapshot}"
    ;;
esac