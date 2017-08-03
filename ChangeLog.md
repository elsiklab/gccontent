# Version 0.3.0

- Add sequence blur when zoomed too far out on density track (xy track already had this)

# Version 0.2.0

- Fix off-by-one error on windowsize/windowdelta 1. Thanks to @childers for the report
- Fix gccontent calculcations over gaps. Thanks to @childers for the report

# Version 0.1.0

- Create a configurable limit for not calculating the GC over too large an area. Thanks to @colindaven for the suggestion (and apologies for crashing Firefox!)
- Allow calculating GC skew. Thanks to @erasche for the implementation!
- Allow calculating GC content
- Can use SequenceChunks or IndexedFasta backend
