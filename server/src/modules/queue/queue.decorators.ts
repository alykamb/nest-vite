import { createDecorators } from 'nestjs-queuebus'

import { CommandBus, EventBus, FileBus, QueueBus } from './queue.provider'

export const {
    queues: [CommandHandler, QueueHandler, FileHandler],
    events: [Effect],
} = createDecorators({
    queues: [CommandBus, QueueBus, FileBus],
    events: [EventBus],
})
