# portfolio.cafitac.com — 정적 사이트를 nginx 이미지에 굽는다(homelab k8s 에서 쓴다).
FROM nginx:1.27-alpine
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY site/ /usr/share/nginx/html/
