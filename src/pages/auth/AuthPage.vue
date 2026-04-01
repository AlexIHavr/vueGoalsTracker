<script setup lang="ts">
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  AuthErrorCodes,
} from 'firebase/auth';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import { reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { BaseForm, type BaseFormEvent } from 'features/baseForm';
import { BaseFormField } from 'features/baseFormField';
import { auth } from 'shared/api';
import { ROUTES_PATHS } from 'shared/consts';

import { authResolver } from './schemas/authResolver';

import type { AuthFormFields } from './interfaces/authFormFields';
import type { FirebaseError } from 'firebase/app';

const authForm = reactive<AuthFormFields>({
  email: '',
  password: '',
});

const route = useRoute();
const router = useRouter();

const successAuthRedirect = () => {
  let redirectPath = (route.query.redirect ?? ROUTES_PATHS.MAIN) as string;

  router.push(redirectPath);
};

const handleAuth = async ({ submitErrorMessage }: BaseFormEvent) => {
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
          submitErrorMessage.value = 'Неверный пароль';
        } else {
          submitErrorMessage.value = createError.message;
        }
      }
    } else {
      submitErrorMessage.value = firebaseError.message;
    }
  }
};
</script>

<template>
  <div class="auth-container">
    <Card>
      <template #title>Вход / Регистрация</template>

      <template #content>
        <BaseForm
          submit-button-label="Продолжить"
          submit-button-icon="pi-user"
          class="auth-form"
          :resolver="authResolver"
          :form-submit="handleAuth"
          :initial-values="authForm"
        >
          <div class="inputs-group">
            <!-- @vue-generic {keyof AuthFormFields} -->
            <BaseFormField name="email">
              <InputText
                id="email"
                v-model="authForm.email"
                size="large"
                autocomplete="email"
                fluid
              />
              <label for="email">Почта</label>
            </BaseFormField>

            <!-- @vue-generic {keyof AuthFormFields} -->
            <BaseFormField name="password">
              <Password
                v-model="authForm.password"
                input-id="password"
                size="large"
                toggle-mask
                fluid
                :feedback="false"
                :pt:pcinputtext:root="{ autocomplete: 'current-password' }"
              />
              <label for="password">Пароль</label>
            </BaseFormField>
          </div>
        </BaseForm>
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
