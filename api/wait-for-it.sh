#!/usr/bin/env bash
# wait-for-it.sh

TIMEOUT=15
HOST=$1
PORT=$2
shift 2
CMD="$@"

# Parse arguments
while [[ "$#" -gt 0 ]]; do
    case $1 in
        --timeout=*) TIMEOUT="${1#*=}"; shift ;;
        --) shift; CMD="$@"; break ;;
        *) break ;;
    esac
done

# Check if HOST:PORT is available
echo "Waiting for $HOST:$PORT to be available..."
for i in $(seq $TIMEOUT); do
    nc -z "$HOST" "$PORT" && break
    echo "Attempting to connect to $HOST:$PORT ($i/$TIMEOUT)"
    sleep 1
done

if ! nc -z "$HOST" "$PORT"; then
    echo "Timeout occurred after waiting $TIMEOUT seconds for $HOST:$PORT."
    exit 1
fi

echo "$HOST:$PORT is available! Executing command."
exec $CMD
