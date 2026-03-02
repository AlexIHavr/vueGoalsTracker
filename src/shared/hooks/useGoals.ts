import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import { useCollection, useDocument } from 'vuefire';

import { db } from 'shared/api';
import { COLLECTIONS_NAMES } from 'shared/consts';

interface GoalSettings {
  title: string;
  description?: string;
}

export function useGoals() {
  const goalsCollection = collection(db, COLLECTIONS_NAMES.GOALS);

  const data = useCollection(goalsCollection);

  const createGoals = async (itemData: GoalSettings[]) => {
    return await addDoc(goalsCollection, {
      ...itemData,
      createdAt: new Date(),
    });
  };

  const updateGoal = async (id: string, itemData: GoalSettings[]) => {
    return await updateDoc(doc(db, COLLECTIONS_NAMES.GOALS, id), {
      ...itemData,
      updatedAt: new Date(),
    });
  };

  const removeGoal = async (id: string) => {
    return await deleteDoc(doc(db, COLLECTIONS_NAMES.GOALS, id));
  };

  const getGoal = (id: string) => {
    return useDocument(doc(db, COLLECTIONS_NAMES.GOALS, id));
  };

  return {
    data,
    createGoals,
    updateGoal,
    removeGoal,
    getGoal,
  };
}
