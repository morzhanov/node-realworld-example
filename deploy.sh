# install AWS SDK
pip install --user awscli
export PATH=$PATH:$HOME/.local/bin

echo 'In deploy script'

# install necessary dependency for ecs-deploy
add-apt-repository ppa:eugenesan/ppa
apt-get update
apt-get install jq -y

# install ecs-deploy
curl https://raw.githubusercontent.com/silinternational/ecs-deploy/master/ecs-deploy | \
  sudo tee -a /usr/bin/ecs-deploy
sudo chmod +x /usr/bin/ecs-deploy

# login AWS ECR
eval $(aws ecr get-login --no-include-email --region us-east-2)

# build the docker image and push to an image repository
docker build -t node-realworld-example .
docker tag node-realworld-example:latest $IMAGE_REPO_URL:latest
docker push $IMAGE_REPO_URL:latest

echo $CLUSTER_NAME
aws ecs list-clusters

# update an AWS ECS service with the new image
ecs-deploy -c $CLUSTER_NAME -n $SERVICE_NAME -i $IMAGE_REPO_URL:latest
