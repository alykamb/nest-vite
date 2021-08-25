import { Injectable } from '@nestjs/common'
import { EventBusBase, NameQueue, QueueBusBase, UseQueueBus } from 'nestjs-queuebus'

@Injectable()
@NameQueue('_queue') //'project-starter_queue'
export class QueueBus extends QueueBusBase {}

@Injectable()
@NameQueue('_cmd') //'project-starter_cmd'
export class CommandBus extends QueueBusBase {}

@Injectable()
@NameQueue('_file') //'project-starter_file'
export class FileBus extends QueueBusBase {}

@UseQueueBus(CommandBus)
@Injectable()
export class EventBus extends EventBusBase {}
