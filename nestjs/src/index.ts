import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as express from 'express';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const db = admin.firestore();
const server = express();

export const createNestServer = async (expressInstance) => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );

  return app.init();
};

createNestServer(server)
  .then((v) => console.log('Nest Ready'))
  .catch((err) => console.error('Nest broken', err));

export const api = functions.https.onRequest(server);

export const onCreateTrigger = functions.firestore
  .document('entries/{docId}')
  .onCreate(async (change, context) => {
    await db.runTransaction(async (trans) => {
      const collRef = db.collection('entries');
      const docRef = collRef.doc(context.params.docId);

      const snapshot = await trans.get(
        collRef
          .where('increment_id', '!=', null)
          .orderBy('increment_id', 'desc')
          .limit(1),
      );

      const incrementId =
        snapshot.size > 0 ? snapshot.docs[0].data()['increment_id'] + 1 : 1;

      const docSnap = await trans.get(docRef);

      await trans.update(docRef, {
        ...docSnap.data(),
        increment_id: incrementId,
      });
    });
  });
