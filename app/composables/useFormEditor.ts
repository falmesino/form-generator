// composables/useFormEditor.ts
import type { JsonEntry } from './useDatabase'

export const useSelectedEntry = () => useState<JsonEntry | null>('selectedEntry', () => null)
