## Créer un sondage : `POST /api/polls`

```json
{
  "title": "Mon sondage",
  "description": null,
  "choices": [
    { "date": "2024-01-01T12:00:00" },
    { "date": "2024-01-01T14:00:00" },
    { "date": "2024-01-02T12:00:00" },
    { "date": "2024-01-02T14:00:00" }
  ],
  "hideVotes": false,
  "endDate": null,
  "notifyOnResponse": false,
  "adminName": "Adrien",
  "adminEmail": "adrien@slash-tmp.dev"
}
```

## Récuperer un sondage (public) : `GET /api/polls/<public-uid>`

## Voter : `POST /api/polls/<public-id>/responses`

```json
{
  "respondentName": "Quentin",
  "responses": [
    { "choiceId": 12, "value": "YES" },
    { "choiceId": 13, "value": "NO" },
    { "choiceId": 14, "value": "MAYBE" },
    { "choiceId": 15, "value": "YES" }
  ]
}
```

## Récuperer un sondage (admin) : `GET /api/polls/admin/<admin-uid>`

## Supprimer un sondage : `DELETE /api/polls/admin/<admin-uid>`

## Modifier un sondage : `PUT /api/polls/admin/<admin-uid>`

```json
{
  "title": "Mon sondage",
  "description": null,
  "choices": [
    // Keep those two
    { "choiceId": 12, "date": "2024-01-01T12:00:00" },
    { "choiceId": 14, "date": "2024-01-02T12:00:00" },
    // Create new dates
    { "date": "2024-01-03T12:00:00" },
    { "date": "2024-01-03T14:00:00" }
  ],
  "hideVotes": false,
  "endDate": null,
  "notifyOnResponse": false,
  "adminName": "Adrien"
}
```

## Rechercher ses sondages : `POST /api/polls/find`

```json
{
  "adminEmail": "adrien@slash-tmp.dev"
}
```
