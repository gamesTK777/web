import { readFileSync } from 'node:fs'
import { DatabaseSync } from 'node:sqlite'

const schema = readFileSync(new URL('./schema.sql', import.meta.url), 'utf8')

// The loopback preview executes the same statements and atomic batches as D1.
// The interface is limited to the statements used by room-service.mjs.
export function createLocalRoomDb() {
  const sql = new DatabaseSync(':memory:')
  sql.exec(schema)
  const db = {
    prepare(query) {
      const statement = sql.prepare(query)
      // Node 22.12–22.15 do not provide column metadata. In this service,
      // SELECT is the only row-producing statement.
      const reads = typeof statement.columns === 'function'
        ? statement.columns().length > 0
        : /^\s*SELECT\b/i.test(query)
      return { bind(...values) {
        const task = () => reads
          ? { results: statement.all(...values), meta: { changes: 0 } }
          : { results: [], meta: { changes: statement.run(...values).changes } }
        return { task, run: async () => task(), first: async () => statement.get(...values) ?? null }
      } }
    },
    async batch(statements) {
      sql.exec('BEGIN')
      try {
        const results = statements.map(statement => statement.task())
        sql.exec('COMMIT')
        return results
      } catch (error) {
        sql.exec('ROLLBACK')
        throw error
      }
    },
  }
  return { db, sql, close: () => sql.close() }
}
