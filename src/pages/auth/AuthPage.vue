<script setup lang="ts">
import Form, { type FormSubmitEvent } from '@primevue/forms/form';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  AuthErrorCodes,
} from 'firebase/auth';
import Button from 'primevue/button';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import Message from 'primevue/message';
import Password from 'primevue/password';
import { reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { BaseFormField } from 'features/BaseFormField';
import { auth } from 'shared/api';
import { ROUTES_PATHS } from 'shared/consts';

import { authResolver } from './utils/authResolver';

import type { AuthFormFields } from './interfaces/authFormFields';
import type { FirebaseError } from 'firebase/app';

const authForm = reactive<AuthFormFields>({
  email: '',
  password: '',
});

const submitError = ref<string | null>(null);
const isLoading = ref<boolean>(false);

const route = useRoute();
const router = useRouter();

const successAuthRedirect = () => {
  let redirectPath = (route.query.redirect ?? ROUTES_PATHS.MAIN) as string;

  router.push(redirectPath);
};

const handleAuth = async ({ valid }: FormSubmitEvent) => {
  if (!valid) {
    return;
  }

  submitError.value = null;
  isLoading.value = true;

  try {
    await signInWithEmailAndPassword(auth, authForm.email, authForm.password);

    successAuthRedirect();
  } catch (err) {
    const firebaseError = err as FirebaseError;

    if (firebaseError.code === AuthErrorCodes.INVALID_LOGIN_CREDENTIALS) {
      try {
        await createUserWithEmailAndPassword(
          auth,
          authForm.email,
          authForm.password
        );

        successAuthRedirect();
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
          :model="authForm"
          :resolver="authResolver"
          class="auth-form"
          @submit="handleAuth"
        >
          <div class="inputs-group">
            <BaseFormField field-name="email">
              <InputText
                id="email"
                v-model="authForm.email"
                size="large"
                autocomplete="email"
                fluid
              />
              <label for="email">Email</label>
            </BaseFormField>

            <BaseFormField field-name="password">
              <Password
                id="password"
                v-model="authForm.password"
                size="large"
                :feedback="false"
                toggle-mask
                fluid
              />
              <label for="password">Password</label>
            </BaseFormField>
          </div>

          <Button
            type="submit"
            label="Продолжить"
            icon="pi pi-user"
            :loading="isLoading"
            :disabled="!$form.valid || isLoading"
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
