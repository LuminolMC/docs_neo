# 配置
我们总共有 2 个额外的配置文件：
  - luminol_config/luminol_global_config.toml（Luminol 的配置文件）
  - luminol_config/kaiiju_entity_limits.yml（Kaiiju 实体限制器的配置文件，见 [Kaiiju 实体限制](#kaiiju-实体限制)）

# Luminol 全局配置
此文件是 Luminol 的主要配置文件。

我们将配置分为几个类别，类似于一些 hack 客户端，以下是类别：
  - EXPERIMENT（需要进一步测试的新功能）
  - FIXES（bug 修复和原版特性恢复）
  - FUNCTION（附加功能和已移除的原版特性）
  - MISC（杂项设置）
  - OPTIMIZATIONS（优化）
  - UNSUPPORTED（不受支持的功能）

<b>注意：UNSUPPORTED 和 EXPERIMENT 类别中的任何配置都是不稳定的，可能会导致崩溃。</b>

配置文件应该采用 TOML 格式，以下是带有键注释的配置：
```toml
	[unsupported.disable_check_for_folia_supported]
		#禁用对 leaves 插件的 folia-supported 检查。
		#注意：如果您启用此选项，将不会提供支持。
		disable_for_leaves = false
		#禁用对 spigot/bukkit/paper 插件的 folia-supported 检查。
		#注意：如果您启用此选项，将不会提供支持。
		disable_for_paper = false

	[experiment.disable_entity_exception_catchers]
		#如果启用此配置，当实体 ticking 出现错误时，服务器将直接崩溃，而不是移除实体以保持服务器运行。
		#这可以防止实体消失，但可能会导致更多的服务器崩溃。
		#除非您知道自己在做什么，否则不要启用！！！
		enabled = false

	[experiment.disable_async_catchers]
		#禁用异步捕获器以防止一些由支持 folia 但逻辑有问题的插件引起的崩溃。
		#注意：当不正确调用 getChunkAt 时会导致区域死锁！
		#请参阅：https://github.com/PaperMC/Folia/issues/280，该问题已在 folia 中解决（https://github.com/PaperMC/Folia/commit/2e7bc0721af95196c85500c7bb136aeea0bc12ce）
		#除非您知道自己在做什么，否则不要启用！！！
		#
		enabled = false

	[experiment.command]
		enable_data_command = false
		#强制启用命令方块。
		#注意：由于一些线程问题，这会导致服务器崩溃！！！
		#除非您知道自己在做什么，否则不要启用！！！
		#
		enable_command_block = false
		#启用 waypoint 和 waypoint 命令。
		#警告：仍在测试中
		#
		enable_waypoints_and_waypoint_command = false

	[fixes.poi_range_fixes]
		#如果 POI 未加载，则不竞争 POI
		#与 https://github.com/PaperMC/Folia/issues/292 相关
		#
		do_not_compete_poi_if_unloaded = false

	[fixes.allow_unsafe_teleportation]
		#如果启用，允许非玩家实体进入末地传送门。
		#如果您想使用沙子复制，请打开此选项。
		#警告：这会导致一些不安全的问题，您可以在以下链接了解更多：https://github.com/PaperMC/Folia/issues/297
		enabled = false

	#此配置是对每个生物内存中不正确的所属数据的临时修复，更多信息请参见 https://github.com/PaperMC/Folia/issues/203
	[fixes.force_cleanup_drop_non_owned_entity_memory_module]
		#启用后，实体的大脑将清理不属于当前 tickregion 的实体类型的内存
		enabled_for_entity = false
		#启用后，实体的大脑将清理不属于当前 tickregion 的 position_tracker 类型的内存
		enabled_for_position_tracker = false
		#启用后，实体的大脑将清理不属于当前 tickregion 的 block_pos 类型的内存
		enabled_for_block_pos = false

	[fixes.collision_behavior]
		#决定使用哪种碰撞逻辑（Moonrise 和 Paper 修改了此逻辑以进行优化，但同时也会破坏一些原版行为）。
		#对于修复一些大型红石机器的非原版行为很有用
		#可用值：
		#VANILLA
		#BLOCK_SHAPE_VANILLA
		#PAPER
		mode = "BLOCK_SHAPE_VANILLA"

	[fixes.prevent_incorrect_teleport_async_calls_during_move_event]
		throw_when_caught = true
		#启用后，服务器将拒绝在移动事件期间进行一些不正确的 teleportAsync 调用。
		#这将减少由插件（Residence 等）引起的崩溃。
		#但您应该注意，这可能会破坏与某些插件的兼容性。
		enabled = false

	[fixes.pathfinding_fixes]
		#当实体接触到当前 tick 区域外的方块时，重新计算路径或停止寻路
		break_down_pathfinding_when_out_of_region = false
		#当寻路目标不在当前 tick 区域内时，跳过寻路目标
		do_not_pathfind_to_not_owned_targets = false

	[fixes.fix_high_velocity_issue]
		#folia 上一个问题的简单修复
		#（有时实体会有一个大的动量，穿过不同的 tick 区域，这会导致服务器崩溃）
		#但有时可能不起作用
		enabled = false
		warn_on_detected = false

	[fixes.use_vanilla_random_source]
		#与 RNG 破解相关
		enable_for_player_entity = false

	[fixes.item_multitask]
		#防止服务器在方块交互或物品栏槽位更改期间中断物品的状态。
		enabled = false

	[function.regionbar]
		format = "<gray>Util<yellow>:</yellow> <util> Chunks<yellow>:</yellow> <green><chunks></green> Players<yellow>:</yellow> <green><players></green> Entities<yellow>:</yellow> <green><entities></green>"
		enabled = false
		util_color_list = ["GREEN", "YELLOW", "RED", "PURPLE"]
		#可用显示：BOSS_BAR, ACTION_BAR, TAB_LIST
		display = "BOSS_BAR"
		update_interval_ticks = 15

	[function.portal_rate_limit]
		#如果固定限制不够使用，您可以定义自己的表达式来动态限制
		#传送门速率。
		#
		#可用变量（均为当前 tickregion 的）：e (ticking_entity_count)
		#                     c (ticking_chunk_count)
		#                     p (player_count)
		#示例：50 * (1 + sqrt(x/1000) + c/200 + p/5)
		#
		maximum_portal_teleports_per_tick_expression = "50 * (1 + sqrt(e/1000) + c/200 + p/5)"
		#是否在实体进入传送门时限制传送门速率
		enable = false
		#决定在单个 tick 区域内的一个 tick 中应该处理多少传送门传送，当超过时，
		#传送门传送将被推到下一个 tick
		#
		#注意：设置为 -1 以使用自定义表达式
		maximum_portal_teleports_per_tick = 200

	[function.tripwire_dupe]
		enabled = false
		#可用值：
		#VANILLA20
		#VANILLA21
		#MIXED
		behavior_mode = "VANILLA21"

	[function.membar]
		format = "<gray>Memory usage <yellow>:</yellow> <used>MB<yellow>/</yellow><available>MB"
		memory_color_list = ["GREEN", "YELLOW", "RED", "PURPLE"]
		enabled = false
		#可用显示：BOSS_BAR, ACTION_BAR, TAB_LIST
		display = "BOSS_BAR"
		update_interval_ticks = 15

	[function.region_format]
		#决定区域文件的压缩级别（仅适用于 LINEAR_V2 和 B_LINEAR）
		linear_compression_level = 1
		#决定当标记为保存 n（默认值为 100）毫秒时，它将何时刷新到区域文件（仅适用于 LINEAR_V2）
		linear_io_flush_delay_ms = 100
		#决定当没有写入操作 n（默认值为 3000）毫秒时，它将何时刷新到区域文件（仅适用于 B_LINEAR）
		blinear_io_flush_delay_ms = 3000
		#决定 linear 的工作线程数（仅适用于 LINEAR_V2）
		linear_io_thread_count = 6
		#决定缓冲 linear 的工作线程数（仅适用于 B_LINEAR）
		blinear_io_thread_count = 6
		#可用选择：MCA, B_LINEAR, LINEAR_V2
		format = "MCA"
		#决定是否可以为 linear 格式使用虚拟线程（仅适用于 LINEAR_V2）
		linear_use_virtual_thread = true

	[function.tpsbar]
		ping_color_list = ["GREEN", "YELLOW", "RED", "PURPLE"]
		#示例（如果 mspt 为 20.00000000）（值 -> 结果）：2 -> 20.00, 1 -> 20.0
		precision_of_mspt_value = 2
		#示例（如果 tps 为 20.00000000）（值 -> 结果）：2 -> 20.00, 1 -> 20.0
		precision_of_tps_value = 2
		chunkhot_color_list = ["GREEN", "YELLOW", "RED", "PURPLE"]
		#可用显示：BOSS_BAR, ACTION_BAR, TAB_LIST
		display = "BOSS_BAR"
		format = "<gray>TPS<yellow>:</yellow> <tps> MSPT<yellow>:</yellow> <mspt> Ping<yellow>:</yellow> <ping>ms ChunkHot<yellow>:</yellow> <chunkhot>"
		tps_color_list = ["GREEN", "YELLOW", "RED", "PURPLE"]
		enabled = false
		update_interval_ticks = 15

	[function.secure_seed]
		#版本 1：Blake2b（不安全，使用 GPU/ASIC 集群在几分钟内可逆向，具有足够的熵）
		#版本 2：带有盐密钥派生的 Blake3（推荐，不可逆向）
		#***** 警告：切换已有secure seed存档的secure seed版本会导致区块错误！*****
		version = 1
		#         一旦您启用安全种子，所有矿石和结构都将使用 1024 位种子生成
		#         而不是使用原版中的 64 位种子，使传统的种子破解变得不可能。
		#注意：如果您使用 V1，它将容易受到地形高程攻击。
		#         ***** 警告：如果您的旧世界也使用安全种子，则需要保持启用它！否则会破坏您的存档 *****
		enabled = false
		#V2 加密操作的自动生成的 256 位盐。
		#在首次启动时生成一次 - 不要共享或修改此值（修改此值会导致区块错误）！
		#与 Blake3 键控哈希一起使用，使种子不可逆向。
		salt = "xESwPP3SUzHglZoAJLLrdLeRzXhJFgPvpwNCxiiJVHI="

	[optimizations.cpu_affinity]
		#使用此选项，您可以将 tick region 调度器的线程固定到以下 config 'tickregion_affinity' 中列出的 CPU 核心，
		#这对于具有 P 和 E 核心的 CPU（如 12/13/14 代 Intel Core CPU 等）很有用。
		enabled = false
		#您希望 tick region 线程绑定的核心编号
		tickregion_affinity = ["0", "1", "2", "3"]

	#在实体非活动 tick 中限制 AI 目标选择器。
	#这可以提高几个百分点的性能，但会对游戏玩法产生轻微影响。
	[optimizations.throttle_goal_selector_tick_in_inactive_tick]
		enabled = false

	[optimizations.use_simd]
		enabled = true

	#如果村民无法移动，则对其进行 lobotomize（不会禁用交易）
	[optimizations.lobotomize_villager]
		#检查村民是否被 lobotomize 的时间间隔（以 tick 为单位）
		check_interval = 100
		#等待直到村民被交易后再进行 lobotomize
		wait_until_trade_locked = false
		enabled = false

	[optimizations.use_async_protocol_switching]
		#为 mc 使用异步协议准备。
		#警告：由于此优化更改了数据包发包顺序，它可能与
		#一些插件（ViaVersion 等）不兼容
		enabled = false

	[optimizations.lithium_sleeping_block_entity]
		#使用来自 lithium 的睡眠实体方块优化，
		#在 luminol 上，paper 的漏斗优化已完全移除，替换为 lithium 的优化
		#并且默认开启
		enabled = true

	[optimizations.end_dragon]
		optimized_dragon_respawn = false

	[optimizations.variable_entity_waking_up]
		#如果此值设置为任何大于 0 的值，唤醒非活动实体的过程将随时间分散，而不是一次唤醒许多实体。这使实体感觉和行为更自然。
		#此设置是变异系数，或 σ / μ（标准差与平均值的比率）的非活动持续时间。
		#
		#换句话说，此设置是值 σ，因此常规非活动持续时间将乘以因子 normal_distribution(μ = 1, σ)。
		#如果给定的值 ≤ 0，则禁用可变实体唤醒。
		entity_wakeup_duration_ratio_standard_deviation = 0.2

	[optimizations.projectile]
		#控制投射物在被自动移除之前可以加载的区块数量。
		max-loads-per-projectile = 0
		#控制一个 tick 中投射物允许同步加载的区块数量。
		max-loads-per-tick = 0

	#当启用时，它会减少视线缓存的删除频率，并使用更快的附近比较。
	[optimizations.reduce_sensor_work]
		#每个实体丢弃缓存的间隔（以 tick 为单位）
		delay_ticks = 10
		enabled = true

	[misc.disable_warning]
		#禁用高度图检查的警告
		disable_heightmap_warning = false
		#禁用服务器启动时在日志中弹出的离线警告
		disable_offline_mode_warning = false

	[misc.server_mod_name]
		#决定在 F3 调试屏幕中显示的服务器模组名称。
		name = "Luminol"
		#忽略任何插件的修改和在此配置块中设置的服务器模组名称，仅强制发送原版品牌名称
		vanilla_spoof = false

	[misc.disable_moved_wrongly_threshold]
		#禁用错误移动警告和检查
		enabled = false

	#定期检查 GitHub Releases 以获取更新的 Luminol jar。
	#下载的文件会暂存到 auto_update/luminol 下，并写入 auto_update/core.path，
	#Hyacinthusclip 可以在下次重启时使用。
	#如果设置了 target_jar_path，Luminol 也会尝试直接替换该启动器 jar。
	[misc.auto_update]
		#成功下载后要替换的可选启动器 jar 路径。
		#留空以将下载的 jar 暂存到 auto_update/luminol 中
		#并让 Hyacinthusclip 在重启时通过 auto_update/core.path 切换到它。
		target_jar_path = ""
		#选择更新时是否允许预发布的 GitHub 版本。
		allow_prerelease = false
		#基于服务器本地时区的每日检查时间列表，格式为 HH:mm。
		check_times = ["06:00"]
		#Luminol 是否应该自动检查更新。
		enabled = false

	[misc.username_checks]
		#决定是否启用用户名检查，
		#如果您的玩家使用中文用户名，您可以禁用它，但同时, 禁用它可能导致的任何安全影响
		enabled = true

	[misc.folia_watchdog]
		#决定 watchdog 打印卡住的 tickregions 线程转储的间隔
		tick_region_time_out_ms = 5000

	[misc.save_portal_tickets]
		#是否在服务器停止时保存传送门 ticket，这将使其行为类似于 1.21.5 之前的 mc，并且在服务器再次启动时不会自动激活传送门区块加载器。
		do_save = true

	[misc.mojang_out_of_order_chat_check]
		enabled = true

	#强制完全禁用 Paper 的所有数据包限制器，这用于防止使用一些快速合成模组时被踢出，但
	#对安全性有负面影响
	[misc.force_disable_packet_limiter_of_paper]
		force_disable = false

	#仅在在线模式下验证公钥，这在使用 MultiLogin 等配置了自定义认证服务器的插件时很有用
	[misc.verify_publickey_only_in_online_mode]
		enabled = false

	[misc.sentry]
		#级别高于或等于此级别的日志将被记录。
		log_level = "WARN"
		#启用后，只有带有 Throwable 的日志才会被记录。
		only_log_thrown = true
		#用于改进错误日志记录的 Sentry DSN，留空以禁用，
		#从 https://sentry.io/ 获取
		dsn = ""
```

# Kaiiju 实体限制
此文件是 Kaiiju 实体限制器的配置文件。

配置文件应该采用 YAML 格式，以下是带有键注释的配置：

```yaml
# Kaiiju 的每个区域实体限制。
# 如果一个区域中特定实体类型的数量超过限制，实体 tick 将被限制。
# 示例：对于凋零限制 100 和一个区域中有 300 个凋零 -> 100 个凋零每个 tick 都会 tick，每个凋零每 3 个 tick 会 tick 一次。
# 每个实体名称都在 mojmap 的命名空间下，您可以通过服务器 jar 中的实体包浏览它们

# 是否启用实体限制器。
# 可以通过 reload 命令重新加载
enabled: false
Axolotl:
  # 一个tick区域中美西螈数量的 tick 限制，如果数量超过此限制，超出部分的实体 tick 将推迟到下一个 tick
  limit: 1000
  # 一个tick区域中美西螈数量的限制，如果数量超过此限制，超出部分的实体将被移除
  removal: 2000
```