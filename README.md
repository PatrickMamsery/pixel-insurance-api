# Pixel Insurance API (NodeJs + ExpressJS, MySQL & Sequelize)

APIs developed using NodeJS, ExpressJS, MySQL and Sequelize for serving Pixel Insurance Mobile Application.

---

**Prerequisites**

1. Install [node](https://nodejs.org/de/download/)
2. Install [yarn](https://classic.yarnpkg.com/en/docs/install/) or [npm](https://nodejs.org/en/download)
3. Install MySQL

**How to run**

1. Clone the project `git clone https://github.com/PatrickMamsery/pixel-insurance-api.git`
2. Run `cd pixel-insurance-api` to navigate to the codespace and open it in your favorite editor
3. Run `npm install` on terminal/CMD
4. Create a file named `.env` in the root directory & copy the texts from `.env.example` or rather run the command `cp .env.example .env` and fill in the required environment variables
5. Create a MySql DB
6. Then run migrations. The commands for migration & creating model are listed below in **DB Commands** section
7. Go back to root directory and run `npm start`
8. Now your backend will be running on [localhost:5000](http://localhost:5000)

**DB Commands**

1. For creating a model, run `npx sequelize-cli model:generate --name TableName --attributes columnName:dataType, ...`
2. For migration, run `sequelize-cli db:migrate`

All other **sequelize** commands are available here [Sequelize Documentation](https://sequelize.org/master/manual/model-basics.html)

