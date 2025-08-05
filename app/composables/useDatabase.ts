// composables/useDatabase.ts
import type { Table } from 'dexie';
import Dexie from 'dexie'

export interface JsonEntry {
  id: string
  name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  json: Record<string, any>
}

class JsonDatabase extends Dexie {
  entries!: Table<JsonEntry>

  constructor() {
    super('JsonDatabase')
    this.version(1).stores({
      entries: 'id,name' // id is primary key
    })
  }
}

const db = new JsonDatabase()

export function useDatabase() {
  return db
}
