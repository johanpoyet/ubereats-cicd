# Script pour initialiser la base de données MongoDB avec des données de test
# Ce script sera exécuté une fois que les conteneurs sont démarrés

# 1. Démarrer les conteneurs
docker-compose up -d

# 2. Attendre que MongoDB soit prêt
echo "Attente du démarrage de MongoDB..."
sleep 10

# 3. Exécuter le script de seed
echo "Initialisation de la base de données..."
docker-compose exec backend node seed.js

echo "Base de données initialisée avec succès !"
echo ""
echo "🎉 Application démarrée avec succès !"
echo ""
echo "📍 URLs disponibles :"
echo "   Frontend: http://localhost:8080"
echo "   Backend:  http://localhost:5000"
echo "   MongoDB:  localhost:27017"
echo ""
echo "👤 Identifiants de test :"
echo "   Admin: admin@ubereats.com / admin123"
echo "   User:  john@example.com / password123"
