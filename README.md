# gccontent

A JBrowse plugin for plotting GC Content and GC Skew. The plugin consists of a storeClass that
automatically calculates the percentage of G/C bases in a region, a track
type that derives from the Wiggle XY or density types, and a dialog box to
adjust the sliding window size, window step size, and the calculation mode (content or skew)



![](img/gccontent.png)

Fig 1. GC content


![](img/gcskew.png)

Fig 2. GC skew (note change in orientation of gene predictions)

## Example configuration

Using default SequenceChunks store

    {
      "storeClass" : "JBrowse/Store/SeqFeature/SequenceChunks",
      "type": "GCContent/View/Track/GCContentXY",
      "label": "GCContentXY",
      "urlTemplate" : "seq/{refseq_dirpath}/{refseq}-",
      "bicolor_pivot": 0.5
    }


Using GC skew (and indexed FASTA)

    {
      "storeClass" : "JBrowse/Store/SeqFeature/IndexedFasta",
      "type": "GCContent/View/Track/GCContentXY",
      "label": "GC Skew",
      "urlTemplate" : "Amel_4.5_scaffolds.fa",
      "gcMode": "skew",
      "min_score": -1,
      "bicolor_pivot": 0
    }


Note: if you use SequenceChunks for the store class, then make the regular sequence track have "label": "refseqs"

    {
       "key" : "Reference sequence",
       "storeClass" : "JBrowse/Store/Sequence/StaticChunked",
       "chunkSize" : 20000,
       "urlTemplate" : "seq/{refseq_dirpath}/{refseq}-",
       "label" : "refseqs",
       "type" : "SequenceTrack"
    }

Otherwise it tries to use GCContent as the store in the popup box

## Options

General options:

* storeClass: tested with JBrowse/Store/SeqFeature/IndexedFasta and JBrowse/Store/SeqFeature/SequenceChunks (i.e. output of prepare-refseqs.pl)
* windowSize: Size of sliding window (default 100)
* windowDelta: Step size of the sliding window (default 10)
* gcMode: The calculation mode, either "skew" for calculation gc skew or "content" for gc content (default: content)
* type: GCContent/View/Track/GCContentXY (XYPlot) or GCContent/View/Track/GCContent (density)
* maxZoom: The maximum level for which to calculate the GC content for. Measured in pixels per basepair. Default: 0.0001. Make smaller fraction to allow zooming out more

Other default params

* bicolor_pivot: 0.5
* max_score: 1
* min_score: 0

See http://gmod.org/wiki/JBrowse_Configuration_Guide#Wiggle.2FBigWig_Tracks_.28XYPlot.2C_Density.29 for more options


## Intallation

In the jbrowse plugin folder


    git clone https://github.com/cmdcolin/GCContent

This will create the GCContent folder. It should be upper cased like this. Then add the plugin to your config file
