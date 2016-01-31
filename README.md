# gccontent

A JBrowse plugin for plotting GCContent. Consists of a storeClass that
automatically calculates the percentage of G/C bases in a region, and a track
type that automatically initializes the store (i.e. you actually just supply a
staticchunked or fasta/indexedfasta store in the track config)


![](img/out.png)


## Example configuration

    {
      "storeClass" : "JBrowse/Store/SeqFeature/IndexedFasta",
      "type": "GCContent/View/Track/GCContentXY",
      "label": "GCContent",
      "urlTemplate" : "Amel_4.5_scaffolds.fa",
      "bicolor_pivot": 0.5,
      "windowSize": 100
    }
