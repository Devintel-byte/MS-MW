import { createClient } from 'redis';

export const client = createClient({
    username: 'default',
    password: '03M2PEhoyRl7gsLf34HLzK0qrQyCwxDl',
    socket: {
        host: 'redis-19533.c73.us-east-1-2.ec2.redns.redis-cloud.com',
        port: 19533
    }
});

client.on('error', err => console.log('Redis Client Error', err));

await client.connect();


