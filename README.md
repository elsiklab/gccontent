# gccontent

A JBrowse plugin for plotting GCContent. Plugin consists of a storeClass that
automatically calculates the percentage of G/C bases in a region, a track
type that derives from the Wiggle XY or density types, and a dialog box to
adjust the sliding window size


![](img/out.png)


## Example configuration

Use a indexed FASTA source file

    {
      "storeClass" : "JBrowse/Store/SeqFeature/IndexedFasta",
      "type": "GCContent/View/Track/GCContentXY",
      "label": "GCContent",
      "urlTemplate" : "Amel_4.5_scaffolds.fa",
      "bicolor_pivot": 0.5
    }

or, use SequenceChunks from a prepare-refseqs.pl run

      {
          "storeClass" : "JBrowse/Store/SeqFeature/SequenceChunks",
          "type": "GCContent/View/Track/GCContentXY",
          "label": "GCContentWindow StaticChunked",
          "urlTemplate" : "seq/{refseq_dirpath}/{refseq}-",
          "bicolor_pivot": 0.5,
          "windowSize": 500,
          "windowDelta": 100
      }

The windowSize and windowDelta parameters can be used to customized the granularity
