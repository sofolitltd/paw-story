import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
  token: 'skeZIsQTwpHFl8kCFCw1IMdPtm2bTCOZuXUqoqUsshIyzUhGy0ABKoiYGoOzs2Or66IMW2b0gh419xqXahVfyl9HwCDb3delXl8xlBAoDNXgsst4ZxBqeQ9oIafXOzvLYOVxTltc30hOL6qheZHlGhns6Q1D2Ipl6qT3NqimRjO27VADihwG'
})
