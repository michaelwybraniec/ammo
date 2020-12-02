import express from 'express';
import { ioServer, isRecording } from 'webSocket/index';
import bulletSchema from 'validators/bulletValidator';
import { Bullet } from 'shared/types/Bullet';
import { nanoid } from 'nanoid';
import { ConnectorRequest } from 'types/ConnectorRequest';

const bulletRouter = express.Router();

bulletRouter.post(
    '/',
    (req, res): express.Response => {
        try {
            const connectorRequest: ConnectorRequest = { ...req.body.data };

            if (isRecording) {
                const { error, value } = bulletSchema.validate(
                    connectorRequest
                );
                if (error) throw new Error(error.details[0].message);

                const bullet: Bullet = {
                    ...value,
                    date: new Date(),
                    id: nanoid(),
                };

                ioServer.emit('bullet', { bullet });

                return res.status(200).json({ bullet });
            }
            return res.status(200).json({
                message:
                    'The recorder has been paused, we will not process your request any further',
            });
        } catch ({ message }) {
            return res.status(400).json({ message });
        }
    }
);

export default bulletRouter;