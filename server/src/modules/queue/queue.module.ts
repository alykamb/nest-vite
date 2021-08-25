import { QueueModule as QueueModuleBase } from 'nestjs-queuebus'

import { CommandBus, EventBus, FileBus, QueueBus } from './queue.provider'
import { QueueConfigService } from './queueConfig.service'

export const queueModule = QueueModuleBase.register(
    QueueConfigService,
    [CommandBus, EventBus, FileBus, QueueBus],
    true,
)
