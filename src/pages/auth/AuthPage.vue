<script setup lang="ts">
import { Form, type FormSubmitEvent } from '@primevue/forms';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { AuthErrorCodes } from 'firebase/auth';
import Button from 'primevue/button';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import Message from 'primevue/message';
import Password from 'primevue/password';
import { reactive, ref } from 'vue';

import { auth } from 'app/firebase';

import AuthField from './components/AuthField.vue';
import { authResolver } from './utils/authResolver';

import type { AuthFormFields } from './interfaces/authFormFields';
import type { FirebaseError } from 'firebase/app';

const form = reactive<AuthFormFields>({
  email: '',
  password: '',
});

const submitError = ref<string | null>(null);
const isLoading = ref<boolean>(false);

const handleAuth = async ({ valid }: FormSubmitEvent) => {
  if (!valid) {
    return;
  }

  submitError.value = null;
  isLoading.value = true;

  try {
    await signInWithEmailAndPassword(auth, form.email, form.password);
  } catch (err) {
    const firebaseError = err as FirebaseError;

    if (firebaseError.code === AuthErrorCodes.INVALID_LOGIN_CREDENTIALS) {
      try {
        await createUserWithEmailAndPassword(auth, form.email, form.password);
      } catch (createErr) {
        const createError = createErr as FirebaseError;

        if (createError.code === AuthErrorCodes.EMAIL_EXISTS) {
          submitError.value = 'Неверный пароль';
        } else {
          submitError.value = createError.message;
        }
      }
    } else {
      submitError.value = firebaseError.message;
    }
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="auth-container">
    <Card>
      <template #title>Вход / Регистрация</template>

      <template #content>
        <Form
          v-slot="$form"
          :model="form"
          :resolver="authResolver"
          class="auth-form"
          @submit="handleAuth"
        >
          <div class="inputs-group">
            <AuthField field-name="email">
              <InputText
                id="email"
                v-model="form.email"
                size="large"
                autocomplete="email"
                fluid
              />
              <label for="email">Email</label>
            </AuthField>

            <AuthField field-name="password">
              <Password
                id="password"
                v-model="form.password"
                name="password"
                size="large"
                :feedback="false"
                toggle-mask
                fluid
              />
              <label for="password">Password</label>
            </AuthField>
          </div>

          <Button
            type="submit"
            label="Продолжить"
            icon="pi pi-user"
            :loading="isLoading"
            :disabled="!$form.valid"
          />
        </Form>

        <Message v-if="submitError" severity="error">
          {{ submitError }}
        </Message>
      </template>
    </Card>
  </div>
</template>

<style lang="scss" scoped>
.auth-container {
  max-width: 400px;
  margin: 100px auto;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 15px;
}

.inputs-group {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.p-card {
  --p-card-body-gap: 2rem;
}
</style>
