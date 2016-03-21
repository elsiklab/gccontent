# gccontent

A JBrowse plugin for plotting GC Content and GC Skew. The plugin consists of a storeClass that
automatically calculates the percentage of G/C bases in a region, a track
type that derives from the Wiggle XY or density types, and a dialog box to
adjust the sliding window size, window step size, and the calculation mode (content or skew)


Image showing GC content

![](img/gccontent.png)

Image showing GC skew

![](img/gcskew.png)

## Example configuration

    {
      "storeClass" : "JBrowse/Store/SeqFeature/IndexedFasta",
      "type": "GCContent/View/Track/GCContentXY",
      "label": "GC Content",
      "urlTemplate" : "Amel_4.5_scaffolds.fa",
      "bicolor_pivot": 0.5
    },
    {
      "storeClass" : "JBrowse/Store/SeqFeature/IndexedFasta",
      "type": "GCContent/View/Track/GCContentXY",
      "label": "GC Skew",
      "urlTemplate" : "Amel_4.5_scaffolds.fa",
      "gcMode": "skew",
      "min_score": -1,
      "bicolor_pivot": 0
    }

## Options

General options:

* storeClass: tested with JBrowse/Store/SeqFeature/IndexedFasta and JBrowse/Store/SeqFeature/SequenceChunks (i.e. output of prepare-refseqs.pl)
* windowSize: Size of sliding window (default 100)
* windowDelta: Step size of the sliding window (default 10)
* gcMode: The calculation mode, either skew or content (default content)
* type: GCContent/View/Track/GCContentXY (XYPlot) or GCContent/View/Track/GCContent (density)

Other default params

* bicolor_pivot: 0.5
* max_score: 1
* min_score: 0

See http://gmod.org/wiki/JBrowse_Configuration_Guide#Wiggle.2FBigWig_Tracks_.28XYPlot.2C_Density.29 for more options
