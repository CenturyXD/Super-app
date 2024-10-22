echo "Switch to branch origin"
git checkout main

echo "Build the frontend"

npm run build

echo "Deploy the frontend"

scp -r dist/* root@203.154.82.95:/var/www/203.154.82.95/

echo "Done"