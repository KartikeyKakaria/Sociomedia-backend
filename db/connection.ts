import { connect } from "mongoose";
import chalk from "chalk";
const db: string = process.env.DB || "mongodb://127.0.0.1/sociomedia";
connect(db)
    .then((): void => console.log(chalk.blue(`connected to db`)))
    .catch(err => console.log(err))