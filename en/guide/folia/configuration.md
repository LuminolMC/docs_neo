# Configuration

In this page, I will make some explanation of the speific config of folia and give some suggestions here

The sections following are the configuation added by Folia

## config/paper-global.yml

```yaml
threaded-regions:
  grid-exponent: 4
  scheduler: EDF
  threads: -1
```

In this section, the key "threads" decides how much threads will be allocated for the tick region worker, it's -1(auto) by default, currently, I recommend change it to a exact value instead of auto thread count setting as it tends to use threads in a very small count

Also the key "grid-exponent" decides the size of each tickregion, it's a square in side length "2 ^ grid-exponent", I recommend not to change this value as through smaller value will make tick region smaller, it would increase the load of the global lock in threaded regionizer, also a higher value would make the tick region bigger and then it's harder to get split and easier to get merged

The key "scheduler" decides which scheduler the tick region will use, by default it's EDF, and it has 2 types available:

 - EDF : deadline smaller first, it only invoke the ticks at scheduled deadline but won't execute any immediate tasks such as packet processing and some main thread tasks and only process them at the start of the tick execution
 - WORK_STEALING : A implementation based on EDF algorithm, but compared to EDF, it has independent task queue in each worker thread and it supports immediate task execution and NUMA affinity (Prevent a tick region was running onto another NUMA node to reduce cache miss and performance issues). Additionally, as its name said, it uses work stealing to balance the load between each thread.

<b>Note: the "WORK_STEALING" scheduler is not tested fully yet!</b>

## config/paper-world-defaults.yml

```yaml
chunks:
  prevent-moving-into-unloaded-chunks: true
```

This config prevents entities moving into a area which doesn't have their chunk holder, since folia uses chunk holder to track tick region sections, if the entity moves into those areas which have no chunk holder, the serer will crash or an error will be thrown then the entity gets removed