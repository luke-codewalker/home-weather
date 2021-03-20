echo "--- 1: Stopping running servers ---"
./stop.sh

echo "--- 2: Pulling latest code from Github ---"
git pull

echo "--- 3: Starting up server ---"
./start-prod.sh
