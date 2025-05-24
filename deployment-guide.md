# Guide de Déploiement - MGT BatiPro

## Prérequis

- Serveur Linux (Ubuntu/Debian recommandé)
- Docker et Docker Compose installés
- Nginx installé
- Nom de domaine `mtgeniebati.com` pointant vers votre serveur

## Configuration Email

1. Créez un fichier `.env` à la racine du projet :
```bash
cp .env.example .env
```

2. Modifiez le fichier `.env` avec vos informations email :
```bash
MAIL_USER=votre-email@mtgeniebati.com
MAIL_PASS=votre-mot-de-passe-email
NODE_ENV=production
PORT=3000
```

## Déploiement avec Docker

1. Construire et lancer l'application :
```bash
docker-compose up -d --build
```

2. Vérifier que l'application fonctionne :
```bash
docker-compose logs -f mgtbatipro
```

## Configuration Nginx

1. Copier la configuration Nginx :
```bash
sudo cp default.conf /etc/nginx/sites-available/mtgeniebati.com
sudo ln -s /etc/nginx/sites-available/mtgeniebati.com /etc/nginx/sites-enabled/
```

2. Tester la configuration :
```bash
sudo nginx -t
```

3. Redémarrer Nginx :
```bash
sudo systemctl reload nginx
```

## SSL avec Let's Encrypt (Optionnel)

1. Installer Certbot :
```bash
sudo apt install certbot python3-certbot-nginx
```

2. Obtenir le certificat SSL :
```bash
sudo certbot --nginx -d mtgeniebati.com -d www.mtgeniebati.com
```

## Commandes de Maintenance

- Voir les logs : `docker-compose logs -f`
- Redémarrer l'application : `docker-compose restart`
- Mettre à jour : `docker-compose down && docker-compose up -d --build`
- Arrêter : `docker-compose down`

## Configuration Email Provider

Vous devrez ajuster la configuration SMTP dans `server/routes.ts` selon votre provider :

- **OVH** : `ssl0.ovh.net:465`
- **Gmail** : `smtp.gmail.com:587`
- **Outlook** : `smtp-mail.outlook.com:587`

## Structure des Fichiers de Déploiement

- `Dockerfile` : Configuration Docker
- `docker-compose.yml` : Orchestration des conteneurs
- `default.conf` : Configuration Nginx
- `.env.example` : Template des variables d'environnement