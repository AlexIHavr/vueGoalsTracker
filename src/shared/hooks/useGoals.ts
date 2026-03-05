import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  query,
  where,
  Timestamp,
} from 'firebase/firestore';
import { computed, type ComputedRef } from 'vue';
import { useCollection, useCurrentUser, useDocument } from 'vuefire';

import { db } from 'shared/api';
import { COLLECTIONS_NAMES } from 'shared/consts';
import { getCurrentGoalStatus } from 'shared/utils';

import type {
  GoalData,
  GoalDocument,
  GoalSettings,
  GoalSettingsParams,
} from 'shared/interfaces';

const USER_ID = 'userId';

export function useGoals() {
  const user = useCurrentUser();

  const goalsCollection = collection(db, COLLECTIONS_NAMES.GOALS);

  const data = useCollection<GoalDocument>(
    query(goalsCollection, where(USER_ID, '==', user.value?.uid))
  );

  const goalsData: ComputedRef<GoalData[]> = computed(() =>
    data.value.map((goal) => ({
      ...goal,
      id: goal.id,
      status: getCurrentGoalStatus(goal),
    }))
  );

  const createGoal = async (goalSettings: GoalSettingsParams) => {
    if (!user.value) return;

    const goalDoc: Omit<GoalDocument, 'id'> = {
      ...goalSettings,
      startDate: Timestamp.fromDate(goalSettings.startDate),
      endDate: Timestamp.fromDate(goalSettings.endDate),
      userId: user.value.uid,
      createdAt: Timestamp.now(),
    };

    return await addDoc(goalsCollection, goalDoc);
  };

  const updateGoal = async (
    id: string,
    goalSettings: Partial<GoalSettingsParams>
  ) => {
    const goalDoc: Partial<GoalDocument> = {
      ...(goalSettings as Partial<GoalSettings>),
      updatedAt: Timestamp.now(),
    };

    if (goalSettings.startDate) {
      goalDoc.startDate = Timestamp.fromDate(goalSettings.startDate);
    }

    if (goalSettings.endDate) {
      goalDoc.endDate = Timestamp.fromDate(goalSettings.endDate);
    }

    return await updateDoc(doc(db, COLLECTIONS_NAMES.GOALS, id), goalDoc);
  };

  const removeGoal = async (id: string) => {
    return await deleteDoc(doc(db, COLLECTIONS_NAMES.GOALS, id));
  };

  const getGoal = (id: string) => {
    return useDocument(doc(db, COLLECTIONS_NAMES.GOALS, id));
  };

  return {
    ...data,
    data: goalsData,
    createGoal,
    updateGoal,
    removeGoal,
    getGoal,
  };
}
