import { IQueueConfigService, Transport } from 'nestjs-queuebus'
import { v4 } from 'uuid'

import { CommandBus, EventBus, FileBus, QueueBus } from './queue.provider'

export class QueueConfigService implements IQueueConfigService {
    public name = 'project-starter'
    public id = process.env.POD_NAME || v4()

    public host = process.env.RABBITMQ_HOST || 'rabbitmq'
    public port = 5672
    public username = process.env.RABBITMQ_USERNAME
    public password = process.env.RABBITMQ_PASSWORD

    public messageBrooker = Transport.rabbitMQ

    public getQueues(): ReturnType<IQueueConfigService['getQueues']> {
        return { queues: [CommandBus, QueueBus, FileBus], events: [EventBus] }
    }
}
