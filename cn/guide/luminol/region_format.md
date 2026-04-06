# Region格式
如你在 Luminol 配置中所见，存在一个关于存档 Region 格式的选项，你可以将其修改为非原版 Region 格式以适应某些场景的需求。

以下是 Luminol 中可用的 3 种 Region 格式：
 - MCA（Minecraft 原版 Region 格式）
 - LINEAR_V2（由 xymb-endcrystalme 设计的新格式，旨在减少 Region 文件体积并降低旧 MCA 格式产生的碎片）
 - B_LINEAR（又名为buffered linear格式，设计目标为更低的内存占用、更优的调度性能，同时具备与 Linear V2 相同的功能）

 # 转换存档

有一个工具可以帮助你将存档在 MCA 与 Linear 格式之间相互转换，你可以在 https://github.com/xymb-endcrystalme/LinearRegionFileFormatTools 找到它。

<b>注意：目前尚无方法将 Linear V2 格式（以及Buffered Linear 格式）的存档转换回 MCA 格式，请在使用这些格式前做好考虑!!</b>

# Linear V2
考虑到 Linear V1 存在一些可能导致数据丢失的问题，我们从 [Abomination](https://github.com/xymb-endcrystalme/Abomination/blob/dev/patches/server/0012-Linear-Region-File-Format-v2-implementation-version-.patch) 移植并实现了 Linear V2 格式。

新版 Linear 使用分桶（bucket）机制来降低 Region 文件的压缩耗时，但解压后的桶数据仍会驻留在内存中，因此在某些环境下可能会占用大量内存。

Linear 在 Luminol 配置中有 3 个专属配置项：`linear_compression_level`、`linear_io_flush_delay_ms` 和 `linear_use_virtual_thread`。其中 `linear_compression_level` 决定每个桶的压缩级别（使用 zstd 压缩），`linear_io_flush_delay_ms` 决定内存中的数据何时同步到本地文件（即写入操作发生后 n 毫秒）。此外，`linear_use_virtual_thread` 决定是否为 Linear Region 格式的刷写线程使用虚拟线程——由于 Linear 会为每个打开的 Region 文件创建一个线程，建议开启此选项。

# Buffered Linear

鉴于 Linear 会将解压后的数据保留在内存中，我们设计了 Buffered Linear 新格式，将解压后的数据存入独立的交换文件中，以降低内存占用。

Buffered Linear 有 3 个专属配置项：`blinear_io_thread_count`、`blinear_io_flush_delay_ms` 和 `linear_compression_level`。与 Linear 不同，Buffered Linear 使用线程池（池大小由 `blinear_io_thread_count` 决定）而非为每个打开的 Region 文件单独创建线程，并采用写入超时机制（仅在连续 n 毫秒内无任何写入操作后才执行同步，n 由 `blinear_io_flush_delay_ms` 指定），因此开销略低于 Linear。

此外，Buffered Linear 支持直接加载 Linear V1 及 V2 格式，你只需将文件后缀从 `.linear` 重命名为 `.b_linear` 即可完成迁移。
