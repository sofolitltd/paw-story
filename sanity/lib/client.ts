import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
  token: 'skodeZ939hZztIgOj7qBOXq2a84VJSGg92qW8xnckJiKF7pUcubMZcUvrnEyvQFUUf3w9FF04O28gu5S2mm5h46SVy0lBfhZkYqwsWIYTwMuJlVTXZ41zxXiPtz9CyoSYNPCdRF1trxTct8unPaRiCN6BoHsStOxfrIRNIJmvL4FxOOYLNIi'
})
