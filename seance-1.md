| Besoin | Techno | Sens des échanges | Fréquence | Latence tolérée | Perte tolérée | Données (texte, binaire) |
|:---|:---:|:---:|:---:|:---:|:---:|:---:|
| 1. Messages et accusés | Websocket | Bidirectionnel | Moyenne à élevé | Faible | Aucune | Texte |
| 2. Présence et saisie | Websocket | Bidirectionnel | Faible | Modérée | Modérée | Text |
| 3. Note partagée | Websocket | Bidirectionnel | Elevée | Quasi nulle | Quasi nulle | Texte |
| 5. Reprise après coupure | Websocket | Unidirectionnel | Faible | Faible | Faible | Texte |

### Questions:
Elles n'ont pas la même fréquence et perte tolérée, la fréquence de la présence est plus grande mais sa tolérence à la perte l'est tout autant.

Pour le besoin 3 chaque client émet au serveur qui lui même émet à tous ses clients connectés. L'utilisateur A verra d'abord la première modification puis celle de B.

La dernière date de connexion/ping réussi pour récupérer les bonnes données non lues.

Pour les différents besoins nous utiliserons une seule technologie, websocket, en effet cette techno permets de garder un core unique à entretenir tout en pouvant garantir chaque besoin. Le choix repose d'abord sur une préférence en corrélation étroite avec une bonne solution qui répond pour des fréquences et tolérences différente.

## Etape 3:
Le client envoie d'abord une requête de tentative de connexion, s'il peut se connecter alors le serveur enregistre et identifie le client avec un identifiant unique qu'il lui renvoie et qu'il va utiliser pour les différentes requêtes.

Il faut alors que les deux serveurs puissent communiquer ensemble afin de rassembler les bon échangeurs/client ensemble, il faut en tout cas qu'ils aient accès au mêmes ressources.

En ouvrant 3 comptes en simultanné et en envoyant un message sur l'un des comptes.