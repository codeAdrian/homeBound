import 'firebase/firestore';
import { FirebaseService } from './firebaseService';

import { ListenerProps, QueryFilter, Ordering, Collections } from '../models';

export class FirestoreService<T extends any> {
  private firebase = FirebaseService.Instance;
  private firestore = this.firebase.firestore();
  private collection: firebase.firestore.CollectionReference;

  constructor(collection: Collections) {
    this.collection = this.firestore.collection(collection);
  }

  async filterAsync(
    queryParams?: QueryFilter[],
    listenerProps?: ListenerProps,
    ordering?: Ordering,
  ): Promise<string | T[] | any> {
    let queryRef: firebase.firestore.Query | undefined;

    if (queryParams) {
      for (const query of queryParams) {
        queryRef = queryRef
          ? queryRef.where(query.field, query.operator, query.value)
          : this.collection.where(query.field, query.operator, query.value);
      }
    }

    const data = queryRef || this.collection;

    /** If this should be a listener function */
    if (listenerProps) {
      /** If includes ordering */
      if (ordering) {
        return data
          .orderBy(ordering.orderBy, ordering.order)
          .startAfter(ordering.startAfter) // startAfter Date.now() works only for descending.
          .limit(ordering.limit)
          .onSnapshot(
            (snapshot) => {
              const items = snapshot.docs.map((document) => {
                const convertedDocument = document.data() as T;
                if (!convertedDocument.id) {
                  convertedDocument.id = document.id;
                }
                return convertedDocument;
              });

              listenerProps.successFunction(items);
            },
            (error: Error) => listenerProps.errorFunction(error.message),
          );
      }

      return data.onSnapshot(
        (snapshot) => {
          const items = snapshot.docs.map((document) => {
            const convertedDocument = document.data() as T;
            if (!convertedDocument.id) {
              convertedDocument.id = document.id;
            }
            return convertedDocument;
          });

          listenerProps.successFunction(items);
        },
        (error: Error) => listenerProps.errorFunction(error.message),
      );
    }

    return data
      .get()
      .then((snapshot) =>
        snapshot.docs.map((document) => ({
          id: document.id,
          ...(document.data() as any),
        })),
      )
      .catch((error: firebase.FirebaseError) => error.message);
  }

  /** Fetch all from a collection without a listener */
  async getAllAsync(): Promise<string | T[]> {
    return this.collection
      .get()
      .then((snapshot) =>
        snapshot.docs.map((document) => ({
          id: document.id,
          ...(document.data() as T),
        })),
      )
      .catch((error: firebase.FirebaseError) => error.message);
  }

  /** Add new documents or collection. */
  async addAsync(entity: T | T[]) {
    if (Array.isArray(entity)) {
      return entity.forEach((doc) => {
        if (doc.id) {
          this.collection.doc(doc.id).set(this.removeId(doc));
        } else {
          this.collection.add(doc);
        }
      });
    }

    if (entity.id) {
      return await this.collection.doc(entity.id).set(this.removeId(entity));
    }

    return await this.collection
      .add(this.removeId(entity))
      .then((val) => val.id);
  }

  removeAsync(entityId: string) {
    return this.collection
      .doc(entityId)
      .delete()
      .then()
      .catch((err) => console.error(err));
  }

  removeSubcollectionAsync(
    entityId: string,
    subcollection: string,
    document: string,
  ) {
    return this.collection
      .doc(entityId)
      .collection(subcollection)
      .doc(document)
      .delete();
  }

  async getByIdAsync(entityId: string, listenerProps?: ListenerProps) {
    // If this should be listener.
    if (listenerProps) {
      this.collection.doc(entityId).onSnapshot(
        { includeMetadataChanges: true },
        (snapshot) => {
          const result = { id: snapshot.id, ...(snapshot.data() as T) };
          listenerProps.successFunction(result);
        },
        (error: Error) => listenerProps.errorFunction(error.message),
      );
    }

    return this.collection
      .doc(entityId)
      .get()
      .then((snapshot) => ({ id: snapshot.id, ...(snapshot.data() as T) }))
      .catch((error: firebase.FirebaseError) => error.message);
  }

  // Update fields in existing doc.
  updateAsync(entity: T) {
    return this.collection.doc(entity.id).update(this.removeId(entity));
  }

  // Update fields in existing doc.
  updateByIdAsync(entity: Partial<T>, id: string) {
    return this.collection.doc(id).update(entity);
  }

  async getSubcollection(id: string, subcollection: string): Promise<any> {
    return this.collection
      .doc(id)
      .collection(subcollection)
      .get()
      .then((snapshot) =>
        snapshot.docs.map((document) => ({
          ...document.data(),
        })),
      );
  }

  private removeId(entity: T) {
    const tempEntity = { ...entity };
    delete tempEntity.id;

    return tempEntity;
  }
}
