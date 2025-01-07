# Node.js and GraphQL Unibuc 2024

ce facem azi: 
- mai insistam pe graphql si ORM (facem un exemplu putin mai complicat, pentru proiect)
- care sa fie cerintele mai descriptive pt proiect.


- noi facem un API

- jwt auth + politica de autorizare 


- feature:

    - adaugare obiect, modificare, produs, stergere produs din cos
    - management catalog (adaugare produs, categorii, stoc disponibil)
    - statistica magazin (per categorie, per produs, vanzari lunare)
    - Reviewuri, comentarii + stelute (medie scor)

- putem sa tratam pozele ca string (pentru ca nu o sa le printam undeva in acest moment si sa nu ne complicam)

- sa returnam prin API obiectele direct (sa nu fie acolo un id = 5 ca sa faca el singur foreign key cu alta baza de date) (facem noi tot si returnam ce vrea)

## azi se facem many to many

Documentatie: https://sequelize.org/docs/v6/

https://sequelize.org/docs/v6/advanced-association-concepts/advanced-many-to-many/

- ce facem: o postare sa aiba mai multe taguri (#lol)

- prima data facem modelul de tag
    - scriem asta in terminal : "npx sequelize model:generate --name Tag --attributes name:string"
