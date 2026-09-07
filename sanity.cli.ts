import { defineCliConfig } from 'sanity/cli'

import { dataset, studioProjectId } from './sanity/env'

/**
 * Konfiguration für die Sanity-Kommandozeile (`npx sanity …`).
 * Die Werte kommen aus .env.local — vor `sanity init` sind sie leer, das ist
 * beabsichtigt: `sanity init --env .env.local` schreibt sie erst hinein.
 */
export default defineCliConfig({
  api: {
    projectId: studioProjectId,
    dataset,
  },
  // Das Studio wird von Next ausgeliefert, nicht separat gebaut.
  autoUpdates: false,
})
