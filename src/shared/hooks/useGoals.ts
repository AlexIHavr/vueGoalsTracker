import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  query,
  where,
} from 'firebase/firestore';
import { useCollection, useCurrentUser, useDocument } from 'vuefire';

import { db } from 'shared/api';
import { COLLECTIONS_NAMES } from 'shared/consts';

import type { GoalDocument, GoalSettings } from 'shared/interfaces';

const USER_ID = 'userId';

export function useGoals() {
  const user = useCurrentUser();

  const goalsCollection = collection(db, COLLECTIONS_NAMES.GOALS);

  const data = useCollection<GoalDocument>(
    query(goalsCollection, where(USER_ID, '==', user.value?.uid))
  );

  const createGoal = async (goalSettings: GoalSettings) => {
    if (!user.value) return;

    const goalDoc: Omit<GoalDocument, 'id'> = {
      ...goalSettings,
      userId: user.value.uid,
      createdAt: new Date(),
    };

    return await addDoc(goalsCollection, goalDoc);
  };

  const updateGoal = async (
    id: string,
    goalSettings: Partial<GoalSettings>
  ) => {
    const goalDoc: Partial<GoalDocument> = {
      ...goalSettings,
      updatedAt: new Date(),
    };

    return await updateDoc(doc(db, COLLECTIONS_NAMES.GOALS, id), goalDoc);
  };

  const removeGoal = async (id: string) => {
    return await deleteDoc(doc(db, COLLECTIONS_NAMES.GOALS, id));
  };

  const getGoal = (id: string) => {
    return useDocument(doc(db, COLLECTIONS_NAMES.GOALS, id));
  };

  return {
    data,
    createGoal,
    updateGoal,
    removeGoal,
    getGoal,
  };
}
