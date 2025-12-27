# Déploiement Backend Murmure sur Render

## Prérequis

1. Compte Render : [render.com](https://render.com)
2. Repository GitHub du backend : `Murmure-Back` doit être public ou connecté à Render
3. MongoDB Atlas configuré et URL de connexion disponible
4. Token HuggingFace
5. Compte Cloudinary avec credentials

## Variables d'environnement requises

| Variable | Description | Exemple |
|----------|-------------|---------|
| `MONGODB_URI` | URL de connexion MongoDB Atlas | `mongodb+srv://user:pass@cluster.mongodb.net/murmure` |
| `HF_TOKEN` | Token d'accès HuggingFace | `hf_xxxxxxxxxxxxx` |
| `CLOUDINARY_CLOUD_NAME` | Nom du cloud Cloudinary | `your-cloud-name` |
| `CLOUDINARY_API_KEY` | Clé API Cloudinary | `123456789012345` |
| `CLOUDINARY_API_SECRET` | Secret API Cloudinary | `abcdefghijklmnopqrstuvwxyz` |

## Déploiement

### Méthode 1 : Blueprint (Automatique) - RECOMMANDÉ

1. **Poussez le fichier render.yaml sur GitHub**
   ```bash
   git add render.yaml
   git commit -m "Add Render configuration"
   git push origin main
   ```

2. **Créez le service depuis Render**
   - Allez sur [dashboard.render.com](https://dashboard.render.com)
   - Cliquez sur "New +" → "Blueprint"
   - Sélectionnez votre repository `Murmure-Back`
   - Render détectera automatiquement `render.yaml`
   - Cliquez sur "Apply"

3. **Ajoutez les variables d'environnement**
   - Dans le dashboard, sélectionnez votre service `murmure-backend`
   - Allez dans l'onglet "Environment"
   - Ajoutez toutes les variables listées ci-dessus

4. **Déployez**
   - Le déploiement démarre automatiquement
   - Attendez que le statut passe à "Live" (5-10 minutes)

### Méthode 2 : Création manuelle

1. **Créez un nouveau Web Service**
   - Dashboard → "New +" → "Web Service"
   - Connectez votre repository GitHub `Murmure-Back`

2. **Configuration du service**
   - **Name** : `murmure-backend`
   - **Region** : Frankfurt (ou votre préférence)
   - **Branch** : `main`
   - **Root Directory** : (laisser vide si le repo = Murmure-Back)
   - **Runtime** : Node
   - **Build Command** : `npm install`
   - **Start Command** : `npm start`
   - **Plan** : Free

3. **Variables d'environnement**
   - Cliquez sur "Advanced" ou allez dans "Environment" après création
   - Ajoutez toutes les variables listées ci-dessus

4. **Créez le service**
   - Cliquez sur "Create Web Service"
   - Le déploiement démarre automatiquement

## Vérification

1. **Vérifiez les logs**
   - Dans le dashboard Render, cliquez sur votre service
   - Onglet "Logs" pour voir le démarrage du serveur
   - Vous devriez voir : `Serveur démarré sur http://localhost:10000`

2. **Testez l'endpoint**
   - Visitez l'URL de votre service (ex: `https://murmure-backend.onrender.com`)
   - Vous devriez voir "Serveur OK"

3. **Notez l'URL du backend**
   - Copiez l'URL complète (ex: `https://murmure-backend.onrender.com`)
   - Vous en aurez besoin pour configurer le frontend

## Configuration MongoDB Atlas

Si vous n'avez pas encore configuré MongoDB Atlas :

1. **Créez un compte** : [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. **Créez un cluster gratuit** (M0)
3. **Configuration réseau** :
   - Database Access → Add Database User (créez user/password)
   - Network Access → Add IP → "0.0.0.0/0" (Allow from anywhere)
4. **Récupérez l'URL** :
   - Clusters → Connect → Connect your application
   - Copiez la connection string
   - Remplacez `<password>` par votre mot de passe
   - Format : `mongodb+srv://username:password@cluster.mongodb.net/murmure`

## Configuration HuggingFace

1. Créez un compte : [huggingface.co](https://huggingface.co)
2. Settings → Access Tokens
3. Créez un token (Read access suffit)
4. Copiez le token (commence par `hf_`)

## Configuration Cloudinary

1. Créez un compte : [cloudinary.com](https://cloudinary.com)
2. Dashboard → Account Details
3. Notez :
   - Cloud Name
   - API Key
   - API Secret

## Dépannage

### Le service ne démarre pas
```
✓ Vérifiez les logs dans le dashboard Render
✓ Vérifiez que toutes les variables d'environnement sont définies
✓ Vérifiez que MONGODB_URI est correcte
✓ Testez la connexion MongoDB Atlas depuis votre machine locale
```

### Erreur de connexion MongoDB
```
✓ Vérifiez que l'IP 0.0.0.0/0 est autorisée dans MongoDB Atlas
✓ Vérifiez le nom d'utilisateur et mot de passe
✓ Vérifiez le format de l'URL (pas d'espaces, caractères spéciaux encodés)
```

### Le service se met en veille
```
⚠️ Plan gratuit : le service s'endort après 15 min d'inactivité
⚠️ Premier accès peut prendre 30-60 secondes
💡 Solution : Passez à un plan payant ou utilisez un service de "keep-alive"
```

## Mise à jour

### Automatique (recommandé)
- Poussez vos changements sur `main`
- Render redéploie automatiquement

### Manuelle
- Dashboard → Votre service → "Manual Deploy" → "Deploy latest commit"

## Prochaines étapes

Une fois le backend déployé :
1. ✅ Notez l'URL du backend
2. ➡️ Configurez le frontend avec cette URL
3. ➡️ Déployez le frontend (voir DEPLOIEMENT-FRONTEND.md)
