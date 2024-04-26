import { Injectable } from '@nestjs/common';
import { CollectionReference, Timestamp } from 'firebase-admin/firestore';
import { FirebaseAdmin, InjectFirebaseAdmin } from 'nestjs-firebase';

@Injectable()
export class AppService {
  constructor(
    @InjectFirebaseAdmin() private readonly firebase: FirebaseAdmin,
  ) {}

  async createEntry(name: string): Promise<any> {
    const collRef = this.firebase.firestore.collection('entries');
    const docRef = collRef.doc();

    await docRef.create({
      created_at: Timestamp.now(),
      increment_id: null,
      name: name,
    });

    return {
      docPath: docRef.path,
      success: true,
    };
  }

  async fetchAll(): Promise<any> {
    const collRef = this.firebase.firestore.collection('entries');
    const snapshot = await collRef.orderBy('created_at').get();
    return snapshot.docs.map((doc) => doc.data());
  }
}
