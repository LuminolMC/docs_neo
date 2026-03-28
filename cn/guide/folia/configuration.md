# 配置

本页将对 Folia 的一些特定配置项进行说明，并提供一些建议。

以下章节均为 Folia 新增的配置项。

## config/paper-global.yml

```yaml
threaded-regions:
  grid-exponent: 4
  scheduler: EDF
  threads: -1
```

本节中，`threads` 键决定为 tick region 工作线程分配多少线程，默认值为 -1（自动）。目前建议将其改为一个具体数值，而非使用自动线程数，因为自动模式往往会使用数量偏少的线程。

`grid-exponent` 键决定每个 tickregion 的大小，其形状为边长 `2 ^ grid-exponent` 的正方形。不建议修改此值：更小的值会使 tick 区域缩小，但会增加多线程区域化器中全局锁的压力；更大的值则会使 tick 区域增大，导致区域更难分裂、更易合并。

`scheduler` 键决定 tick region 使用哪种调度器，默认为 EDF，共有 2 种可用类型：

 - EDF：截止时间最小优先（deadline smaller first），仅在预定截止时间处触发 tick，不执行任何即时任务（如数据包处理及部分主线程任务），这些任务只在 tick 执行开始时才会被处理。
 - WORK_STEALING：基于 EDF 算法的实现，但相比 EDF，每个工作线程拥有独立的任务队列，支持即时任务执行和 NUMA 亲和性（防止 tick 区域迁移至其他 NUMA 节点，从而减少缓存未命中和性能损耗）。此外，如其名所示，它使用工作窃取（work stealing）机制来平衡各线程间的负载。

<b>注意：WORK_STEALING 调度器尚未经过完整测试！</b>

## config/paper-world-defaults.yml

```yaml
chunks:
  prevent-moving-into-unloaded-chunks: true
```

此配置可防止实体移动到没有区块持有者（chunk holder）的区域。由于 Folia 使用区块持有者来追踪 tick region 的各个分区，若实体移入这些没有区块持有者的区域，服务器将会崩溃，或抛出错误并将该实体移除。
