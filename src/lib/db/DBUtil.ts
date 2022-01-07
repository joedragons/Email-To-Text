import { Collection, Db, MongoClient } from 'mongodb'

export class DBUtil {
  collections: { games?: Collection } = {}

  async connectToDatabase() {
    // Uses an or operator (||) to ensure something is provided.
    const client: MongoClient = new MongoClient(
      process.env.DB_CONN_STRING || ''
    )

    await client.connect()

    const db: Db = client.db(process.env.DB_NAME)

    // Uses an or operator (||) to ensure something is provided.
    const gamesCollection: Collection = db.collection(
      process.env.GAMES_COLLECTION_NAME || ''
    )

    this.collections.games = gamesCollection

    console.log(
      `Successfully connected to database: ${db.databaseName} and collection: ${gamesCollection.collectionName}`
    )
  }
}
